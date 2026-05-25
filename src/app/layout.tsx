import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Youssef Mansour | Software Engineer",
  description:
    "Portfolio for Youssef Mansour, a full-stack developer building production web apps and agentic AI/RAG systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
