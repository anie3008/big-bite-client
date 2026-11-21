
// "use client";

// import { useEffect, useState, type FormEvent } from "react";
// import Link from "next/link";
// import { ArrowLeft, ImagePlus } from "lucide-react";

// const categories = ["Pizza", "Sides", "Drinks", "Desserts"];

// export default function AddMenuItemPage() {
//   const [message, setMessage] = useState("");
//    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

//   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setMessage("");

//     const formData = new FormData(event.currentTarget);

//     const price = Number(formData.get("price"));
//     const image = formData.get("image");

//     if (!Number.isFinite(price) || price <= 0) {
//       setMessage("Please enter a valid price greater than zero.");
//       return;
//     }

//     if (!(image instanceof File) || image.size === 0) {
//       setMessage("Please select a food image.");
//       return;
//     }

//     if (!image.type.startsWith("image/")) {
//       setMessage("Please select a valid image file.");
//       return;
//     }

//     const [previewUrl, setPreviewUrl] = useState<string | null>(null);

//     // Frontend validation only. Backend submission comes later.
//     setMessage(
//       "Your form is valid! We'll connect the submission to the backend next."
//     );
//   };

//   const handleImageChange = (
//   event: React.ChangeEvent<HTMLInputElement>
// ) => {
//   const file = event.target.files?.[0];

//   if (!file) {
//     setPreviewUrl(null);
//     return;
//   }

//   const imageUrl = URL.createObjectURL(file);
//   setPreviewUrl(imageUrl);
// };

// useEffect(() => {
//   return () => {
//     if (previewUrl) {
//       URL.revokeObjectURL(previewUrl);
//     }
//   };
// }, [previewUrl]);

//   const inputClass =
//     "w-full rounded-lg border border-[#E8D5C5] bg-white px-4 py-3 text-sm text-[#3B292B] outline-none transition placeholder:text-gray-400 focus:border-[#A85D62] focus:ring-2 focus:ring-[#A85D62]/10";

//   const labelClass = "mb-2 block text-sm font-medium text-[#3B292B]";

//   return (
//     <div className="mx-auto max-w-4xl space-y-6">
//       {/* Page heading */}
//       <div>
//         <Link
//           href="/vendor/menu"
//           className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#A85D62]"
//         >
//           <ArrowLeft size={16} />
//           Back to My Menu Items
//         </Link>

//         <h1 className="text-2xl font-bold text-[#3B292B]">
//           Add New Menu Item
//         </h1>
//         <p className="mt-1 text-sm text-gray-500">
//           Add a new food item to your restaurant menu.
//         </p>
//       </div>

//       <form
//         onSubmit={handleSubmit}
//         className="space-y-6 rounded-xl border border-[#E8D5C5] bg-white p-6 sm:p-8"
//       >
//         {/* Basic information */}
//         <section className="space-y-5">
//           <div>
//             <h2 className="font-semibold text-[#81444A]">
//               Basic Information
//             </h2>
//             <p className="mt-1 text-xs text-gray-500">
//               Provide the basic details of your food item.
//             </p>
//           </div>

//           <div>
//             <label htmlFor="name" className={labelClass}>
//               Item Name <span className="text-red-500">*</span>
//             </label>
//             <input
//               id="name"
//               name="name"
//               type="text"
//               placeholder="e.g. Chicken Cheese Pizza"
//               className={inputClass}
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="category" className={labelClass}>
//               Category <span className="text-red-500">*</span>
//             </label>
//             <select
//               id="category"
//               name="category"
//               defaultValue=""
//               className={inputClass}
//               required
//             >
//               <option value="" disabled>
//                 Select a category
//               </option>
//               {categories.map((category) => (
//                 <option key={category} value={category}>
//                   {category}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label htmlFor="description" className={labelClass}>
//               Description <span className="text-red-500">*</span>
//             </label>
//             <textarea
//               id="description"
//               name="description"
//               rows={4}
//               placeholder="Describe the ingredients, taste, and serving details..."
//               className={inputClass}
//               required
//             />
//           </div>
//         </section>

