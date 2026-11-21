
type DashboardHeaderProps = {
  title?: string;
  description?: string;
};

export default function DashboardHeader({
  title = "Vendor Dashboard",
  description = "Manage your restaurant, menu, and orders.",
}: DashboardHeaderProps) {
  return (
    <header className="flex min-h-20 items-center justify-between border-b border-[#E8D5C5] bg-white px-6 py-4">
      <div>
        <h2 className="text-xl font-semibold text-[#81444A]">
          {title}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {description}
        </p>
      </div>
    </header>
  );
}
