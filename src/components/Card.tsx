'use client'
import { Button } from "@/src/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link";
import toast from "react-hot-toast"

export function CardDemo() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const[error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        setError(null);
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string
        const password = formData.get("password") as string

        const res = await signIn("credentials", {
            email,
            password,
            redirect:false,
        })
        setLoading(false);

    if (!res?.ok) {
      toast.error("Invalid email or password");
      return;
    }

    toast.success("Logged in successfully");
    router.push("/dashboard");
    }
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link">
            <Link href="/register">Register</Link>
          </Button>
        </CardAction>
      </CardHeader>
           {/* ✅ FORM MUST WRAP CONTENT + FOOTER */}
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                type="password"
                placeholder="Password"
                required
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          {/* <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => signIn("google")}
          >
            Login with Google
          </Button> */}
        </CardFooter>
      </form>
    </Card>
  );
}