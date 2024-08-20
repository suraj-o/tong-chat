"use client"

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter
} from "../../components/ui/dialog";
import { NotificationModel } from "@/redux/modelMangers/Notification";
import { useFriendRequestResponseMutation, useGetNotificationQuery, userApi } from "@/redux/api/user";
import { AvatarProvider } from "@/components/Chatlist/List";
import { logoImg } from "@/constants";
import { AlignRight, Check, CircleOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useDispatch } from "react-redux";
import { chatApi } from "@/redux/api/chats";

interface NotificationType{
        _id: string,
        sender: {
            _id:string,
            name:string,
            avatar:string
        }
        reciver: string,
        status: "pending" | "accepted"| "rejectes",
    }


    export default function Notification(){
        const dispatch=useDispatch()
        const {toast}=useToast()
    const [notifications, setNotifications] = useState<NotificationType[]>([
        {
            reciver:"",
            sender: {
                _id:'',
                name:'',
                avatar:""
            },
            status: "pending",
            _id:"",
        }
    ]);
    const {isOpen,onClose}=NotificationModel();


    
    const [responseMutation]=useFriendRequestResponseMutation()
    
    
    const responseNotification = async(requestId:string,accept:boolean) => {
        try {
            const {data} =await responseMutation({requestId,accept}) 
            
            if(data?.success){
                setNotifications(prev=>prev.filter((request)=>request._id !== requestId))
                toast({
                    title:data.message
                })
                dispatch(chatApi.util.invalidateTags(["GetChat"]))
                dispatch(userApi.util.invalidateTags(["Search"]))
            }
        }catch(error){
            
        }
    };
    
    const {data}=useGetNotificationQuery(isOpen.toString());
    useEffect(()=>{
        if(data?.sucess){
            setNotifications(prev=>[...data.requests])
        }
        try {
        } catch (error) {
            
        }
    },[data])

        return(
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="w-full flex flex-col bg-gray-100" >  
                <div className='max-h-[60vh] flex-1 overflow-y-auto p-2'>

                    {notifications.map(notification => (
                <div
                    key={notification._id}
                    className={`border-l-4 border-green-500 shadow-md rounded p-2 mb-2 space-y-3`}>
                    <div className=" h-full flex items-center ">
                        <div className="flex space-x-4 flex-1 h-full items-center">
                            <AvatarProvider src={notification.sender.avatar} width={50}  height={50}/>
                            <p className="text-lg font-semibold leading-5">{notification.sender.name}</p>
                        </div>

                        <div className="flex space-x-4 h-full items-center">
                            <Button onClick={()=>responseNotification(notification._id,true)} className="text-green-500 border-r-2 border-r-green-500" variant={"ghost"}><Check/></Button>
                            <Button  onClick={()=>responseNotification(notification._id,false)} className="text-red-500 border-r-2 border-r-red-500" variant={"ghost"}><CircleOff/></Button>
                        </div>
                    <div>

                        </div>
                    </div>
                </div>
                ))}
        </div>
                        <DialogFooter>
                             <DialogClose asChild>
                             <Button onClick={onClose} >close</Button>
                             </DialogClose>
                        </DialogFooter>
                </DialogContent>
            </Dialog>
        )
    }