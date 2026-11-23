
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import {
  MenuItemForm,
  type MenuFormData,
} from "@/components/vendor/menu-item-form";

import {
  getMenuById,
  updateMenu,
} from "@/lib/actions/menu";

export default function EditMenuItemPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [menuItem, setMenuItem] = useState<MenuFormData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const data = await getMenuById(id);

        if (!data) {
          toast.error("Menu item not found.");
          router.push("/vendor/menu");
          return;
        }

        setMenuItem({
          name: data.name,
          category: data.category,
          description: data.description,
          price: data.price,
          city: data.city,
          area: data.area,
          image: data.image,
        });
      } catch (error) {
        console.error(error);
        toast.error("Failed to load menu item.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItem();
  }, [id, router]);

  const handleUpdate = async (data: MenuFormData) => {
    await updateMenu(id, {
      ...data,
      status: "pending",
      isActive: false,
    });

    toast.success("Menu item updated successfully!");
    router.push("/vendor/menu");
  };

  if (loading) {
    return <p>Loading menu item...</p>;
  }

  if (!menuItem) {
    return <p>Menu item not found.</p>;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <Link
          href="/vendor/menu"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#A85D62]"
        >
          <ArrowLeft size={16} />
          Back to My Menu Items
        </Link>

        <h1 className="mt-4 text-2xl font-bold text-[#3B292B]">
          Edit Menu Item
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Update your food item information.
        </p>
      </div>

      <MenuItemForm
        initialData={menuItem}
        onSubmit={handleUpdate}
        submitLabel="Save Changes"
      />
    </div>
  );
}
