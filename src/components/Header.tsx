import { shadow } from "@/styles/utilies";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import DarkModeToggle from "./DarkModeToggle"

const Header = () => {
const user =null

  return (
   <header className="bg-popover relative flex h-27 w-full items-center justify-between  px-3 sm:px-8" 
   
   style={{
    boxShadow:shadow

   }}>
    
<Link className="flex items-end gap-1" href="/">
<Image src="/Notesicon.png" alt="Notes Icon" width={60} height={60}
className="rounded-full" priority/>
<h1 className="flex flex-col pb-1 text-2xl font-semibold leading-6">Quick <span> NOTES</span>
</h1>

</Link>

<DarkModeToggle />
   </header>
  )
}

export default Header