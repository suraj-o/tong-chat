import {create} from "zustand"

let deafaults={
    offer:{
        sdp: "",
        type: ""
    },
    from:"",
    secUser:false
}

 interface IRenameProps{
    initalvalues:typeof deafaults
    isOpen:boolean,
    onOpen:(offer:RTCSessionDescriptionInit,from:string,secUser:boolean)=>void,
    onClose:()=>void
 }

 export const IncomingModel=create<IRenameProps>((set)=>({
    isOpen:false,
    onOpen:(offer,from,secUser)=>set({
        isOpen:true,
        initalvalues:{offer:{
            sdp:offer.sdp as string,
            type:offer.type
        },
        from,
        secUser
    }
    }),
    onClose:()=>set({
        isOpen:false,
    }),
    initalvalues:deafaults
 }))