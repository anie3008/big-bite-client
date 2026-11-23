
import Image from "next/image";
import Link from "next/link";

export type FoodItem = {
  _id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  city: string;
  area: string;
  image?: string;
  images?: string[];
};

type Props = {
  item: FoodItem;
};

export function FoodCard({ item }: Props) {
  const imageSrc = item.images?.[0] || item.image;

  return (
    <div className="overflow-hidden rounded-xl border border-[#E8D5C5] bg-white shadow-sm transition hover:shadow-md">
      <div className="relative aspect-[4/3] w-full bg-[#F8F1E9]">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={item.name}
            fill
            unoptimized
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            No image available
          </div>
        )}
      </div>

      <div className="space-y-3 p-4">
        <div>
          <h3 className="truncate text-lg font-semibold text-[#3B292B]">
            {item.name}
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            {item.category} · {item.area}, {item.city}
          </p>
        </div>

        <p className="line-clamp-2 min-h-10 text-sm text-gray-600">
          {item.description}
        </p>

        <p className="text-lg font-bold text-[#A85D62]">
          ৳{item.price}
        </p>

        <Link
          href={`/food/${item._id}`}
          className="block w-full rounded-lg bg-[#A85D62] px-4 py-2.5 text-center text-sm font-medium text-white transition hover:bg-[#81444A]"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
