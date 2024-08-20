"use client"

import { Button } from "@/components/ui/button";
import { usePeerHandlers } from "@/context/SocketProvider";
import { IncomingModel } from "@/redux/modelMangers/IncomingCall";
import { Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function({params}:{params:{id:string}}){
    const [hasMedia, setHasMedia] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const remoteVmediaStreamRef = useRef<MediaStream | null>(null);

    const {createCall,peer}=usePeerHandlers() as {createCall:(to: string) => Promise<void>,peer:RTCPeerConnection}
    const {initalvalues} = IncomingModel()

    useEffect(() => {
      // Function to get user media
      const getUserMedia = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
          mediaStreamRef.current=stream
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStreamRef.current;
            await videoRef.current.play();

          }
          setHasMedia(true);
        } catch (err) {
          console.error('Error accessing media devices.', err);
          setError('Error accessing media devices.');
        }
      };


      const getRemoteUserMedia=async()=>{
        peer.ontrack=async({streams:[stream]})=>{
          remoteVmediaStreamRef.current=stream;
          if(remoteVideoRef.current){
            remoteVideoRef.current.srcObject=remoteVmediaStreamRef.current
            await remoteVideoRef.current.play()
          };

          const myStram=(await navigator.mediaDevices.getUserMedia({video:true,audio:true})).getTracks()
          for (const track of myStram) {
            peer.addTrack(track,stream);
           }
        }
      }
  
      getUserMedia();
      getRemoteUserMedia()
      // Cleanup function
      return () => {
             mediaStreamRef.current?.getTracks()!.forEach(track => track.stop());
             mediaStreamRef.current=null

             remoteVmediaStreamRef.current?.getTracks()!.forEach(track => track.stop());
             remoteVmediaStreamRef.current=null
      };
    }, []);


    

    return(

          <div className="flex flex-col items-center justify-center h-screen bg-gray-100 relative">
            {error && <p className="text-red-500">{error}</p>}
            {!hasMedia && !error && <p>Loading video stream...</p>}
            <div className="flex items-center justify-center w-full">
            {

             initalvalues.secUser && <video ref={remoteVideoRef} className="w-full max-w-md  rounded" autoPlay muted />
            }
            
            <video ref={videoRef} className="w-full max-w-md  rounded" autoPlay muted />
            </div>

            <div className="absolute bottom-20 px-4">
                <Button onClick={()=>createCall(params.id)} className=" text-green-600" size={"sm"}><Phone/></Button>
            </div>
          </div>

    )
}

