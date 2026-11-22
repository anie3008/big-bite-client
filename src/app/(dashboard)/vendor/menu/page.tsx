
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { MenuItemCard } from "@/components/vendor/menu-item-card";
import { getMenu, deleteMenu } from "@/lib/actions/menu";

type MenuItem = {
  _id: string;
  name: string;
  category: string;
  price: number;
  city: string;
  area: string;
  image: string;
  status: "pending" | "approved" | "rejected";
  isActive: boolean;
};

export default function VendorMenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMenu = async () => {
    try {
      const data = await getMenu();
      setMenuItems(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load menu items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this menu item?"
    );

    if (!confirmed) return;

    try {
      await deleteMenu(id);
      setMenuItems((items) => items.filter((item) => item._id !== id));
      toast.success("Menu item deleted successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete menu item.");
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#3B292B]">
            My Menu Items
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your restaurant menu.
          </p>
        </div>

        <Link
          href="/vendor/menu/new"
          className="inline-flex items-center gap-2 rounded-lg bg-[#A85D62] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#81444A]"
        >
          <Plus size={18} />
          Add New Item
        </Link>
      </div>

      {loading ? (
        <p className="py-10 text-center text-gray-500">
          Loading menu items...
        </p>
      ) : menuItems.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#E8D5C5] py-12 text-center">
          <p className="font-medium text-[#3B292B]">
            You haven't added any menu items yet.
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Add your first food item to get started.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {menuItems.map((item) => (
            <MenuItemCard
              key={item._id}
              item={item}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
