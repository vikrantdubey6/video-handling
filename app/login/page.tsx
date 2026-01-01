"use client";

import { CardDemo } from "@/src/components/Card";

export default function LoginPage() {
  // const router = useRouter();
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);
  // async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   setError(null);
  //   setLoading(true);

  //   const formData = new FormData(e.currentTarget);
  //   const email = formData.get("email") as string;
  //   const password = formData.get("password") as string;

  //   const res = await signIn("credentials", {
  //     email,
  //     password,
  //     redirect: false, // IMPORTANT
  //   });

  //   setLoading(false);

  //   if (!res?.ok) {
  //     setError("Invalid email or password");
  //     return;
  //   }

  //   router.push("/"); // or /dashboard
  // }

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      {/* <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
        />
        <br />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>} */}
      <CardDemo/>
    </div>
  );
}
