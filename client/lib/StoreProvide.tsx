"use client"

import { store } from "@/redux/strore";
import React from "react";
import { Provider } from "react-redux";

export default function StroeProvider({children}:{children:React.ReactNode}){
    return(
        <Provider store={store}>
            {children}
        </Provider>
    )
}