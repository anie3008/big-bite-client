
"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { MenuItemForm } from "@/components/vendor/menu-item-form";
import { createMenu } from "@/lib/actions/menu";
import { useSession } from "@/lib/auth-client";

export default function AddMenuItemPage() {
  const { data: session, isPending } = useSession();
  const handleCreate = async (
  data: import("@/components/vendor/menu-item-form").MenuFormData
) => {
  if (isPending|| !session?.user?.id) {
    console.error("Vendor session not available");
    return;
  }

  const result = await createMenu({
    ...data,
    vendorId: session.user.id,
    status: "pending",
    isActive: false,
  });

    if (result.insertedId || result.acknowledged) {
      toast.success("Menu item created successfully!");
      return;
    }

    throw new Error("Menu item creation failed");
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <Link
          href="/vendor/menu"
          className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#A85D62]"
        >
          <ArrowLeft size={16} />
          Back to My Menu Items
        </Link>

        <h1 className="text-2xl font-bold text-[#3B292B]">
          Add New Menu Item
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Add a new food item to your restaurant menu.
        </p>
      </div>

      <MenuItemForm onSubmit={handleCreate} />
    </div>
  );
}
