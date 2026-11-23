
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  CheckCircle2,
  Utensils,
  UserRound,
  ShoppingBag,
  ChevronRight,
} from "lucide-react";

const recentOrders = [
  {
    id: "1",
    name: "Pepperoni Pizza",
    date: "Recently placed",
    price: 650,
    status: "Completed",
  },
  {
    id: "2",
    name: "Chicken Cheese Pizza",
    date: "Recently placed",
    price: 550,
    status: "Pending",
  },
];

export default function CustomerDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-semibold text-[#81444A]">
          Welcome back!
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Here's a quick look at your BigBite activity.
        </p>
      </div>

      {/* Your Orders */}
      <section className="rounded-xl border border-[#E8D5C5] bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-[#81444A]">Your Orders</h2>
          <Link
            href="/customer/my-orders"
            className="flex items-center gap-1 text-sm text-[#A85D62] hover:underline"
          >
            View all <ArrowRight size={15} />
          </Link>
        </div>

        <div className="divide-y divide-[#E8D5C5]">
          <Link
            href="/customer/my-orders"
            className="flex items-center gap-4 py-4"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#F8F1E9]">
              <Clock className="text-[#A85D62]" size={21} />
            </div>

            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-800">
                Active Orders
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                Orders waiting or being prepared
              </p>
            </div>

            <ChevronRight size={19} className="text-gray-400" />
          </Link>

          <Link
            href="/customer/my-orders"
            className="flex items-center gap-4 py-4"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#F8F1E9]">
              <CheckCircle2 className="text-[#A85D62]" size={21} />
            </div>

            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-800">
                Completed Orders
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                Your previous successful orders
              </p>
            </div>

            <ChevronRight size={19} className="text-gray-400" />
          </Link>
        </div>
      </section>

      {/* Recent Orders */}
      <section className="rounded-xl border border-[#E8D5C5] bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-[#81444A]">Recent Orders</h2>
          <Link
            href="/customer/my-orders"
            className="text-sm text-[#A85D62] hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="divide-y divide-[#E8D5C5]">
          {recentOrders.map((order) => (
            <Link
              key={order.id}
              href="/customer/my-orders"
              className="flex items-center gap-4 py-4"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#F8F1E9]">
                <Utensils size={21} className="text-[#A85D62]" />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-medium text-gray-800">
                  {order.name}
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  {order.date} · ৳{order.price}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  order.status === "Completed"
                    ? "bg-green-50 text-green-700"
                    : "bg-yellow-50 text-yellow-700"
                }`}
              >
                {order.status}
              </span>

              <ChevronRight size={18} className="shrink-0 text-gray-400" />
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Access */}
      <section className="rounded-xl border border-[#E8D5C5] bg-white p-5">
        <h2 className="mb-4 font-semibold text-[#81444A]">Quick Access</h2>

        <div className="divide-y divide-[#E8D5C5]">
          <Link
            href="/menu"
            className="flex items-center gap-4 py-4"
          >
            <Utensils size={21} className="text-[#A85D62]" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-800">
                Explore Menu
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                Find something delicious
              </p>
            </div>
            <ChevronRight size={19} className="text-gray-400" />
          </Link>

          <Link
            href="/customer/settings"
            className="flex items-center gap-4 py-4"
          >
            <UserRound size={21} className="text-[#A85D62]" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-800">
                My Profile
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                Manage your personal information
              </p>
            </div>
            <ChevronRight size={19} className="text-gray-400" />
          </Link>
        </div>
      </section>
    </div>
  );
}
