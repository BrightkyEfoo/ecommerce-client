"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Image from 'next/image'
import Choose, { Otherwise, When } from "@/components/Choose/Choose";
import { useTitle } from "@/hooks/useTitle";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {


    const pathname = usePathname()
    const isLogin = pathname.includes('login')
    useTitle(isLogin ? 'Login' : 'Sign up')
    return (
        <div className={"flex min-h-screen items-center container mx-auto"}>
            <aside className={"w-1/2 flex-shrink-0 flex-grow grid place-items-center"}>
                {isLogin ?
                    (<Image src={'/images/new-people.png'} alt={"hello"} height={600} width={500} className={`object-cover`}/>)
                    :
                    (<Image src={'/images/people.png'} alt={"hello"} height={600} width={500} className={`object-cover`}/>)
                }
            </aside>
            <aside className={"w-1/2 flex-shrink-0 flex-grow"}>{children}</aside>
        </div>
    );
}
