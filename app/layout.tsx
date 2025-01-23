import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import NavBar from "./components/NavBar";
import ReactQueryClient from "./components/ReactQueryClient";

const outfit = Outfit({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Taxi Compass",
  description: "Find resturants near you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClient>
      <ClerkProvider>
        <html lang="en">
          <body className={`${outfit.variable} antialiased`}>
            <NavBar />
            {children}
          </body>
        </html>
      </ClerkProvider>
    </ReactQueryClient>
  );
}
