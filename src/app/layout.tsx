import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#FAF9F6",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    template: "%s | Claim Source",
    default: "Claim Source",
  },
  description: "Check eligibility for Housing Disrepair, Personal Injury, and Tenant Deposit claims. Check your eligibility today via our premium, confidential online evaluation.",
  metadataBase: new URL("https://claimsource.co.uk"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Claim Source | Premium UK Claims Eligibility Matching",
    description: "Confidential and professional evaluation of your housing disrepair, injury claims, and tenant deposit circumstances. Free initial enquiry.",
    url: "/",
    siteName: "Claim Source",
    locale: "en_GB",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${cormorant.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-bg text-brand-text">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
