import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  console.log("my token is: " + token);
  
  if (!token && request.nextUrl.pathname !== "/") {
    console.log("You cant go there");
    
    return NextResponse.redirect(new URL("/", request.url));
  } else {
    console.log(token);
    // return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/profile", "/home"], // أي صفحات بدك تحميها
};
