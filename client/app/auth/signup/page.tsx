"use client"
import { useToast } from '@/components/ui/use-toast';
import { useSignupMutation } from '@/redux/api/user';
import { userLogin } from '@/redux/reducers/user';
import {useRouter} from "next/navigation"
import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

export default function Page () {
    const {toast} =useToast()
    const dispatch=useDispatch()
    const[signup]=useSignupMutation()

    const [name,setName]=useState<string>("");
    const [email,setEmail]=useState<string>("");
    const [password,setPassword]=useState<string>("");
    const [avatar,setAvatar]=useState<File|null>();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setAvatar(file);
        }
      }
    
      const router=useRouter()

    const onSignUp=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        try {
        const {data}=await signup({
            name,
            password,
            email,
            avatar:avatar!
        }) as {data:{success:boolean,message:string,_id:string}}

        if(data){
            dispatch(userLogin({userid:data._id,isLogin:true}))
            router.push("/")
            toast({
                title:data.message,
                description:"enjoy your chats"
            })
        }        

        } catch (error) {
            console.log(error)
        }

    }






  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={(e)=>onSignUp(e)}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  onChange={(e)=>setName(e.target.value)}
                  value={name}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={(e)=>setEmail(e.target.value)}
                  value={email}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  onChange={(e)=>setPassword(e.target.value)}
                  value={password}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                Avatar
              </label>
              <div className="mt-1">
                <input
                  id="avatar"
                  name="avatar"
                  type="file"
                  onChange={(e)=>handleFileChange(e)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

