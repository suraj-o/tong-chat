'use client'

import { useEffect, useState } from "react";
import Search from "./models/Search";

export const SearchModelProvider=()=>{
    const [isMounted,setIsMounted]=useState<boolean>(false)
    
    useEffect(() => {
      setIsMounted(true)

    }, [])

    if(!isMounted){
        return null
    }
    
    return(
        <>
            <Search/>
        </>
    )
}