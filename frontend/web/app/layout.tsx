"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar, { AppSidebarTrigger } from "@/components/app-sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <SidebarProvider>
        <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} `}
        >
          <AppSidebar></AppSidebar>
          <AppSidebarTrigger></AppSidebarTrigger>
          {children}
          <Toaster/>
        </body>
      </html>
      </SidebarProvider>
  );
}
