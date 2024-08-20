'use client'

import { useEffect, useState } from "react";
import Notification from "./models/Notification";
import IncomingCall from "./models/Incoming-call";
import { SocketProvider } from "@/context/SocketProvider";

export const IncomingCallProvider=()=>{
    const [isMounted,setIsMounted]=useState<boolean>(false)
    
    useEffect(() => {
      setIsMounted(true)

    }, [])

    if(!isMounted){
        return null
    }
    
    return(
        <SocketProvider>
            <IncomingCall/>
        </SocketProvider>
        
    )
}