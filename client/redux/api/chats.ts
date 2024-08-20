import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


interface GetChatsResponse{
    success:boolean
    message:{
        _id:string,
        members:{
            _id:string,
            name:string,
            avatar:string
        }[]
}[]
}

interface ChatDeatilsResponse{
    success:boolean
    message:{
        _id:string,
        members:{
            _id:string,
            name:string,
            avatar:string
        }[]
}
}


interface GetMessages{
    success:boolean,
    messages:{
        chatId:string,
        message:string,
        to:string,
        from:string,
        createdAt:string
        }[]
}

export const chatApi= createApi({
    reducerPath:"chatApi",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:9000/api/v1/chat",credentials:"include"}),
    tagTypes:["GetChat"],
    endpoints:(builder)=>({
       GetChatLists:builder.query<GetChatsResponse,string>({
        query:()=>({
            url:"/allchats",
            method:"GET",
        }),
        providesTags:["GetChat"],
       }),
       GetChatDeatils:builder.query<ChatDeatilsResponse,string>({
        query:(id)=>({
            url:`/chatdetails?chatId=${id}`,
            method:"GET"
        })
       }),
       GetMessage:builder.query<GetMessages,string>({
        query:(id)=>({
            url:`/messages?id=${id}`,
            method:"GET"
        })
       })
    })
});

export const {useGetChatListsQuery,useGetChatDeatilsQuery,useGetMessageQuery}=chatApi
