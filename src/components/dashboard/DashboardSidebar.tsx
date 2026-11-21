
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PlusCircle,
  UtensilsCrossed,
  ShoppingBag,
  CreditCard,
} from "lucide-react";

const navItems = [
  {
    label: "Overview",
    href: "/vendor",
    icon: LayoutDashboard,
  },
  {
    label: "Add Menu Item",
    href: "/vendor/menu/new",
    icon: PlusCircle,
  },
  {
    label: "My Menu Items",
    href: "/vendor/menu",
    icon: UtensilsCrossed,
  },
  {
    label: "Orders",
    href: "/vendor/orders",
    icon: ShoppingBag,
  },
  {
    label: "Subscription",
    href: "/vendor/subscription",
    icon: CreditCard,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (pathname === href) return true;

    if (href === "/vendor") return false;

    if (href === "/vendor/menu") {
      return (
        pathname.startsWith("/vendor/menu/") &&
        pathname !== "/vendor/menu/new"
      );
    }

    return pathname.startsWith(`${href}/`);
  };

  return (
    <aside className="flex min-h-screen w-64 shrink-0 flex-col border-r border-[#E8D5C5] bg-[#F8F1E9] px-5 py-6">
      {/* Brand */}
      <Link href="/" className="mb-10">
        <h1 className="text-2xl font-bold text-[#81444A]">
          BigBite<span className="text-[#A85D62]">.</span>
        </h1>
        <p className="mt-1 text-xs text-gray-500">
          Vendor Dashboard
        </p>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Menu
        </p>

        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                active
                  ? "bg-[#A85D62] text-white shadow-sm"
                  : "text-gray-600 hover:bg-[#E8D5C5] hover:text-[#81444A]"
              }`}
            >
              <Icon size={19} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-[#E8D5C5] pt-5">
        <p className="text-xs text-gray-500">
          © 2026 BigBite
        </p>
      </div>
    </aside>
  );
}
