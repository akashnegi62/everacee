"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Upload, Package, DollarSign, Layers } from "lucide-react";
import { toast } from "react-hot-toast";
import Image from "next/image";

export default function AddProductPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("/Img/walnuts.jpg");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "Dry Fruits",
    status: "In Stock",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Product added successfully!");
      router.push("/admin/products");
    } catch {
      toast.error("Failed to add product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Back Link */}
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black transition-colors"
      >
        <ArrowLeft size={16} /> Back to Products
      </Link>

      {/* Header */}
      <div>
        <h2 className="text-3xl font-black tracking-tighter text-gray-900 uppercase">Add New Product</h2>
        <p className="text-gray-500 font-medium text-sm">Create a new product listing for your store catalog.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form Fields */}
        <div className="lg:col-span-2 space-y-6 bg-white p-8 rounded-4xl border border-gray-100 shadow-xl">
          <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight pb-4 border-b border-gray-100 flex items-center gap-2">
            <Package size={20} className="text-[#facc15]" /> Product Details
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase text-gray-700 mb-2">Product Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Premium Kashmiri Walnuts"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-gray-50 border-none rounded-2xl py-4 px-5 text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-[#facc15] outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black uppercase text-gray-700 mb-2">Price (₹)</label>
                <div className="relative">
                  <DollarSign size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    required
                    placeholder="0.00"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-11 pr-5 text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-[#facc15] outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-gray-700 mb-2">Initial Stock</label>
                <div className="relative">
                  <Layers size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    name="stock"
                    required
                    placeholder="100"
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-11 pr-5 text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-[#facc15] outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black uppercase text-gray-700 mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 px-5 text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-[#facc15] outline-none transition-all cursor-pointer"
                >
                  <option value="Dry Fruits">Dry Fruits</option>
                  <option value="Honey">Honey</option>
                  <option value="Berries">Berries</option>
                  <option value="Spices">Spices</option>
                  <option value="Nuts">Nuts</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-gray-700 mb-2">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 px-5 text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-[#facc15] outline-none transition-all cursor-pointer"
                >
                  <option value="In Stock">In Stock</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                rows={4}
                placeholder="Describe the product, its origin, flavor profile, and nutritional benefits..."
                value={formData.description}
                onChange={handleChange}
                className="w-full bg-gray-50 border-none rounded-2xl py-4 px-5 text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-[#facc15] outline-none transition-all resize-none"
              />
            </div>
          </div>
        </div>

        {/* Sidebar Image Upload & Actions */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-4xl border border-gray-100 shadow-xl space-y-6">
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight pb-4 border-b border-gray-100 flex items-center gap-2">
              <Upload size={20} className="text-[#facc15]" /> Product Image
            </h3>

            <div className="space-y-4">
              <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-gray-100 border-2 border-dashed border-gray-200 group flex items-center justify-center">
                {imagePreview ? (
                  <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                ) : (
                  <div className="text-center p-4">
                    <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                    <span className="text-xs font-bold text-gray-500 uppercase">Upload Image</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <label className="bg-white text-black px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider shadow-lg cursor-pointer hover:bg-[#facc15] transition-colors">
                    Change Image
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                </div>
              </div>
              <p className="text-[11px] font-bold text-gray-400 text-center uppercase tracking-tight">
                Recommended size: 800x800px (JPG, PNG, WEBP)
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-4xl border border-gray-100 shadow-xl space-y-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#facc15] text-black py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              <Save size={18} />
              {isLoading ? "Saving..." : "Save Product"}
            </button>
            <Link
              href="/admin/products"
              className="w-full bg-gray-100 text-gray-700 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-200 transition-all duration-300 flex items-center justify-center"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
