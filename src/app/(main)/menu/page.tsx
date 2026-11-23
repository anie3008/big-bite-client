
import { getAvailableMenu } from "@/lib/actions/menu";
import { MenuBrowser } from "@/components/menu/menu-browser";

export default async function MenuPage() {
  const menuItems = await getAvailableMenu();

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-[#3B292B] md:text-4xl">
          Explore Our Menu
        </h1>
        <p className="mt-3 text-gray-500">
          Find your next favourite bite at BigBite.
        </p>
      </div>

      <MenuBrowser items={menuItems} />
    </main>
  );
}
