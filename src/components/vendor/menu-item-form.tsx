
"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { ImagePlus, X } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

export type MenuFormData = {
  name: string;
  category: string;
  description: string;
  price: number;
  city: string;
  area: string;
  images: string[];
  image?: string; // Supports older menu items
};

type Props = {
  onSubmit: (data: MenuFormData) => Promise<void>;
  initialData?: Partial<MenuFormData>;
  submitLabel?: string;
};

type ImageItem = {
  id: string;
  preview: string;
  url?: string;
};

const categories = ["Pizza", "Sides", "Drinks", "Desserts"];
const MAX_IMAGES = 5;

export function MenuItemForm({
  onSubmit,
  initialData,
  submitLabel = "Submit Menu Item",
}: Props) {
  const initialImages =
    initialData?.images?.length
      ? initialData.images
      : initialData?.image
        ? [initialData.image]
        : [];

  const [imageItems, setImageItems] = useState<ImageItem[]>(
    initialImages.map((url, index) => ({
      id: `initial-${index}`,
      preview: url,
      url,
    }))
  );

  const [uploading, setUploading] = useState(false);

  const inputClass =
    "w-full rounded-lg border border-[#E8D5C5] bg-white px-4 py-3 text-sm text-[#3B292B] outline-none transition placeholder:text-gray-400 focus:border-[#A85D62] focus:ring-2 focus:ring-[#A85D62]/10";

  const labelClass = "mb-2 block text-sm font-medium text-[#3B292B]";

  const handleImageChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);
    event.target.value = "";

    if (!files.length) return;

    if (imageItems.length + files.length > MAX_IMAGES) {
      toast.info(`You can upload a maximum of ${MAX_IMAGES} images.`);
      return;
    }

    const newItems = files.map((file) => ({
      id: crypto.randomUUID(),
      preview: URL.createObjectURL(file),
    }));

    setImageItems((prev) => [...prev, ...newItems]);
    setUploading(true);

    for (let i = 0; i < files.length; i++) {
      const item = newItems[i];
      const file = files[i];

      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message);
        }

        setImageItems((prev) =>
          prev.map((image) =>
            image.id === item.id
              ? { ...image, preview: result.imageUrl, url: result.imageUrl }
              : image
          )
        );

        URL.revokeObjectURL(item.preview);
      } catch (error) {
        console.error("Image upload failed:", error);

        setImageItems((prev) =>
          prev.filter((image) => image.id !== item.id)
        );

        URL.revokeObjectURL(item.preview);
        toast.error(`Failed to upload ${file.name}.`);
      }
    }

    setUploading(false);
    toast.success("Image upload process completed.");
  };

  const removeImage = (id: string) => {
    setImageItems((prev) => {
      const image = prev.find((item) => item.id === id);

      if (image?.preview.startsWith("blob:")) {
        URL.revokeObjectURL(image.preview);
      }

      return prev.filter((item) => item.id !== id);
    });
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const price = Number(formData.get("price"));

    if (!Number.isFinite(price) || price <= 0) {
      toast.info("Please enter a valid price greater than zero.");
      return;
    }

    if (uploading) {
      toast.info("Please wait for image uploads to finish.");
      return;
    }

    const uploadedImages = imageItems
      .map((image) => image.url)
      .filter((url): url is string => Boolean(url));

    if (!uploadedImages.length) {
      toast.info("Please upload at least one food image.");
      return;
    }

    if (uploadedImages.length !== imageItems.length) {
      toast.info("Please wait until all images are uploaded.");
      return;
    }

    const data: MenuFormData = {
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      description: formData.get("description") as string,
      price,
      city: formData.get("city") as string,
      area: formData.get("area") as string,
      images: uploadedImages,
    };

    try {
      await onSubmit(data);

      if (!initialData) {
        form.reset();
        imageItems.forEach((image) => {
          if (image.preview.startsWith("blob:")) {
            URL.revokeObjectURL(image.preview);
          }
        });
        setImageItems([]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border border-[#E8D5C5] bg-white p-6 sm:p-8"
    >
      <section className="space-y-5">
        <div>
          <h2 className="font-semibold text-[#81444A]">
            Basic Information
          </h2>
          <p className="mt-1 text-xs text-gray-500">
            Provide the basic details of your food item.
          </p>
        </div>

        <div>
          <label htmlFor="name" className={labelClass}>
            Item Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={initialData?.name}
            placeholder="e.g. Chicken Cheese Pizza"
            className={inputClass}
            required
          />
        </div>

        <div>
          <label htmlFor="category" className={labelClass}>
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            name="category"
            defaultValue={initialData?.category || ""}
            className={inputClass}
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="description" className={labelClass}>
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={initialData?.description}
            placeholder="Describe the ingredients, taste, and serving details..."
            className={inputClass}
            required
          />
        </div>
      </section>

      <div className="border-t border-[#F0E5DC]" />

      <section className="space-y-5">
        <div>
          <h2 className="font-semibold text-[#81444A]">
            Price & Location
          </h2>
          <p className="mt-1 text-xs text-gray-500">
            Set your item's price and where it is available.
          </p>
        </div>

        <div>
          <label htmlFor="price" className={labelClass}>
            Price (৳) <span className="text-red-500">*</span>
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min="0.01"
            step="0.01"
            defaultValue={initialData?.price}
            placeholder="e.g. 550"
            className={inputClass}
            required
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="city" className={labelClass}>
              City <span className="text-red-500">*</span>
            </label>
            <input
              id="city"
              name="city"
              type="text"
              defaultValue={initialData?.city}
              placeholder="e.g. Dhaka"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label htmlFor="area" className={labelClass}>
              Area <span className="text-red-500">*</span>
            </label>
            <input
              id="area"
              name="area"
              type="text"
              defaultValue={initialData?.area}
              placeholder="e.g. Mirpur"
              className={inputClass}
              required
            />
          </div>
        </div>
      </section>

      <div className="border-t border-[#F0E5DC]" />

      <section>
        <h2 className="font-semibold text-[#81444A]">
          Food Images
        </h2>
        <p className="mb-4 mt-1 text-xs text-gray-500">
          Upload up to 5 clear images of your food item.
        </p>

        <div className="rounded-xl border border-dashed border-[#D8B9B5] bg-[#FCF9F6] p-5 text-center">
          {imageItems.length > 0 && (
            <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {imageItems.map((image) => (
                <div key={image.id} className="relative">
                  <img
                    src={image.preview}
                    width={400}
                    height={600}
                    alt="Food preview"
                    className="h-32 w-full rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(image.id)}
                    className="absolute right-2 top-2 rounded-full bg-white p-1 text-red-500 shadow"
                    aria-label="Remove image"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <input
            id="images"
            name="images"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            disabled={imageItems.length >= MAX_IMAGES || uploading}
            className="sr-only"
          />

          <label
            htmlFor="images"
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#F8F1E9] px-4 py-3 text-sm font-medium text-[#81444A] hover:bg-[#E8D5C5]"
          >
            <ImagePlus size={18} />
            Add Images
          </label>

          <p className="mt-2 text-xs text-gray-500">
            PNG, JPG or WEBP · {imageItems.length}/{MAX_IMAGES} images
          </p>

          {uploading && (
            <p className="mt-2 text-sm text-[#A85D62]">
              Uploading images...
            </p>
          )}
        </div>
      </section>

      {!initialData && (
        <div className="rounded-lg bg-[#F8F1E9] p-4">
          <p className="text-sm font-semibold text-[#81444A]">
            Admin Approval Required
          </p>
          <p className="mt-1 text-sm text-gray-600">
            Your menu item will be submitted for review. Customers
            won&apos;t be able to see or order it until an admin approves it.
          </p>
        </div>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="reset"
          onClick={() => {
            imageItems.forEach((image) => {
              if (image.preview.startsWith("blob:")) {
                URL.revokeObjectURL(image.preview);
              }
            });

            setImageItems(
              initialImages.map((url, index) => ({
                id: `initial-${index}`,
                preview: url,
                url,
              }))
            );
          }}
          className="rounded-lg border border-[#E8D5C5] px-5 py-3 text-sm font-medium text-gray-600 hover:bg-[#FCF9F6]"
        >
          Clear Form
        </button>

        <button
          type="submit"
          disabled={uploading}
          className="rounded-lg bg-[#A85D62] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#81444A] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
