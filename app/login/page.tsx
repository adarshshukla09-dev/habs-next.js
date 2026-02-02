import LoginPage from '@/components/LoginComp'
import React from 'react'
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function page() {
    const session = await auth.api.getSession({
    headers:await headers()
  })

  if(!!session){
    return(
      redirect("/")
    )
  }
  return (
    <div>
      <LoginPage/>
    </div>
  )
}

export default page
