import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navigation from "@/components/navigation";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EVA Email",
  description:
    "Preview and copy email templates for the EVA retail platform. Customize with your logo and brand name, then paste directly into the EVA Admin Suite Stencil chapter.",
  openGraph: {
    title: "EVA Email",
    description: "Preview and copy email templates for the EVA.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="h-dvh flex flex-col bg-background text-foreground items-center overflow-hidden">
        <Providers>
          <div className="flex flex-col w-full max-w-4xl h-full">
            <Navigation />
            <main className="flex-1 flex flex-col min-h-0 overflow-y-auto">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
