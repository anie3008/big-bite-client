
"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { cancelOrder, getCustomerOrders } from "@/lib/actions/menu";
import { ShoppingBag } from "lucide-react";

type Order = {
  _id: string;
  itemName: string;
  itemImage?: string;
  price: number;
  quantity: number;
  deliveryDate: string;
  requestDate: string;
  status: string;
};

const tabs = [
  { label: "Active Orders", value: "active" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Order History", value: "history" },
];

export default function MyOrdersPage() {
  const { data: session, isPending } = useSession();

  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState("active");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
useEffect(() => {
  if (isPending || !session?.user?.id) return;

  const fetchOrders = async () => {
    try {
      const data = await getCustomerOrders(session.user.id);
      setOrders(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load your orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  fetchOrders();
}, [session, isPending]);


  const filteredOrders = orders.filter((order) => {
    if (activeTab === "active") {
      return ["pending", "accepted"].includes(order.status);
    }

    if (activeTab === "cancelled") {
      return order.status === "cancelled";
    }

    return ["rejected", "completed"].includes(order.status);
  });

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-BD", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-50 text-green-700";
      case "accepted":
        return "bg-blue-50 text-blue-700";
      case "cancelled":
      case "rejected":
        return "bg-red-50 text-red-700";
      default:
        return "bg-yellow-50 text-yellow-700";
    }
  };

  if (isPending || (session?.user?.id && loading)) {
  return <p className="text-sm text-gray-500">Loading your orders...</p>;
}

  if (error) {
    return <p className="text-sm text-red-600">{error}</p>;
  }

  const handleCancelOrder = async (orderId: string) => {
  const confirmed = window.confirm(
    "Are you sure you want to cancel this order?"
  );

  if (!confirmed) return;

  try {
    await cancelOrder(orderId);

    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order._id === orderId
          ? { ...order, status: "cancelled" }
          : order
      )
    );
  } catch (error) {
    console.error("Cancellation failed:", error);
    alert("Unable to cancel your order. Please try again.");
  }
};

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-semibold text-[#81444A]">
          My Orders
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          View and manage your food orders.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-[#E8D5C5]">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`pb-3 text-sm font-medium transition-colors ${
              activeTab === tab.value
                ? "border-b-2 border-[#A85D62] text-[#81444A]"
                : "text-gray-500 hover:text-[#81444A]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders list */}
      {filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="flex flex-col gap-4 rounded-xl border border-[#E8D5C5] bg-white p-5 sm:flex-row sm:items-center"
            >
              {/* Food image */}
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#F8F1E9]">
                {order.itemImage ? (
                  <img
                    src={order.itemImage}
                    alt={order.itemName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <ShoppingBag className="text-[#A85D62]" size={28} />
                )}
              </div>

              {/* Order information */}
              <div className="min-w-0 flex-1 space-y-1">
                <h3 className="font-semibold text-[#81444A]">
                  {order.itemName}
                </h3>

                <p className="text-sm text-gray-500">
                  Ordered on {formatDate(order.requestDate)}
                </p>

                <p className="text-sm text-gray-500">
                  Quantity: {order.quantity}
                </p>

                <p className="text-sm font-medium text-gray-700">
                  Total: ৳{order.price * order.quantity}
                </p>
              </div>

              {/* Status */}
<div className="sm:text-right">
  <span
    className={`inline-block rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusStyle(
      order.status
    )}`}
  >
    {order.status}
  </span>

  <p className="mt-2 text-xs text-gray-500">
    Delivery: {formatDate(order.deliveryDate)}
  </p>

  {["pending", "accepted"].includes(order.status) && (
    <button
      onClick={() => handleCancelOrder(order._id)}
      className="mt-3 rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
    >
      Cancel
    </button>
  )}
</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-[#E8D5C5] bg-white px-5 py-12 text-center">
          <ShoppingBag
            size={36}
            className="mx-auto mb-3 text-[#A85D62]"
          />

          <h3 className="font-semibold text-[#81444A]">
            No orders found
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            You don't have any orders in this section yet.
          </p>
        </div>
      )}
    </div>
  );
}
