import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Helper to sanitize input
function sanitize(val: any): string {
  if (val === undefined || val === null) return "";
  if (Array.isArray(val)) return val.join(", ");
  return String(val).replace(/[\r\n\t]/g, " ").trim();
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // 1. Honeypot check (Spam Protection)
    if (data.website_url && data.website_url.trim() !== "") {
      console.warn("Spam detected via honeypot field. Submission discarded.");
      return NextResponse.json({ success: true, message: "Verification successful (Spam discarded)" });
    }

    // 2. Server-side Validation
    const errors: Record<string, string> = {};
    if (!data.firstName || !data.firstName.trim()) errors.firstName = "First name is required.";
    if (!data.lastName || !data.lastName.trim()) errors.lastName = "Last name is required.";
    if (!data.email || !data.email.trim()) errors.email = "Email is required.";
    if (!data.phone || !data.phone.trim()) errors.phone = "Phone number is required.";
    if (!data.consentProcess) errors.consentProcess = "Data processing consent is required.";
    if (!data.consentContact) errors.consentContact = "Contact consent is required.";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    // 3. Send Lead to Google Sheets Webhook
    const webhookUrl =
      data.campaign === "Personal Injury"
        ? process.env.GOOGLE_SHEET_INJURY_WEBHOOK_URL || process.env.GOOGLE_SHEET_WEBHOOK_URL
        : data.campaign === "Tenant Deposit"
        ? process.env.GOOGLE_SHEET_DEPOSIT_WEBHOOK_URL || process.env.GOOGLE_SHEET_WEBHOOK_URL
        : process.env.GOOGLE_SHEET_DISREPAIR_WEBHOOK_URL || process.env.GOOGLE_SHEET_WEBHOOK_URL;

    let sheetsSyncSuccess = false;
    const prefix = data.campaign === "Personal Injury" ? "PI" : data.campaign === "Tenant Deposit" ? "TD" : "HD";
    const generatedId = `${prefix}-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;
    let finalLeadId = data.leadId || generatedId;
    data.leadId = finalLeadId;

    if (webhookUrl) {
      try {
        console.log(`Sending lead to Webhook: ${webhookUrl}`);
        // Send request with an API Secret if configured
        const headers: Record<string, string> = { "Content-Type": "application/json" };
        if (process.env.API_SECRET) {
          headers["X-Api-Secret"] = process.env.API_SECRET;
        }

        const syncRes = await fetch(webhookUrl, {
          method: "POST",
          headers,
          body: JSON.stringify(data),
          // Removed strict 8s timeout to allow Apps Script to wake up
        });

        if (syncRes.ok) {
          const responseText = await syncRes.text();
          sheetsSyncSuccess = true;
          try {
            const responseData = JSON.parse(responseText);
            if (responseData.leadId) {
               finalLeadId = responseData.leadId;
            } else if (responseData.error) {
               console.error("Google Sheets Webhook error payload:", responseData.error);
            }
          } catch(e) {
             console.error("Failed to parse Google Sheets Webhook JSON response. Raw text:", responseText);
          }
        } else {
          console.error(`Google Sheets Webhook responded with status: ${syncRes.status}`);
        }
      } catch (err) {
        console.error(`Failed to synchronize lead with Webhook:`, err);
      }
    } else {
      console.warn(`Google Sheets webhook environment variable is NOT set for campaign "${data.campaign}". Lead not synced.`);
    }

    return NextResponse.json({
      success: true,
      leadId: finalLeadId,
      synced: sheetsSyncSuccess,
      message: "Lead processed successfully.",
    });
  } catch (error) {
    console.error("API error during lead registration:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error. Your enquiry was not lost." },
      { status: 500 }
    );
  }
}
