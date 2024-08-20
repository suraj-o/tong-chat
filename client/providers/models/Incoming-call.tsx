"use client"

import { IncomingModel } from "@/redux/modelMangers/IncomingCall";
import {Dialog, DialogContent} from "../../components/ui/dialog";
import { usePeerHandlers } from "@/context/SocketProvider";
import Link from "next/link"

export default function IncomingCall(){
  const {acceptCall}=usePeerHandlers() as {acceptCall:()=>Promise<void>};
  const {isOpen,onClose,initalvalues}=IncomingModel()

  function acceptCallHandler(){
      acceptCall();
      onClose()
    }
        
  return(
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-transparent border-none ">   
        <div className="p-4 bg-white shadow-lg rounded-lg border border-gray-200">

          <div className="flex items-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold text-gray-600">{"ME"}</span>
            </div>
          
            <div className="ml-4">
              <h2 className="text-lg font-semibold">{"ME"}</h2>
              <p className="text-sm text-gray-500">Incoming Call</p>
            </div>
          </div>
          
          <div className="mt-4 flex justify-between">
            <button onClick={onClose} className="flex-1 bg-red-600 text-white py-2 rounded-lg mr-2 hover:bg-red-700 transition">
                Reject
            </button>
          
            <Link href={`/chat/video-call/${initalvalues.from}`}>
              <button onClick={acceptCallHandler} className="flex-1 bg-green-600 text-white py-2 rounded-lg ml-2 hover:bg-green-700 transition">
                Accept
              </button>
            </Link>
          </div>
        </div>            
      </DialogContent>
    </Dialog>
        )
    }