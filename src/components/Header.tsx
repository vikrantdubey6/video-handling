"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, User } from "lucide-react";
import { useNotification } from "./Notification";

export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      showNotification("Signed out successfully", "success");
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  const displayName =
    session?.user?.name ||
    session?.user?.email ||
    "User";

  return (
    <div className="navbar bg-base-300 sticky top-0 z-40">
      <div className="container mx-auto">
        <div className="flex-1 px-2 lg:flex-none">
          <Link
            href="/"
            className="btn btn-ghost text-xl gap-2 normal-case font-bold"
            prefetch
          >
            <Home className="w-5 h-5" />
            Video with AI
          </Link>
        </div>

        <div className="flex flex-1 justify-end px-2">
          <div className="dropdown dropdown-end">
            <button className="btn btn-ghost btn-circle">
              <User className="w-5 h-5" />
            </button>

            <ul className="dropdown-content z-[1] shadow-lg bg-base-100 rounded-box w-64 mt-4 py-2">
              {session ? (
                <>
                  <li className="px-4 py-1 text-sm opacity-70">
                    {displayName}
                  </li>

                  <div className="divider my-1"></div>

                  <li>
                    <Link
                      href="/videos/create"
                      className="px-4 py-2 hover:bg-base-200 block w-full"
                    >
                      Upload Video
                    </Link>
                  </li>

                  <li>
                    <button
                      onClick={handleSignOut}
                      className="px-4 py-2 text-error hover:bg-base-200 w-full text-left"
                    >
                      Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    href="/login"
                    className="px-4 py-2 hover:bg-base-200 block w-full"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
