"use client"
import React from 'react'
import "./globals.css";
import {NextUIProvider} from "@nextui-org/react";
import {useRouter} from 'next/navigation'
import Header from '@/components/containers/header'
import Footer from "@/components/containers/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter()

  return (
      <html lang="en" className={"dark"}>

        <body className="dark">

          <NextUIProvider  navigate={router.push}>
            <Header />
            {children}
            <Footer />
          </NextUIProvider>
        </body>

      </html>
  );
}
