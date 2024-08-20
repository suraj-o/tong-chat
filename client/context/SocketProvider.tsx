"use client";
import { userReducerType } from "@/redux/reducers/user";
import React, { FormEvent, useCallback, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import { IncomingModel } from "@/redux/modelMangers/IncomingCall";


interface SocketProviderProps {
  children?: React.ReactNode;
}


export interface MessageType{
  chatId:string,
  message:string,
  to:string,
  from:string,
  date?:Date
}

export interface ISocketContext {
  sendMessage: (chatId:string,message: string,to:string,from:string,date:Date) => any;
  messages: MessageType[];
  peer:RTCPeerConnection | null
  createCall:(to:string)=>Promise<void>
  acceptCall:()=>Promise<void>
}

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
    const state = useContext(SocketContext);
    if (!state) throw new Error(`state is undefined`);
    
    return state
};


export const usePeerHandlers=()=>{
  const state=useContext(SocketContext);
  
  if(state){
    return {
      peer:state.peer,
      createCall:state.createCall,
      acceptCall:state.acceptCall
    }
  }
}




export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const {userid} = useSelector((state:{userReducer:userReducerType})=>state.userReducer)
  const [peer,setPeer]=useState<RTCPeerConnection|null>(null)

  const [acceptCallBol,setAcceptCall]=useState<boolean>()
  const {onOpen,initalvalues} = IncomingModel()
  


  const acceptCall=async()=>{
    if(peer){

      await peer.setRemoteDescription(new RTCSessionDescription(initalvalues.offer as RTCSessionDescriptionInit));
      const answere:RTCSessionDescriptionInit=await peer.createAnswer()
      await peer.setLocalDescription(new RTCSessionDescription(answere))

     if(socket) socket.emit("call:accepted",{answere,to:initalvalues.from})

    }


  }

  const createCall=async(to:string)=>{
    const localOffer=await peer!.createOffer();
    await peer!.setLocalDescription(new RTCSessionDescription(localOffer))

    console.log("iam working")

    if(socket){
      socket.emit("outgoing:call",{offer:localOffer,to})
    }
  }



  const sendMessage: ISocketContext["sendMessage"] = useCallback(
    (chatId,message,to,from,date) => {
      if (socket) {
        socket.emit("NEW_MESSAGE", {chatId, message,to,from,date});
      }
    },
    [socket]
  );



  useEffect(() => {
    
    const _socket = io("http://localhost:9000",{
      extraHeaders:{
        "userid":userid
      }
    });

    const _peer:RTCPeerConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302'
        }
      ]
  });

  setPeer(_peer)
    
    _socket.on("NEW_MESSAGE", (msg: {chatId:string,message:string,to:string,from:string,createdAt:number})=>{
      setMessages(prev=>[...prev,msg])
    });

    _socket.on("incoming:call", async(data)=>{
      const {offer,from}=data as {offer:RTCSessionDescriptionInit,from:string};
      onOpen(offer,from,true)
    })

    _socket.on('incomming:answere', async data => {
      const { offer } = data;
      await _peer.setRemoteDescription(new RTCSessionDescription(offer));
      console.log("final from client")
});


    setSocket(_socket);
    
    return () => {
      _socket.off("NEW_MESSAGE");
      _socket.off("incoming:call");
      _socket.off("call:accepted");
      _socket.off("incomming:answere");
      _socket.disconnect();
      setSocket(undefined);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ sendMessage, messages,createCall ,peer,acceptCall}}>
      {children}
    </SocketContext.Provider>
  );
};