//         <div className="border-t border-[#F0E5DC]" />

//         {/* Price and location */}
//         <section className="space-y-5">
//           <div>
//             <h2 className="font-semibold text-[#81444A]">
//               Price & Location
//             </h2>
//             <p className="mt-1 text-xs text-gray-500">
//               Set your item's price and where it is available.
//             </p>
//           </div>

//           <div>
//             <label htmlFor="price" className={labelClass}>
//               Price (৳) <span className="text-red-500">*</span>
//             </label>
//             <input
//               id="price"
//               name="price"
//               type="number"
//               min="0.01"
//               step="0.01"
//               placeholder="e.g. 550"
//               className={inputClass}
//               required
//             />
//           </div>

//           <div className="grid gap-5 sm:grid-cols-2">
//             <div>
//               <label htmlFor="city" className={labelClass}>
//                 City <span className="text-red-500">*</span>
//               </label>
//               <input
//                 id="city"
//                 name="city"
//                 type="text"
//                 placeholder="e.g. Dhaka"
//                 className={inputClass}
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="area" className={labelClass}>
//                 Area <span className="text-red-500">*</span>
//               </label>
//               <input
//                 id="area"
//                 name="area"
//                 type="text"
//                 placeholder="e.g. Mirpur"
//                 className={inputClass}
//                 required
//               />
//             </div>
//           </div>
//         </section>

//         <div className="border-t border-[#F0E5DC]" />

//         {/* Image upload */}
//         <section>
//           <h2 className="font-semibold text-[#81444A]">
//             Food Image
//           </h2>
//           <p className="mb-4 mt-1 text-xs text-gray-500">
//             Upload a clear image of your food item.
//           </p>
// <label
//   htmlFor="image"
//   className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#D8B9B5] bg-[#FCF9F6] px-5 py-10 text-center transition hover:bg-[#F8F1E9]"
// >
//   {previewUrl ? (
//     <div className="space-y-3">
//       <img
//         src={previewUrl}
//         alt="Selected food preview"
//         className="mx-auto h-48 w-64 rounded-lg object-cover"
//       />

//       <p className="text-sm font-medium text-[#81444A]">
//         Click to change image
//       </p>
//     </div>
//   ) : (
//     <>
//       <ImagePlus size={32} className="mb-3 text-[#A85D62]" />

//       <span className="text-sm font-medium text-[#81444A]">
//         Choose an image
//       </span>

//       <span className="mt-1 text-xs text-gray-500">
//         PNG, JPG or WEBP
//       </span>
//     </>
//   )}

//   <input
//     id="image"
//     name="image"
//     type="file"
//     accept="image/*"
//     onChange={handleImageChange}
//     className="sr-only"
//     required
//   />
// </label>
//         </section>

//         {/* Approval notice */}
//         <div className="rounded-lg bg-[#F8F1E9] p-4">
//           <p className="text-sm font-semibold text-[#81444A]">
//             Admin Approval Required
//           </p>
//           <p className="mt-1 text-sm text-gray-600">
//             Your menu item will be submitted for review. Customers won't
//             be able to see or order it until an admin approves it.
//           </p>
//         </div>

//         {message && (
//           <p
//             role="status"
//             className="rounded-lg bg-[#F8F1E9] p-3 text-sm text-[#81444A]"
//           >
//             {message}
//           </p>
//         )}

//         {/* Submit */}
//         <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
//           <button
//             type="reset"
//             onClick={() => setMessage("")}
//             className="rounded-lg border border-[#E8D5C5] px-5 py-3 text-sm font-medium text-gray-600 transition hover:bg-[#FCF9F6]"
//           >
//             Clear Form
//           </button>

//           <button
//             type="submit"
//             className="rounded-lg bg-[#A85D62] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#81444A]"
//           >
//             Submit Menu Item
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
