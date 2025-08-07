"use client";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import AuthProvider from "./context/AuthProvider";
import { StrictMode } from "react";
import ConditionalNavHeader from "@/components/ConditionalNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <SessionProvider>
          <AuthProvider>
            <StrictMode>
              <ConditionalNavHeader />
              <main>
                <section id="home">{children}</section>
              </main>
            </StrictMode>
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
