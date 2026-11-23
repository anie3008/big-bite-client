
"use client";

import { usePathname } from "next/navigation";

type DashboardHeaderProps = {
  title?: string;
  description?: string;
};

export default function DashboardHeader({
  title,
  description,
}: DashboardHeaderProps) {
  const pathname = usePathname();
  const isCustomer = pathname.startsWith("/customer");

  const dashboardTitle =
    title || (isCustomer ? "Customer Dashboard" : "Vendor Dashboard");

  const dashboardDescription =
    description ||
    (isCustomer
      ? "Manage your orders and account."
      : "Manage your restaurant, menu, and orders.");

  return (
    <header className="flex min-h-20 items-center justify-between border-b border-[#E8D5C5] bg-white px-6 py-4">
      <div>
        <h2 className="text-xl font-semibold text-[#81444A]">
          {dashboardTitle}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {dashboardDescription}
        </p>
      </div>
    </header>
  );
}
