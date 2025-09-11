// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("sb-access-token"); 
  // 👆 Supabase sets this cookie automatically if you use auth helpers

  const protectedRoutes = ["/Dashboard", "/Profile", "/Lessons", "/AI"];

  if (protectedRoutes.some((path) => req.nextUrl.pathname.startsWith(path))) {
    if (!session) {
      // redirect to login if no cookie
      return NextResponse.redirect(new URL("/SignIn", req.url));
    }
    
  }

  return NextResponse.next();
}
