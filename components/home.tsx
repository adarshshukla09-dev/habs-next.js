"use client"
import React from 'react'
import { authClient } from '@/lib/auth-client'
import { Button } from './ui/button'
import { Spinner } from './ui/spinner';
import { useRouter } from "next/navigation";

function HomeCom() {
      const router = useRouter();

const{data:session}=authClient.useSession();
if(!session){
     return (<p><Spinner/></p>)
    }
  return (
    <div className='flex justify-between items-center'>
      <p>currently logged in {session.user.name}</p>
<Button onClick={()=>authClient.signOut({
    fetchOptions:{
        onSuccess:()=> router.push("/login")
    }
})}>signOut</Button>
    </div>
  )
}

export default HomeCom
