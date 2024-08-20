import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface SignupProps{
        name:string,
        email:string,
        avatar:File,
        password:string  
}

interface LoginProps{
        email:string,
        password:string  
}

interface MessageResponse{
    success:boolean,
    message:string
}

export interface User{
    _id:string
    name:string,
    email:string,
    avatar:string,
    createdAt:Date,
    updatdedAt:Date
}
interface ProfileResponse{
    success:boolean,
    user:User
}
interface SearchRsponse{
    sucess:boolean,
    allExcludeMembers:User[]
}

type id=string
type name=string


interface GetNotificationResponse{
    sucess:boolean,
    requests:{
        _id: string,
        sender: User
        reciver: string,
        status: "pending" | "accepted"| "rejectes",
        createdAt:Date,
        updatdedAt:Date
    }[]
}

interface SendRequestResponse{
    success:boolean
    request:{
        _id:string,
        sender:string,
        reciver:string
        status: "pending" | "accepted"| "rejectes",
        createdAt:Date,
        updatdedAt:Date
    }
}


interface RequestPropsType{
    requestId:string,
    accept:boolean
}

interface RequestResponse{
    success:boolean,
    message:string
}

export const userApi= createApi({
    reducerPath:"userApi",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:9000/api/v1/user",credentials:"include"}),
    tagTypes:["GetNotification","Search"],
    endpoints:(builder)=>({
        Signup:builder.mutation<MessageResponse,SignupProps>({
            query:(user)=>({
                url:"/signup",
                method:"POST",
                body:user,
            }),
            invalidatesTags:["Search"]
        }),
        Login:builder.mutation<MessageResponse,LoginProps>({
            query:(credintials)=>({
                url:"/login",
                method:"POST",
                body:credintials,
            })
        }),
        Profile:builder.query<ProfileResponse,id>({
            query:(id)=>({
                url:`/profile/${id}`,
                method:"GET"
            })
        }),
        Search:builder.query<SearchRsponse,name>({
            query:(name)=>({
                url:`/search?name=${name}`,
                method:"GET",
            }),
              providesTags:["Search"]
        }),
        SendRequest:builder.mutation<SendRequestResponse,{reciver:string}>({
            query:(reciver)=>({
                url:"/request",
                method:"POST",
                body:reciver
            })
        }),                                             
        GetNotification:builder.query<GetNotificationResponse,string>({
            query:()=>({
                url:"/notifications",
                method:"GET",
            }),
            providesTags:["GetNotification"]
        }),
        FriendRequestResponse:builder.mutation<RequestResponse,RequestPropsType>({
            query:(props)=>({
                url:"/request/response",
                method:"PUT",
                body:props
            }),
            invalidatesTags:["GetNotification"]
        }),
    })
});

export const {useSignupMutation,useLoginMutation,useProfileQuery
             ,useSearchQuery,useSendRequestMutation,useGetNotificationQuery,
             useFriendRequestResponseMutation}= userApi;