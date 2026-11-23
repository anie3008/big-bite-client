
"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { authClient, useSession } from "@/lib/auth-client";
import { toast } from "sonner";

export default function SettingsPage() {
  const { data: session, isPending } = useSession();

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const user = session?.user;

  // Select and preview a profile picture
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image.");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
    event.target.value = "";
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;

    if (!name.trim()) {
      toast.error("Name cannot be empty.");
      return;
    }

    try {
      setSaving(true);

      let imageUrl = user?.image || undefined;

      // Upload the selected picture to ImgBB
      if (image) {
        setUploading(true);

        const uploadData = new FormData();
        uploadData.append("image", image);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });

        const result = await response.json();

        if (!response.ok || !result.imageUrl) {
          throw new Error(result.message || "Image upload failed.");
        }

        imageUrl = result.imageUrl;
        setUploading(false);
      }

      // Update the Better Auth profile
      const { error } = await authClient.updateUser({
        name: name.trim(),
        ...(imageUrl ? { image: imageUrl } : {}),
      });

      if (error) {
        toast.error("Unable to update your profile.");
        return;
      }

      setImage(null);
      setPreview("");

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setSaving(false);
      setUploading(false);
    }
  };

  if (isPending) {
    return <p>Loading profile...</p>;
  }

  if (!user) {
    return <p>Please sign in to view your profile.</p>;
  }

  const profileImage = preview || user.image;

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-semibold text-[#81444A]">
          Profile Settings
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your personal information.
        </p>
      </div>

      {/* Profile form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl space-y-5 rounded-xl border border-[#E8D5C5] bg-white p-6"
      >
        <div>
          <h2 className="font-semibold text-[#81444A]">
            Personal Information
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Update your basic profile details.
          </p>
        </div>

        {/* Profile Picture */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">
            Profile Picture
          </label>

          <div className="flex items-center gap-4">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="h-20 w-20 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#A85D62] text-2xl font-semibold text-white">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
            )}

            <div>
              <label
                htmlFor="profileImage"
                className="inline-block cursor-pointer rounded-lg border border-[#A85D62] px-4 py-2 text-sm font-medium text-[#A85D62] transition hover:bg-[#A85D62] hover:text-white"
              >
                Choose Picture
              </label>

              <input
                id="profileImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              <p className="mt-2 text-xs text-gray-500">
                Choose an image for your profile.
              </p>
            </div>
          </div>
        </div>

        {/* Full Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            defaultValue={user.name}
            required
            className="w-full rounded-lg border border-[#E8D5C5] px-4 py-2.5 text-sm outline-none focus:border-[#A85D62]"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full rounded-lg border border-[#E8D5C5] bg-gray-50 px-4 py-2.5 text-sm text-gray-500"
          />
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-[#A85D62] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#81444A] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {uploading
              ? "Uploading Picture..."
              : saving
                ? "Saving..."
                : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
