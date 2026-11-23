
import Banner from "@/components/home/Banner";
import { FoodCard } from "@/components/menu/food-card";
import { getAvailableMenu } from "@/lib/actions/menu";
import Link from "next/link";

export default async function Home() {
  const menuItems = await getAvailableMenu();
  const featuredItems = menuItems.slice(0, 6);

  return (
    <>
      <Banner />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#3B292B]">
              Popular Food
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Find something delicious for your next meal.
            </p>
          </div>

          <Link
            href="/menu"
            className="text-sm font-semibold text-[#A85D62] hover:underline"
          >
            View All
          </Link>
        </div>

        {featuredItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredItems.map((item: any) => (
              <FoodCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <p className="py-10 text-center text-gray-500">
            No food items are available right now.
          </p>
        )}
      </section>
    </>
  );
}
