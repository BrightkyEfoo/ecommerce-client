"use client"
import {useEffect} from "react";
import {capitalize} from '@/utils/capitalize'

const useTitle = (title : string) => {
    useEffect(()=> {
        if(typeof window !== "undefined"){
            window.document.title = capitalize(title)
        }
    } , [title])
}

export  {useTitle}