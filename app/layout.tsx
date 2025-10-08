import type { Metadata } from "next";
import { Geist, Poppins } from "next/font/google";
import "./globals.css"
import { Toaster } from "@/components/ui/sonner";
import { ReduxProvider } from "@/app/providers/ReduxProvider";
import { EnvisionProvider } from "@/contexts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Envision",
  description: "Envision's AI-powered video creator",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "700", "800"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${poppins.className} antialiased dark`}
      >
        <ReduxProvider>
          <EnvisionProvider>{children}</EnvisionProvider>
        </ReduxProvider>
        <Toaster position="top-center" richColors closeButton/>
      </body>
    </html>
  );
}
