import {create} from "zustand"


 interface IRenameProps{
    isOpen:boolean,
    onOpen:()=>void,
    onClose:()=>void
 }

 export const SearcheModel=create<IRenameProps>((set)=>({
    isOpen:false,
    onOpen:()=>set({
        isOpen:true,
    }),
    onClose:()=>set({
        isOpen:false,

    }),
 }))