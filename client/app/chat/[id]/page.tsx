"use client"
import { AvatarProvider } from "@/components/Chatlist/List";
import ToolTipProvider from "@/components/compos/tooltipProvider";
import Messages from "@/components/Message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageType, useSocket } from "@/context/SocketProvider";
import { useGetChatDeatilsQuery, useGetMessageQuery } from "@/redux/api/chats";
import { userReducerType } from "@/redux/reducers/user";
import { Phone, Video } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
// import VideoCall from "@/components/Call/video/Video";
import Link from "next/link";
import {OtherMember} from "@/redux/members"
interface UsersDetails{
    _id:string,
    members:{
        _id:string,
        name:string,
        avatar:string
}[]
}

export default function Page({params}:{params:{id:string}}){
  const [message,setMessage]= useState<string>("")
  const [chatDeatails,setChatDeatails]=useState<UsersDetails>()
  const [oldMessage,setOldMessage]=useState<MessageType[]>([])
  const bottomViewRef=useRef<HTMLDivElement>(null)
  const {sendMessage,messages}=useSocket()

  const {members}=OtherMember()

  const {userid} = useSelector((state:{userReducer:userReducerType})=>state.userReducer)
  let to = chatDeatails?.members.find((itm)=>itm._id!=userid)?._id
  
  
  const {data,error}=useGetChatDeatilsQuery(params.id)
  const {data:messageaData}=useGetMessageQuery(params.id)

  let Allmessages=[...oldMessage,...messages];


  const userAvatar=(chatDeatails?.members.find(member=>member._id != userid))?.avatar!;
  const userName=(chatDeatails?.members.find(member=>member._id != userid))?.name!;
  const userId=(chatDeatails?.members.find(member=>member._id != userid))?._id!;
  
  useEffect(()=>{
  members(userId as string)
 
  if(data?.success){
    try {
      setChatDeatails(data.message)
    } catch (error) {
      
    }

    if(messageaData?.success){
      setOldMessage(prev=>[...messageaData.messages])
    }
  }
},[params.id,data,messageaData])


useEffect(()=>{
  if(bottomViewRef.current){
    bottomViewRef.current.scrollIntoView()
  }
},[Allmessages])

      const sendMessageHandler=()=>{
        sendMessage(params.id,message,to!,userid,(new Date(Date.now())));
        setMessage("");
      }


  return (
    <main className="flex flex-col w-full">
      {/* user info bar */}
      <header className="flex">
          <div className="flex items-center w-full">
            <AvatarProvider src={userAvatar} width={60} height={60} />
            <p className="text-xl capitalize">{userName}</p>
          </div>

          {/* contact section */}
          <div className="flex space-x-2 mr-4 items-center">

                <ToolTipProvider title={"Phone"}>
                  <Button>
                    <Phone/>
                  </Button>
                </ToolTipProvider>

                <ToolTipProvider title={"Video"}>
                  {/* <VideoCall username={userName}> */}
                  <Link href={`/chat/video-call/${userId}`}>
                  <Button>
                    <Video/>
                  </Button>
                  </Link>
                  {/* </VideoCall> */}
                </ToolTipProvider>

          </div>
      </header>

      {/* message section */}
      <section className="h-[70vh] max-h-[70vh] pb-4 overflow-y-auto flex flex-col space-y-3">
        {
          Allmessages?.map((itm,indx)=>(
          itm.chatId!=params.id?null:<Messages key={indx} me={itm.from==userid} message={itm.message}/>
          ))
        }
        <div ref={bottomViewRef}></div>
      </section>

      {/* input section */}
      <div>
       <div className="flex space-x-3 items-center mr-5" >
          <Input value={message} onChange={(e)=>setMessage(e.target.value)} className="w-full p-2 text-md bg-gray-100 focus-visible:ring-0" placeholder="type your message "/>
          <Button disabled={message.length<=0?true:false} type="button" onClick={sendMessageHandler}>send</Button>
       </div>
      </div>
    </main>
  );
}
