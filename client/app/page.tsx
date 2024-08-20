import { logoImg } from "@/constants";
import Image from "next/image";


export default function page(){ 
  

  return(
      <div className="relative h-full flex-col-center -top-6">
              <Image src={logoImg} alt="logo" width={150}/>
              <h1 className="title">TONG CHAT</h1>
         <div className="flex space-x-2">
              <p className="text-xl">Lets start chating</p>
              <div className="relative">
                  <div className="absolute bg-purple-600 -left-1 -top-0 -bottom-0 -right-1 rotate-[-2deg]"/>
                   <p className="relative text-xl text-center text-white tw">privetly!</p>
              </div>
          </div>
       </div>
  )
}