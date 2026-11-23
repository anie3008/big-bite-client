
"use client";

import { useState } from "react";
import { FoodCard, FoodItem } from "./food-card";

type Props = {
  items: FoodItem[];
};

export function MenuBrowser({ items }: Props) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(items.map((item) => item.category))),
  ];

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Search */}
      <div className="mx-auto mb-8 max-w-xl">
        <input
          type="text"
          placeholder="Search your favourite food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-200 px-5 py-3 outline-none focus:border-[#A85D62] focus:ring-2 focus:ring-[#A85D62]/20"
        />
      </div>

      {/* Categories */}
      <div className="mb-8 flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
              selectedCategory === category
                ? "bg-[#A85D62] text-white"
                : "bg-[#F8F1E9] text-[#3B292B] hover:bg-[#E8D5C5]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Food Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <FoodCard key={item._id} item={item} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-gray-500">
          No food items found. Try another search.
        </p>
      )}
    </div>
  );
}
