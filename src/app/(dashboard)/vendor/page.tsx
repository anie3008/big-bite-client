
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  UtensilsCrossed,
  CheckCircle2,
  Clock,
  ShoppingBag,
  CreditCard,
  Plus,
  ArrowRight,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { getMenu, getVendorOrders } from "@/lib/actions/menu";
import { toast } from "sonner";

type MenuItem = {
  _id: string;
  name: string;
  status: "pending" | "approved" | "rejected";
  isActive: boolean;
};

type Order = {
  _id: string;
  customerId: string;
  itemName: string;
  price: number;
  quantity: number;
  requestDate: string;
  status: string;
};

export default function VendorPage() {
  const { data: session, isPending } = useSession();

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const vendorId = session?.user?.id;

  useEffect(() => {
    if (isPending || !vendorId) return;

    const fetchDashboardData = async () => {
      try {
        const [menuData, orderData] = await Promise.all([
          getMenu(vendorId),
          getVendorOrders(vendorId),
        ]);

        setMenuItems(menuData);
        setOrders(orderData);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [vendorId, isPending]);

  if (isPending || loading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  if (!vendorId) {
    return <div className="p-6">Please sign in to view your dashboard.</div>;
  }

  // Calculate dashboard statistics
  const totalMenuItems = menuItems.length;

  const activeMenuItems = menuItems.filter(
    (item) => item.status === "approved" && item.isActive
  ).length;

  const pendingOrders = orders.filter(
    (order) => order.status === "pending"
  ).length;

  const acceptedOrders = orders.filter(
    (order) => order.status === "accepted"
  ).length;

  const stats = [
    {
      title: "Total Menu Items",
      value: totalMenuItems,
      description: "Items submitted",
      icon: UtensilsCrossed,
    },
    {
      title: "Active Menu Items",
      value: activeMenuItems,
      description: "Approved and available",
      icon: CheckCircle2,
    },
    {
      title: "Pending Orders",
      value: pendingOrders,
      description: "Awaiting your action",
      icon: Clock,
    },
    {
      title: "Accepted Orders",
      value: acceptedOrders,
      description: "Currently accepted",
      icon: ShoppingBag,
    },
  ];

  const recentOrders = orders.slice(0, 5);

  const approvalItems = menuItems.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-[#3B292B]">
          Welcome back!
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Here's what's happening with your restaurant today.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border border-[#E8D5C5] bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>

                <div className="rounded-lg bg-[#F8F1E9] p-2">
                  <Icon size={20} className="text-[#A85D62]" />
                </div>
              </div>

              <p className="mt-4 text-3xl font-bold text-[#3B292B]">
                {stat.value}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Subscription */}
      <div className="flex flex-col justify-between gap-4 rounded-xl bg-[#81444A] p-6 text-white sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-white/15 p-3">
            <CreditCard size={24} />
          </div>

          <div>
            <p className="text-sm text-white/75">
              Current Subscription
            </p>
            <h2 className="mt-1 text-xl font-semibold">Free Plan</h2>
            <p className="mt-1 text-sm text-white/75">
              You are currently using the Free plan.
            </p>
          </div>
        </div>

        <Link
          href="/vendor/subscription"
          className="inline-flex items-center gap-2 self-start rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-[#81444A] transition hover:bg-[#F8F1E9] sm:self-center"
        >
          View Plans <ArrowRight size={16} />
        </Link>
      </div>

      {/* Recent Orders and Approval Status */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* Recent Orders */}
        <section className="rounded-xl border border-[#E8D5C5] bg-white xl:col-span-2">
          <div className="flex items-center justify-between border-b border-[#F0E5DC] p-5">
            <div>
              <h2 className="font-semibold text-[#3B292B]">
                Recent Orders
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                A quick look at your latest orders
              </p>
            </div>

            <Link
              href="/vendor/orders"
              className="text-sm font-medium text-[#A85D62] hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#FCF9F6] text-xs text-gray-500">
                <tr>
                  <th className="px-5 py-3 font-medium">Order</th>
                  <th className="px-5 py-3 font-medium">Customer</th>
                  <th className="px-5 py-3 font-medium">Amount</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>

              <tbody>
                {recentOrders.length > 0 ? (
                  recentOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-t border-[#F0E5DC]"
                    >
                      <td className="whitespace-nowrap px-5 py-4 font-medium text-[#81444A]">
                        #{order._id.slice(-6).toUpperCase()}
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                        Customer {order.customerId.slice(-6)}
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-gray-700">
                        ৳ {(order.price * order.quantity).toLocaleString("en-BD")}
                      </td>

                      <td className="whitespace-nowrap px-5 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            order.status === "pending"
                              ? "bg-amber-50 text-amber-700"
                              : order.status === "accepted"
                                ? "bg-green-50 text-green-700"
                                : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-5 py-8 text-center text-gray-500"
                    >
                      No orders yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Menu Approval Status */}
        <section className="rounded-xl border border-[#E8D5C5] bg-white">
          <div className="border-b border-[#F0E5DC] p-5">
            <h2 className="font-semibold text-[#3B292B]">
              Menu Approval Status
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Track your submitted menu items
            </p>
          </div>

          <div className="divide-y divide-[#F0E5DC]">
            {approvalItems.length > 0 ? (
              approvalItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between gap-3 p-4"
                >
                  <p className="text-sm text-gray-700">{item.name}</p>

                  <span
                    className={`shrink-0 rounded-full px-2 py-1 text-xs font-medium ${
                      item.status === "approved"
                        ? "bg-green-50 text-green-700"
                        : item.status === "pending"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-red-50 text-red-700"
                    }`}
                  >
                    {item.status.charAt(0).toUpperCase() +
                      item.status.slice(1)}
                  </span>
                </div>
              ))
            ) : (
              <p className="p-4 text-sm text-gray-500">
                You haven't added any menu items yet.
              </p>
            )}
          </div>

          <div className="p-4">
            <Link
              href="/vendor/menu"
              className="text-sm font-medium text-[#A85D62] hover:underline"
            >
              Manage menu items{" "}
              <ArrowRight className="ml-1 inline" size={14} />
            </Link>
          </div>
        </section>
      </div>

      {/* Quick Actions */}
      <section>
        <h2 className="mb-4 font-semibold text-[#3B292B]">
          Quick Actions
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/vendor/menu/new"
            className="flex items-center justify-between rounded-xl border border-[#E8D5C5] bg-white p-5 transition hover:border-[#A85D62] hover:shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-[#F8F1E9] p-3">
                <Plus className="text-[#A85D62]" size={20} />
              </div>

              <div>
                <p className="font-medium text-[#3B292B]">
                  Add New Menu Item
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Add a new dish to your menu
                </p>
              </div>
            </div>

            <ArrowRight size={18} className="text-gray-400" />
          </Link>

          <Link
            href="/vendor/orders"
            className="flex items-center justify-between rounded-xl border border-[#E8D5C5] bg-white p-5 transition hover:border-[#A85D62] hover:shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-[#F8F1E9] p-3">
                <ShoppingBag className="text-[#A85D62]" size={20} />
              </div>

              <div>
                <p className="font-medium text-[#3B292B]">
                  Manage Orders
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Review and update customer orders
                </p>
              </div>
            </div>

            <ArrowRight size={18} className="text-gray-400" />
          </Link>
        </div>
      </section>
    </div>
  );
}
