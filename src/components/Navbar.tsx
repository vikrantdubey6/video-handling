"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Home, User, UserPen } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

import toast from "react-hot-toast"
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
    toast.success  ("Signed out successfully");
    router.push("/")
    } catch {
      toast.error("Failed to sign out");
    }
  };

  const displayName =
 
    session?.user?.email?.split("@")[0] ||
    "User";

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Left: Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg"
        >
          <Home className="h-5 w-5" />
         VideoTube
        </Link>  
       
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-bold text-lg"
        >
          <UserPen className="h-5 w-5" />
         Dashboard
        </Link>

        {/* Right: User Menu */}




        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" >
                  <User className="h-5 w-5" /> 
                  User
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            {session ? (
              <>
                <DropdownMenuLabel>
                  {displayName}
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href="/videos/create">
                    Upload Video
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="text-red-600 focus:text-red-600">
                  Sign Out
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem asChild>
                <Link href="/login">
                  Login
                </Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
