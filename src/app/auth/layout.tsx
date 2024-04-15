"use client"
import React from 'react'
import "./globals.css";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className={"flex min-h-screen items-center"}>
            <aside className={"w-1/2 flex-shrink-0 flex-grow"}>
                
            </aside>
            <aside className={"w-1/2 flex-shrink-0 flex-grow"}>{children}</aside>
        </div>
    );
}
