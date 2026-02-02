
import Image from "next/image";
import HomeCom from "@/components/home";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Week } from "react-day-picker";
import Weekn from "@/components/todo/Week";

export default async function Home() {

  const session = await auth.api.getSession({
    headers:await headers()
  })

  if(!session){
    return(
      redirect("/login")
    )
  }

  return (
    <div>
  <HomeCom/>
  
  </div>
  );
}
