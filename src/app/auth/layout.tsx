"use client"
import React from 'react'
import {useQuery} from "react-query";
import {axiosOpenedInstance} from "@/utils/axios";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {


    const fetchView = async () => {
        const res = await axiosOpenedInstance.get('/products');
        return res.data
    }


    const { data } = useQuery({
        queryKey: ['authslider' , 1],
        queryFn: () => fetchView(),
    })

    console.log("view", data)

    return (
        <div className={"flex min-h-screen items-center"}>
            <aside className={"w-1/2 flex-shrink-0 flex-grow"}>
                
            </aside>
            <aside className={"w-1/2 flex-shrink-0 flex-grow"}>{children}</aside>
        </div>
    );
}
