"use client"

// import { useGetChatsQuery } from "@/redux/api/user"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import List from "./List"
import { userReducerType } from "@/redux/reducers/user"
import { logoImg } from "@/constants"
import { useGetChatListsQuery } from "@/redux/api/chats"



interface ChatType{
    _id:string,
    members:{
        name:string,
        _id:string,
        avatar:string
    }[]
}



export default function Chatlist(){
    const [chats,setchats]=useState<ChatType[]>([])

    const {userid,isLogin} = useSelector((state:{userReducer:userReducerType})=>state.userReducer)
    const {data,isLoading,isError,error}=useGetChatListsQuery(userid)
    
    useEffect(()=>{
        if(data?.success){
            setchats(prev=>[...data.message])
        }
        try {
        } catch (error) {
            
        }
    },[data])

    return(
        <section className="max-h-[88vh] w-full overflow-y-auto flex flex-col items-start p-2 space-y-3">
           {
            isLogin ? chats?.map((itm,idx)=>(
                <List id={itm._id} key={idx} name={(itm.members.find(member=>member._id != userid))?.name!} 
                imgSrc={(itm.members.find(member=>member._id != userid))?.avatar!}/>
            )):<h1 className="capitalize text-xl font-sans self-center">Login First to get your chats</h1>
           }
        </section>
    )
}
