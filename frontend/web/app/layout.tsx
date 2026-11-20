import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SwimTrack Pro - Smart Swimming Ecosystem",
  description: "Sistemi Inteligjent për Menaxhimin dhe Analitikën e Notit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}