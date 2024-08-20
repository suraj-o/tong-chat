import {create} from "zustand"

let intialvalue={id:""}

 interface IRenameProps{
     members:(id:string)=>void
     otherMember: typeof intialvalue;
}

 

 export const OtherMember=create<IRenameProps>((set)=>({
    members:(id)=>set({
        otherMember:{id},
    }),
    otherMember:intialvalue
 }))