"use client"

import { logoImg } from "@/constants"
import Image from "next/image"
import Link from "next/link"
import ToolTipProvider from "./compos/tooltipProvider"
import { Button } from "./ui/button"


import { NotificationModel } from "@/redux/modelMangers/Notification"
import { ProfileModel, } from "@/redux/modelMangers/Profile"
import { SearcheModel } from "@/redux/modelMangers/Search"
import { Bell, LogIn, Search, Signpost, User2 } from "lucide-react"
import { useSelector } from "react-redux"
import { userReducerType } from "@/redux/reducers/user"




export default function Nav(){

const {onOpen:profileOnope} = ProfileModel()
const {onOpen:searchOnopen} = SearcheModel()
const {onOpen:notationOnopen} = NotificationModel()


 const LoginContent=[
    {
        title:"Notifications",
        icon:Bell,
        handler:notationOnopen
    },
    {
        title:"Search",
        icon:Search,
        handler:searchOnopen
    },
    {
        title:"Profile",
        icon:User2,
        handler:profileOnope
    },
]
    const {isLogin} = useSelector((state:{userReducer:userReducerType})=>state.userReducer)

    return(
        <header className="w-full flex shadow-md">
            <div className="flex items-center flex-1">
                <Image src={logoImg} alt="logo" width={50}/>
                <h1 className="title ">TONG CHATS</h1>
            </div>

        <aside className="mr-3 flex items-center space-x-2">
        {
            isLogin===true?(
                <>
              
                { 
                LoginContent.map((itm,indx)=>(
                    <ToolTipProvider key={indx} title={itm.title}>
                            <Button onClick={itm.handler} className="flex-center">
                            {<itm.icon size={20}/>}
                        </Button>
                    </ToolTipProvider>
                    )) 
                }
                 </>
            ):(
                <div className="flex items-center space-x-2">
                    <ToolTipProvider title="Login">
                        <Link href={"/auth/signin"}>
                             <Button className="flex-center space-x-1">
                                <p>Login</p>
                                <LogIn/>
                             </Button>
                        </Link>
                    </ToolTipProvider>
                    <ToolTipProvider title="Signup">
                        <Link href={"/auth/signup"}>
                             <Button className="flex-center space-x-1">
                                <p>Signup</p>
                                <Signpost/>
                             </Button>
                        </Link>
                    </ToolTipProvider>
                </div>
            )
        }
            </aside>
        </header>    
    )
}