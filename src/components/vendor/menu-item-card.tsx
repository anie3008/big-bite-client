
import Image from "next/image";
import Link from "next/link";
import { Pencil, X } from "lucide-react";

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

type Props = {
  item: MenuItem;
  onDelete: (id: string) => void;
};

export function MenuItemCard({ item, onDelete }: Props) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-[#E8D5C5] bg-white p-3 sm:p-4">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-[#F8F1E9]">
        <Image
          src={item.image}
          alt={item.name}
          fill
          unoptimized
          className="object-cover"
        />
      </div>

      <div className="min-w-0 flex-1 space-y-1">
        <h3 className="truncate font-semibold text-[#3B292B]">
          {item.name}
        </h3>
        <p className="text-xs text-gray-500">
          {item.category} · {item.area}, {item.city}
        </p>
        <p className="font-semibold text-[#A85D62]">
          ৳{item.price}
        </p>

        <div className="flex flex-wrap gap-2 pt-1">
          <span className={`rounded-full px-2 py-1 text-xs ${
            item.status === "approved"
              ? "bg-green-100 text-green-700"
              : item.status === "rejected"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
          }`}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </span>

          <span className={`rounded-full px-2 py-1 text-xs ${
            item.isActive
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}>
            {item.isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Link
          href={`/vendor/menu/${item._id}/edit`}
          aria-label={`Edit ${item.name}`}
          className="rounded-lg border border-[#E8D5C5] p-2 text-gray-600 transition hover:bg-[#F8F1E9]"
        >
          <Pencil size={17} />
        </Link>

        <button
          type="button"
          onClick={() => onDelete(item._id)}
          aria-label={`Delete ${item.name}`}
          className="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
