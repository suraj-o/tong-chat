
import Chatlist from "@/components/Chatlist";
import Nav from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import StroeProvider from "@/lib/StoreProvide";
import { ProfileModelProvider } from "@/providers/ProfileModelProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SearchModelProvider } from "@/providers/SearchModelProvider";
import { NotificationModelProvider } from "@/providers/NotificationModeProvider";
import {SocketProvider} from "@/context/SocketProvider";
import { IncomingCallProvider } from "@/providers/IcomingCallModel";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TONG CHAT",
  description: "simple chat app chat private",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) { 

  
  return (
    <html lang="en">
      <body className={inter.className}>
        <StroeProvider>
          <Nav/>
           <main className=" h-[90vh] relative grid grid-cols-3">
               <div className="col-span-1 shadow-xl">
                  <Chatlist/>
               </div>
               <div className="col-span-2">

                 {children}

               </div>
          </main>
          <ProfileModelProvider/>
          <SearchModelProvider/>
          <NotificationModelProvider/>
          <IncomingCallProvider/>
        </StroeProvider>
        <Toaster/>
        </body>
    </html>
  );
}
