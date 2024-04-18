"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import { SnackbarProvider } from "@/utils/snackbar.provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>SmartSketch</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <SnackbarProvider>
          {children}
        </SnackbarProvider>
      </body>

    </html>
  );
}
