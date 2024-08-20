import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path=request.nextUrl.pathname;
  const cookie=request.cookies.get("_id")!;


  if((path==="/auth/signin" || path==="/auth/signup") && cookie){
     return NextResponse.redirect(new URL("/",request.url))
  }

  if(path.startsWith("/chat") && !cookie){
    return NextResponse.redirect(new URL("/",request.url))
  }

}
 
// See "Matching Paths" below to learn more
  export const config = {
    matcher:[
      '/auth/signin',
      '/auth/signup',
      '/chat/:path*',
    ],
  }
