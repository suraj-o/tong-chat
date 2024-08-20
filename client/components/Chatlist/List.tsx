import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Link from 'next/link'



interface AvatarProviderProps{
    src:string,
    width?:number
    height?:number
}

interface ListProps{
    imgSrc:string,
    name:string,
    id:string
}

export const AvatarProvider:React.FC<AvatarProviderProps> =({src,width,height})=>{
    return(
        <Avatar style={{width, height}}>
            <AvatarImage src={src} width={width} height={height}/>
            <AvatarFallback>profile</AvatarFallback>
        </Avatar>
    )

}

const List:React.FC<ListProps> = ({imgSrc,name,id}) => {
  return (
   <Link href={`/chat/${id}`} className='w-full'>
        <div className='flex items-center bg-slate-100 w-full rounded-xl space-x-2 px-2'>
            <AvatarProvider src={imgSrc} width={70} height={70} />
            <h2 className='text-xl font-medium'>{name}</h2>
        </div>
   </Link>
  )
}

export default List
