
"use client";

import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";

export function OrderNowButton({ itemId }: { itemId: string }) {
  const router = useRouter();

  const handleOrderNow = () => {
    router.push(`/checkout?itemId=${itemId}`);
  };

  return (
    <button
      onClick={handleOrderNow}
      className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#A85D62] px-6 py-3 font-semibold text-white transition hover:bg-[#81444A]"
    >
      <ShoppingBag size={20} />
      Order Now
    </button>
  );
}
