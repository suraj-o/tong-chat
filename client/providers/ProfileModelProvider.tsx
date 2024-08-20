'use client'

import { useEffect, useState } from "react";
import Profile from "./models/Profile";

export const ProfileModelProvider=()=>{
    const [isMounted,setIsMounted]=useState<boolean>(false)
    
    useEffect(() => {
      setIsMounted(true)

    }, [])

    if(!isMounted){
        return null
    }
    
    return(
        <>
            <Profile/>
        </>
    )
}