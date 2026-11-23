
import { notFound } from "next/navigation";
import Image from "next/image";
import { getMenuById } from "@/lib/actions/menu";
import { CheckoutForm } from "./checkout-form";

type Props = {
  searchParams: Promise<{ itemId?: string }>;
};

export default async function CheckoutPage({ searchParams }: Props) {
  const { itemId } = await searchParams;

  if (!itemId) notFound();

  let item;

  try {
    item = await getMenuById(itemId);
  } catch {
    notFound();
  }

  if (!item || item.status !== "approved" || !item.isActive) {
    notFound();
  }

  const foodImage =
    item.images?.length > 0
      ? item.images[0]
      : item.image || "";

  return (
     <CheckoutForm
      item={{
        _id: item._id.toString(),
        name: item.name,
        image: foodImage,
        price: Number(item.price),
        category: item.category,
         vendorId: item.vendorId.toString(),
      }}
    />
  );
}
