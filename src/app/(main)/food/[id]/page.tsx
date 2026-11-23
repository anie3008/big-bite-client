
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, Store } from "lucide-react";
import {
  getMenuById,
  getUserById,
} from "@/lib/actions/menu";
import { OrderNowButton } from "@/components/order/order-now-button";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function FoodDetailsPage({ params }: Props) {
  const { id } = await params;

  let item;

  try {
    item = await getMenuById(id);
  } catch {
    notFound();
  }

  if (!item) {
    notFound();
  }

  let vendor = null;

  if (item.vendorId) {
    try {
      vendor = await getUserById(item.vendorId);
    } catch {
      vendor = null;
    }
  }

  const images: string[] =
    item.images?.length > 0
      ? item.images
      : item.image
        ? [item.image]
        : [];

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2">

        {/* Food Images */}
        <div className="space-y-4">
          {images.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {images.map((image, index) => (
                <div
                  key={image}
                  className={`relative overflow-hidden rounded-xl bg-[#F8F1E9] ${
                    index === 0
                      ? "col-span-2 aspect-[16/10]"
                      : "aspect-square"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${item.name} - image ${index + 1}`}
                    fill
                    unoptimized
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex aspect-4/3 items-center justify-center rounded-xl bg-[#F8F1E9] text-gray-400">
              No image available
            </div>
          )}
        </div>

        {/* Food Information */}
        <div className="flex flex-col">
          <p className="mb-3 text-sm font-medium text-[#A85D62]">
            {item.category}
          </p>

          <h1 className="text-3xl font-bold text-[#3B292B] sm:text-4xl">
            {item.name}
          </h1>

          <p className="mt-5 text-2xl font-bold text-[#A85D62]">
            ৳{item.price}
          </p>

          <p className="mt-6 leading-7 text-gray-600">
            {item.description}
          </p>

          <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
            <MapPin size={18} />
            <span>{item.area}, {item.city}</span>
          </div>

          {/* Vendor Information */}
          {vendor && (
            <div className="mt-8 rounded-xl border border-[#E8D5C5] p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-[#F8F1E9] p-3">
                  <Store className="text-[#A85D62]" size={22} />
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Prepared by
                  </p>
                  <h2 className="font-semibold text-[#3B292B]">
                    {vendor.name}
                  </h2>
                </div>
              </div>
            </div>
          )}

          {/* Ordering section will connect to the cart feature */}
          {/* Ordering Section */}
<div className="mt-8 border-t border-[#E8D5C5] pt-6">
  <p className="text-sm text-gray-500">
    Ready to enjoy this delicious food?
  </p>

  <OrderNowButton itemId={item._id.toString()} />
</div>
        </div>
      </div>
    </main>
  );
}
