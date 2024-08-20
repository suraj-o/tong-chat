"use client"

import axios from "axios"
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter
} from "../../components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { userLogout, userProfile, userReducerType } from "@/redux/reducers/user";
import { useToast } from "@/components/ui/use-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ProfileModel } from "@/redux/modelMangers/Profile";
import { useProfileQuery } from "@/redux/api/user";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

 
    const tempAvatar ='https://randomuser.me/api/portraits/men/1.jpg';

   export default function Profile(){

        const {userid,isLogin,name,email,avatar} = useSelector((state:{userReducer:userReducerType})=>state.userReducer)
        const dispatch=useDispatch()
        const {toast}=useToast()
        const {isOpen,onClose}=ProfileModel()
        const router=useRouter()


        const {data,isError,error}=useProfileQuery(userid)
        
        useEffect(()=>{
            try {
                if(data?.success){ 
                    dispatch(userProfile({
                        name:data.user.name,
                        email:data.user.email,
                        avatar:data.user.avatar?data.user.avatar:tempAvatar
                    }))
                 };

                let err=error as FetchBaseQueryError;
                let {message}=err.data as {success:boolean,message:string};

                if(isError) throw new Error(message)

            } catch (error) {
                
            }

        },[data])

        const onLogout=async()=>{
            try {
                const {data}=await axios.get("http://localhost:9000/api/v1/user/logout",{
                    withCredentials:true
                })
                
                if(data.success){
                    dispatch(userLogout())
                    toast({
                        title:data.message,
                    })
                    router.push("/")
                    onClose()
                }
            } catch (error) {
                console.log(error)
                toast({
                    title:"failed to logged out",
                    variant:"destructive" 
                })
                onClose()
            }

        }

        return(
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="w-full bg-gray-100">  
                    <div className="py-6 px-6 ">
                      <div className=" mx-auto px-4">
                         <div className="bg-white shadow-xl rounded-lg">
                            <div className="px-4 py-5 sm:px-6">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">Profile Information</h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
                            </div>
                            <div className="border-t border-gray-200">
                                <div>
                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <div className="text-sm font-medium text-gray-500">Full name</div>
                                        <div className="mt-1 text-sm text-gray-900 sm:col-span-2">{name}</div>
                                    </div>
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                       <div className="text-sm font-medium text-gray-500">Email address</div>
                                       <div className="mt-1 text-sm text-gray-900 sm:col-span-2">{email}</div>
                                    </div>
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                       <div className="text-sm font-medium text-gray-500">Profile Picture</div>
                                       <div className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                            <img className="h-10 w-10 rounded-full" src={avatar?avatar:tempAvatar} alt="Profile" />
                                       </div>
                                    </div>
                                </div>
                           </div>
                          </div>
                       </div>
                    </div>

                        <DialogFooter>
                             <DialogClose asChild>
                             <Button onClick={onClose}>close</Button>
                             </DialogClose>
                             <div className="flex items-center max-sm:justify-center w-full mb-2">
                             <Button onClick={onLogout} className="max-sm:w-full">Logout</Button>
                             </div>
                        </DialogFooter>
                </DialogContent>
            </Dialog>
        )
    }