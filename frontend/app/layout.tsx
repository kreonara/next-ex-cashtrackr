import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "CashTrackr",
  description: "Next.js & Express.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${outfit.className}`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
