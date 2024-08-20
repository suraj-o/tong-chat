
import { SocketProvider } from "@/context/SocketProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CHAT",
  description: "chatpage",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (   
    <>
    <SocketProvider>
      {children}
    </SocketProvider>
    </>
  );
}
