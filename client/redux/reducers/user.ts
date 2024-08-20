import { createSlice, PayloadAction } from "@reduxjs/toolkit";


 export interface userReducerType{
    userid:string, 
    name:string,
    email:string,
    avatar:string
    isLogin:boolean,
    isLoading:boolean
}

const initialState:userReducerType={
    userid:"",
    name:"",
    email:"",
    avatar:"",
    isLogin:false,
    isLoading:false
}

export const userReducer=createSlice({
    name:"userReducer",
    initialState,
    reducers:{
        userLogin:(state,action:PayloadAction<{userid:string,isLogin:boolean}>)=>{
            state.isLoading=true;
            state.userid=action.payload.userid;
            state.isLogin=action.payload.isLogin;
            state.isLoading=false;

        },
        userLogout:(state)=>{
            state.isLoading=true;
            state.userid="";
            state.isLogin=false;
            state.isLoading=false;

        },
        userProfile:(state,action:PayloadAction<{ name:string,email:string,avatar:string}>)=>{
            state.isLoading=true;
            state.name=action.payload.name;
            state.email=action.payload.email;
            state.avatar=action.payload.avatar;
            state.isLoading=false;

        },

    }
})

export const {userLogin,userLogout,userProfile}=userReducer.actions;