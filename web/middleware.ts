import { NextRequest, NextResponse } from "next/server"
import { DEFAULT_REDIRECT, authRoutes, publicRoutes } from "./config/route"


function hasLoggedIn(req: NextRequest) {
  const hasCookie = req.cookies.has("token")
  if (!hasCookie) {
    return false
  } else {
    const token = req.cookies.get("token")?.value
    if (!token) {
      return false
    }
    return true
  }
}

export function middleware(req: NextRequest) {
  const { nextUrl } = req

  const isLoggedIn = hasLoggedIn(req)
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoutes = authRoutes.includes(nextUrl.pathname)


  if (isPublicRoutes) {
    return NextResponse.next()
  }

  if (isAuthRoutes) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl))
    }
    return
  }
  if (!isLoggedIn && !isPublicRoutes) {
    return Response.redirect(new URL("/login", nextUrl))
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
