import { useState, FormEvent } from "react";
import supabase from "@/hooks/supabaseClient";
import NavBar from "@/components/navbar/NavBar";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error signing in:", error);
    } else {
      const { user, session } = data;
      console.log("User:", user);
      console.log("Session:", session);
    }
  };

  const GoogleSignInButton: React.FC = () => {
    return (
      <button
        onClick={async () =>
          await supabase.auth.signInWithOAuth({
            provider: "github",
          })
        }
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Sign in with Google
      </button>
    );
  };

  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center relative">
      <NavBar />
      <div className="p-3">
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="px-4 py-2 bg-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="px-4 py-2 bg-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign In
          </button>
        </form>
      </div>
      <GoogleSignInButton />
    </div>
  );
};

export default SignIn;
