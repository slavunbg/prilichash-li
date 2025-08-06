import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Кое ти ПРИЛИЧА? - Открий своя двойник сред звездите",
  description: "Качи снимка и разбери на кой известен човек приличаш. После виж какво носи той — и го купи!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg">
      <body className={inter.className}>{children}</body>
    </html>
  );
}