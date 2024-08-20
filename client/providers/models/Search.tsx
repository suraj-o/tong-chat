"use client"
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter
} from "../../components/ui/dialog";
import { useCallback, useEffect, useState } from "react";
import { SearcheModel } from "@/redux/modelMangers/Search";
import { User, useSearchQuery, useSendRequestMutation } from "@/redux/api/user";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { AvatarProvider } from "@/components/Chatlist/List";
import { logoImg } from "@/constants";
import { useToast } from "@/components/ui/use-toast";




const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    profileImageUrl: 'https://randomuser.me/api/portraits/men/1.jpg', // Example profile image URL
  };

    export default function Profile(){
        const [sendRequest]=useSendRequestMutation()
        const{isOpen,onClose}= SearcheModel()
        const {toast}=useToast()

        const [query, setQuery] = useState('');
        const [results, setResults] = useState<User[]>([]);

        const sendRequestHandler=useCallback(async(reciverId:string)=>{
            try {
                
            const {data,error}= await sendRequest({reciver:reciverId})

            if(data?.success){
                toast({
                    title:"request sent"
                })

                setResults(prev=>prev.filter((results)=>results._id != reciverId))
            }

            if(error){
                const err= error as FetchBaseQueryError;
                const errMessage= (err.data as {message:string,success:boolean}).message

                toast({
                    title:errMessage,
                    variant:"destructive"
                })

                throw new Error(errMessage)
            }


            } catch (error) {
                console.log(error)
            }
        },[])


        const {data,isError,error}=useSearchQuery(query);
        useEffect(()=>{
            try {
                if(data?.sucess){
                    setResults(()=>[...data.allExcludeMembers])
                }
    
                if(isError){
                    let err=error as FetchBaseQueryError;
                    let {message}=err.data as {success:boolean,message:string};
                    if(isError) throw new Error(message)
                }
            } catch (error) {
                console.log(error)
            }

        },[data])



        return(
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="w-full bg-gray-100">  
                <div className="p-4">
                    <div className=" p-2 flex items-center space-x-1">
                        <input
                         type="text"
                         value={query}
                         onChange={(e) => setQuery(e.target.value)}
                         placeholder="Search..."
                         className="border border-gray-300 rounded px-4 py-2 w-full"
                         />

                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded" >
                             Search
                        </button>

                    </div>
           
                     <div className="mt-4 max-h-[40vh] overflow-y-auto">
                         {results.map((result) => (
                         <div key={result.email} className="border border-gray-300 p-2 mb-2 rounded flex justify-between items-center">
                            
                            <div className="flex space-x-2 items-center">
                                <AvatarProvider src={result.avatar} width={50} height={50}/>
                                <p className="text-lg font-medium leading-7">{result.name}</p>
                            </div>

                            <Button onClick={()=>sendRequestHandler(result._id)}  size={"sm"}>Send Request</Button>
                        </div>
                         ))}
                    </div>
                </div>

                        <DialogFooter>
                             <DialogClose asChild>
                             <Button onClick={onClose}>close</Button>
                             </DialogClose>
                        </DialogFooter>
                </DialogContent>
            </Dialog>
        )
    }