'use client'

import { useEffect, useState } from "react";
import Notification from "./models/Notification";

export const NotificationModelProvider=()=>{
    const [isMounted,setIsMounted]=useState<boolean>(false)
    
    useEffect(() => {
      setIsMounted(true)

    }, [])

    if(!isMounted){
        return null
    }
    
    return(
        <>
            <Notification/>
        </>
    )
}