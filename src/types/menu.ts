export type MenuItem = {
  _id?: string;
  name: string;
  category: "Pizza" | "Sides" | "Drinks" | "Desserts";
  description: string;
  price: number;
  city: string;
  area: string;
  image: string;
  status: "pending" | "approved" | "rejected";
  isActive: boolean;
};