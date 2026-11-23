
"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { getVendorOrders, updateOrderStatus } from "@/lib/actions/menu";

type Order = {
  _id: string;
  customerId: string;
  itemName: string;
  itemImage?: string;
  price: number;
  quantity: number;
  deliveryDate: string;
  deliveryAddress: string;
  requestDate: string;
  status: string;
};

export default function OrderManagePage() {
  const { data: session, isPending } = useSession();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (isPending || !session?.user?.id) return;

  const fetchOrders = async () => {
    try {
      const data = await getVendorOrders(session.user.id);
      setOrders(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  fetchOrders();
}, [session, isPending]);

  if (isPending || loading) {
    return <p className="p-6">Loading orders...</p>;
  }

  if (!session?.user?.id) {
    return <p className="p-6">Please sign in to view your orders.</p>;
  }

   const handleOrderStatus = async (
  orderId: string,
  status: "accepted" | "rejected"
) => {
  if (!session?.user?.id) return;

  try {
    await updateOrderStatus(orderId, session.user.id, status);

    setOrders((previousOrders) =>
      previousOrders.map((order) =>
        order._id === orderId
          ? { ...order, status }
          : order
      )
    );

    toast.success(`Order ${status} successfully!`);
  } catch (error) {
    console.error(error);
    toast.error("Failed to update order status.");
  }
};

  return(
  <div className="mx-auto max-w-6xl space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-[#3B292B]">
        Manage Orders
      </h1>
      <p className="mt-1 text-sm text-gray-500">
        View and manage orders placed for your restaurant.
      </p>
    </div>

    <div className="grid gap-4 sm:grid-cols-3">
      <div className="rounded-xl border bg-white p-4">
        <p className="text-sm text-gray-500">Total Orders</p>
        <p className="mt-1 text-2xl font-bold text-[#3B292B]">
          {orders.length}
        </p>
      </div>

      <div className="rounded-xl border bg-white p-4">
        <p className="text-sm text-gray-500">Pending Orders</p>
        <p className="mt-1 text-2xl font-bold text-yellow-600">
          {orders.filter((order) => order.status === "pending").length}
        </p>
      </div>

      <div className="rounded-xl border bg-white p-4">
        <p className="text-sm text-gray-500">Accepted Orders</p>
        <p className="mt-1 text-2xl font-bold text-green-600">
          {orders.filter((order) => order.status === "accepted").length}
        </p>
      </div>
    </div>

    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-[#3B292B]">
        All Orders
      </h2>

      {orders.length === 0 ? (
        <div className="rounded-xl border border-dashed p-10 text-center">
          <p className="font-medium text-gray-700">No orders yet</p>
          <p className="mt-1 text-sm text-gray-500">
            New customer orders will appear here.
          </p>
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="rounded-xl border bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col gap-4 sm:flex-row">
              {order.itemImage ? (
                <img
                  src={order.itemImage}
                  alt={order.itemName}
                  className="h-24 w-24 rounded-lg object-cover"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-400">
                  No image
                </div>
              )}

              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-[#3B292B]">
                      {order.itemName}
                    </h3>
                    <p className="text-xs text-gray-400">
                      Order #{order._id.slice(-6)}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "accepted"
                          ? "bg-green-100 text-green-700"
                          : order.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : order.status === "cancelled"
                              ? "bg-gray-100 text-gray-600"
                              : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="grid gap-2 text-sm text-gray-600 sm:grid-cols-2">
                  <p>
                    Quantity: <span className="font-medium">{order.quantity}</span>
                  </p>
                  <p>
                    Price: <span className="font-medium">৳{order.price * order.quantity}</span>
                  </p>
                  <p>
                    Delivery date:{" "}
                    <span className="font-medium">
                      {new Date(order.deliveryDate).toLocaleDateString()}
                    </span>
                  </p>
                  {/* <p>
                    Customer ID:{" "}
                    <span className="font-medium">{order.customerId}</span>
                  </p> */}
                </div>

                <p className="text-sm text-gray-600">
                  Delivery address: {order.deliveryAddress}
                </p>

                <p className="text-xs text-gray-400">
                  Requested on:{" "}
                  {new Date(order.requestDate).toLocaleString()}
                </p>
                {order.status === "pending" && (
  <div className="flex gap-3 pt-2">
    <button
      onClick={() => handleOrderStatus(order._id, "accepted")}
      className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
    >
      Accept Order
    </button>

    <button
      onClick={() => handleOrderStatus(order._id, "rejected")}
      className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
    >
      Reject Order
    </button>
  </div>
)}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);

}
