import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CCNearMe - Find Your Home of Golf",
  description: "We match you with clubs that fit your game. Takes 5 minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
