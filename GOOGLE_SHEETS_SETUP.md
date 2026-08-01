# Google Sheets Funnel — Setup Guide

## Overview

The Claim Source API (`/api/lead`) already supports Google Sheets via webhook.
Follow these steps to connect your Google Sheets.

---

## Step 1: Create Your Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com)
2. Create a new spreadsheet
3. Create **two tabs** (bottom tabs):
   - Tab 1: `Housing Disrepair Leads`
   - Tab 2: `Personal Injury Leads`
4. Add these headers to **Row 1** of each tab:

```
Timestamp | Lead ID | Campaign | First Name | Last Name | Email | Phone | Postcode | Landlord Name | Issue Duration | Issues | Accident Date | Accident Type | Injuries | Has Solicitor | Property Type | Tenure | IP Address | UTM Source | UTM Medium | UTM Campaign | Landing Page | Referrer
```

---

## Step 2: Create the Google Apps Script

1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete any existing code in the editor
3. Paste the following code:

```javascript
const SPREADSHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();
const DISREPAIR_SHEET_NAME = "Housing Disrepair Leads";
const INJURY_SHEET_NAME = "Personal Injury Leads";
const API_SECRET = ""; // Optional: set a secret to verify requests

function doPost(e) {
  try {
    const contents = e.postData.contents;
    const data = JSON.parse(contents);

    // Optional API secret check
    if (API_SECRET && e.parameter.secret !== API_SECRET) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: "Unauthorized" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const sheetName = data.campaign === "Personal Injury"
      ? INJURY_SHEET_NAME
      : DISREPAIR_SHEET_NAME;

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: `Sheet "${sheetName}" not found` }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Build the row to append
    const timestamp = new Date().toISOString();
    const utm = data.utm || {};

    const row = [
      timestamp,
      data.leadId || "",
      data.campaign || "",
      data.firstName || "",
      data.lastName || "",
      data.email || "",
      data.phone || "",
      data.postcode || "",
      data.landlordName || "",
      data.issueDuration || "",
      Array.isArray(data.issues) ? data.issues.join(", ") : (data.issues || ""),
      data.accidentDate || "",
      data.accidentType || "",
      data.injuries || "",
      data.hasSolicitor || "",
      data.propertyType || "",
      data.tenure || "",
      data.ipAddress || "",
      utm.utm_source || "",
      utm.utm_medium || "",
      utm.utm_campaign || "",
      data.landingPage || "",
      data.referrer || "",
    ];

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: "Lead appended successfully" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function — run this manually to verify the sheet connection
function testConnection() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet1 = ss.getSheetByName(DISREPAIR_SHEET_NAME);
  const sheet2 = ss.getSheetByName(INJURY_SHEET_NAME);
  Logger.log("Disrepair Sheet: " + (sheet1 ? "✅ Found" : "❌ Not found"));
  Logger.log("Injury Sheet: " + (sheet2 ? "✅ Found" : "❌ Not found"));
}
```

---

## Step 3: Deploy as Web App

1. Click **Deploy > New Deployment**
2. Select type: **Web app**
3. Settings:
   - **Description**: `Claim Source Lead Webhook`
   - **Execute as**: `Me`
   - **Who has access**: `Anyone` ← important!
4. Click **Deploy**
5. Copy the **Web App URL** — it looks like:
   `https://script.google.com/macros/s/XXXXXXX/exec`

---

## Step 4: Add Webhook URLs to `.env.local`

Create a file called `.env.local` in the root of your project and paste:

```env
GOOGLE_SHEET_DISREPAIR_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
GOOGLE_SHEET_INJURY_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

> **Note**: Both campaigns can use the **same** webhook URL. The script uses the `campaign` field in the payload to route to the correct sheet tab.

---

## Step 5: Restart Dev Server

```bash
npm run dev
```

The API at `/api/lead` will now automatically send every new lead to your Google Sheet. Leads are also saved locally in `/leads_log/` as a backup.

---

## Verification

1. Submit a test form on the website
2. Check your Google Sheet — a new row should appear
3. Check `/leads_log/` for the local backup JSON file

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Sheet not found | Check sheet tab names match exactly |
| Webhook returning 302 | Re-deploy the Apps Script |
| No data in sheet | Check the webhook URL in `.env.local` |
| Access denied | Set "Who has access" to "Anyone" in deployment |
