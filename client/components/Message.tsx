interface MessagesProps{
    me:boolean,
    message:string
}


export default function Messages({me,message}:MessagesProps){
    return(
        <div className="p-2 w-fit max-w-[55vh] text-wrap m-6 rounded-lg" style={{alignSelf:`${me?"end":"start"}`,backgroundColor:`${me?"#1f1e1d":"#edece8"}`,color:`${me?"white":"black"}`}}>
            {message}
        </div>
    )
}