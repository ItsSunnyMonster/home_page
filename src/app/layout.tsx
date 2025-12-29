// SPDX-FileCopyrightText: 2025 SunnyMonster
//
// SPDX-License-Identifier: MIT

import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import "./weather-icons.min.css";
import "./weather-icons-wind.min.css";

const lexend = Lexend({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home Page",
  description: "Home Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lexend.className} antialiased bg-ctp-mantle flex justify-center items-center flex-col gap-20`}
      >
        {children}
      </body>
    </html>
  );
}
