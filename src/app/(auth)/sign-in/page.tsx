"use client"
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import type { FormEvent } from "react";
import { toast } from "sonner";

const SignInPage = () => {
const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);

  const email = formData.get("email");
  const password = formData.get("password");

  console.log(email, password);

  const { error } = await authClient.signIn.email({
  email: email as string,
  password: password as string,
  callbackURL: "/",
});

if (error) {
  toast.error(error.message);
  return;
}

toast.success("Signed in successfully!");
};

    const handleGoogleSignIn = async () => {
      try {
        await authClient.signIn.social({
          provider: "google",
          callbackURL: "/",
        });
      } catch {
        toast.error("Unable to sign in with Google. Please try again.");
      }
    };
  return (
    <div className="min-h-screen grid md:grid-cols-2">

      {/* Left side - Branding */}
      <div className="relative hidden md:flex flex-col justify-between overflow-hidden bg-brand p-10 text-white">

        <div>
          <h1 className="text-3xl font-bold">BigBite.</h1>
          <p className="mt-2 text-white/80">
            Crave It. Tap It. Get It.
          </p>
        </div>

        <div className="relative z-10 max-w-md">
          <h2 className="text-4xl font-bold leading-tight">
            Your favourite food,
            <br />
            just a tap away.
          </h2>
          <p className="mt-4 text-white/80">
            Discover delicious food from your favourite local restaurants
            and get it delivered to your doorstep.
          </p>
        </div>

        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: "url('/images/bigbite-hero-pizza.png')",
          }}
        />

        <p className="relative z-10 text-sm text-white/70">
          © 2026 BigBite. All rights reserved.
        </p>
      </div>

      {/* Right side - Sign In Form */}
      <div className="flex items-center justify-center bg-background px-6 py-12">

        <div className="w-full max-w-md">

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground">
              Welcome back!
            </h2>
            <p className="mt-2 text-muted-foreground">
              Sign in to continue to BigBite.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <button
              type="submit"
              className="h-11 w-full rounded-lg bg-primary font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Sign In
            </button>

          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-3 text-sm text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="h-11 w-full rounded-lg border border-input font-medium transition-colors hover:bg-accent"
          >
            Continue with Google
          </button>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-primary hover:underline"
            >
              Sign Up
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
};

export default SignInPage;
