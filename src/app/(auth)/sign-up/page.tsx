
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function SignUpPage() {
    const [isLoading, setIsLoading] = useState(false);
const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  if (isLoading) return;
  const formData = new FormData(event.currentTarget);

  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const role = formData.get("role");

  const selectedImage = formData.get("image");

 // Validate name
  if (typeof name !== "string" || !name.trim()) {
    toast.error("Please enter your full name.");
    return;
  }

  // Validate email
  if (
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  ) {
    toast.error("Please enter a valid email address.");
    return;
  }

  // Validate password
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password)
  ) {
    toast.error(
      "Password must contain at least 6 characters, one uppercase and one lowercase letter."
    );
    return;
  }

  // Validate role
  if (role !== "customer" && role !== "vendor") {
    toast.error("Please select a valid account role.");
    return;
  }
  const image =
    selectedImage instanceof File && selectedImage.size > 0
      ? selectedImage
      : null;
if (image && !image.type.startsWith("image/")) {
    toast.error("Please select a valid image file.");
    return;
  }
  
// Upload profile image to ImgBB first
try {
  setIsLoading(true);

  let imageUrl: string | undefined;

  if (image) {
    const uploadData = new FormData();
    uploadData.append("image", image);

    const uploadResponse = await fetch("/api/upload", {
      method: "POST",
      body: uploadData,
    });

    const uploadResult = await uploadResponse.json();

    if (!uploadResponse.ok) {
      toast.error(uploadResult.message || "Image upload failed.");
      return;
    }

    imageUrl = uploadResult.imageUrl;
  }

  // Create account with Better Auth
  const { data, error } = await authClient.signUp.email({
    name: name.trim(),
    email: email.trim(),
    password,
    role,
    ...(imageUrl ? { image: imageUrl } : {}),
    callbackURL: "/",
  });

  if (error) {
    toast.error(error.message || "Something went wrong.");
    return;
  }

  console.log(data);
  toast.success("Account created successfully!");
} catch (error) {
  console.error(error);
  toast.error("Unable to connect. Please try again.");
} finally {
  setIsLoading(false);
}

};
const handleGoogleSignUp = async () => {
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
            Good food brings
            <br />
            people together.
          </h2>
          <p className="mt-4 text-white/80">
            Join BigBite and discover delicious food from
            your favourite local restaurants.
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

      {/* Right side - Sign Up Form */}
      <div className="flex items-center justify-center bg-background px-6 py-12">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-foreground">
            Create an account
          </h2>
          <p className="mt-2 text-muted-foreground">
            Join BigBite and get your favourite food delivered.
          </p>

          {/* form fields here */}

<form onSubmit={handleSubmit} className="mt-8 space-y-5">

  {/* Full Name */}
  <div className="space-y-2">
    <label htmlFor="name" className="text-sm font-medium">
      Full Name
    </label>
    <input
      id="name"
       name="name"
      type="text"
      placeholder="Enter your full name"
      className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-ring"
    />
  </div>

  {/* Email */}
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

  {/* Password */}
  <div className="space-y-2">
    <label htmlFor="password" className="text-sm font-medium">
      Password
    </label>
    <input
      id="password"
      name="password"
      type="password"
      placeholder="Create a password"
      className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-ring"
    />
    <p className="text-xs text-muted-foreground">
      Minimum 6 characters, including one uppercase and one lowercase letter.
    </p>
  </div>

  {/* Profile Image */}
  <div className="space-y-2">
    <label htmlFor="profileImage" className="text-sm font-medium">
      Profile Image <span className="text-muted-foreground">(Optional)</span>
    </label>
    <input
      id="profileImage"
       name="image"
      type="file"
      accept="image/*"
      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-secondary file:px-3 file:py-2 file:text-sm file:font-medium"
    />
  </div>

  {/* Account Role */}
  <div className="space-y-2">
    <label htmlFor="role" className="text-sm font-medium">
      I want to join as
    </label>
    <select
      id="role"
      name="role"
      defaultValue="customer"
      className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-ring"
    >
      <option value="customer">Customer</option>
      <option value="vendor">Restaurant Owner</option>
    </select>
  </div>

  {/* Submit */}
  <button
    type="submit"
    disabled={isLoading}
    className="h-11 w-full rounded-lg bg-primary font-medium text-primary-foreground transition-opacity hover:opacity-90"
  >
    {isLoading ? "Creating account..." : "Create Account"}
  </button>

</form>


{/* Divider */}
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

{/* Google Sign Up */}
<button
  type="button"
   onClick={handleGoogleSignUp}
  className="flex h-11 w-full items-center justify-center gap-3 rounded-lg border border-input font-medium transition-colors hover:bg-accent"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    className="h-5 w-5"
  >
    <path
      fill="#EA4335"
      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 3.03 13.22l7.98 6.19C12.9 13.72 18.05 9.5 24 9.5Z"
    />
    <path
      fill="#4285F4"
      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.73 7.18l7.68 5.96c4.48-4.14 7.09-10.22 7.09-17.61Z"
    />
    <path
      fill="#FBBC05"
      d="M10.99 28.59A14.4 14.4 0 0 1 10.2 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.98 10.78l8.01-6.19Z"
    />
    <path
      fill="#34A853"
      d="M24 48c6.48 0 11.93-2.13 15.89-5.84l-7.68-5.96c-2.13 1.43-4.84 2.28-8.21 2.28-5.95 0-11.1-4.22-12.99-9.91l-8.01 6.19C6.51 43.02 14.62 48 24 48Z"
    />
  </svg>

  Continue with Google
</button>



          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-primary hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
}
