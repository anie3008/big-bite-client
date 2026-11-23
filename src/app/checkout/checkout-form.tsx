"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { useSession } from "@/lib/auth-client";

type CheckoutFormProps = {
    item: {
        _id: string;
        name: string;
        image: string;
        price: number;
        category: string;
         vendorId: string;
    };
};

export function CheckoutForm({ item }: CheckoutFormProps) {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    const [quantity, setQuantity] = useState(1);
    const [deliveryDate, setDeliveryDate] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const minDeliveryDate = [
        tomorrow.getFullYear(),
        String(tomorrow.getMonth() + 1).padStart(2, "0"),
        String(tomorrow.getDate()).padStart(2, "0"),
    ].join("-");

    useEffect(() => {
        if (!isPending && session?.user?.role !== "customer") {
            router.replace("/");
        }
    }, [isPending, session, router]);

    const subtotal = item.price * quantity;

    if (isPending || session?.user?.role !== "customer") {
        return null;
    }

    return (
        <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-12">
            <h1 className="mb-8 text-3xl font-bold text-[#3B292B]">
                Complete Your Order
            </h1>

            <form className="w-full rounded-xl border border-[#E8D5C5] p-6">
                <h2 className="mb-6 text-xl font-semibold">Your Food Item</h2>

                {/* Food Item */}
                <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center">
                    {item.image && (
                        <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-lg">
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                unoptimized
                                className="object-cover"
                            />
                        </div>
                    )}

                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-[#3B292B]">
                            {item.name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">{item.category}</p>

                        <p className="mt-2 text-lg font-bold text-[#A85D62]">
                            ৳{item.price} each
                        </p>

                        <p className="mt-2 font-semibold">
                            Subtotal: ৳{subtotal}
                        </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 self-start sm:self-center">
                        <button
                            type="button"
                            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                            disabled={quantity === 1}
                            className="rounded-md border border-[#E8D5C5] p-2 transition hover:bg-[#F8F1E9] disabled:cursor-not-allowed disabled:opacity-40"
                            aria-label="Decrease quantity"
                        >
                            <Minus size={16} />
                        </button>

                        <span className="min-w-5 text-center font-semibold">
                            {quantity}
                        </span>

                        <button
                            type="button"
                            onClick={() => setQuantity((prev) => prev + 1)}
                            className="rounded-md border border-[#E8D5C5] p-2 transition hover:bg-[#F8F1E9]"
                            aria-label="Increase quantity"
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                </div>

                <div className="my-8 border-t border-[#E8D5C5]" />

                {/* Delivery Details */}
                <h2 className="mb-5 text-xl font-semibold">Delivery Details</h2>

                <div className="space-y-5">
                    <div>
                        <label
                            htmlFor="deliveryDate"
                            className="mb-2 block text-sm font-medium text-[#3B292B]"
                        >
                            Delivery Date
                        </label>

                        <input
                            id="deliveryDate"
                            type="date"
                            min={minDeliveryDate}
                            value={deliveryDate}
                            onChange={(e) => setDeliveryDate(e.target.value)}
                            required
                            className="w-full rounded-lg border border-[#E8D5C5] px-4 py-3 outline-none focus:border-[#A85D62]"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="deliveryAddress"
                            className="mb-2 block text-sm font-medium text-[#3B292B]"
                        >
                            Delivery Address
                        </label>

                        <textarea
                            id="deliveryAddress"
                            value={deliveryAddress}
                            onChange={(e) => setDeliveryAddress(e.target.value)}
                            placeholder="Enter your full delivery address"
                            rows={3}
                            required
                            className="w-full resize-none rounded-lg border border-[#E8D5C5] px-4 py-3 outline-none focus:border-[#A85D62]"
                        />
                    </div>
                </div>

                <div className="my-8 border-t border-[#E8D5C5]" />

                {/* Order Summary */}
                <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">Total Amount</span>

                    <span className="text-2xl font-bold text-[#A85D62]">
                        ৳{subtotal}
                    </span>
                </div>

                <button
                    type="button"
                    disabled
                    className="mt-6 w-full cursor-not-allowed rounded-lg bg-[#A85D62] px-6 py-3 font-semibold text-white opacity-60"
                >
                    Place Order
                </button>

                <p className="mt-2 text-center text-xs text-gray-500">
                    Order submission will be connected to the backend next.
                </p>
            </form>
        </main>
    );
}