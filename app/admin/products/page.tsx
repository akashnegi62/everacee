"use client";
import React from "react";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Kashmiri Walnuts",
    price: "21.00",
    stock: 45,
    category: "Dry Fruits",
    image: "/Img/walnuts.jpg",
    status: "In Stock",
  },
  {
    id: 2,
    name: "Kashmiri Dry Honey",
    price: "36.00",
    stock: 12,
    category: "Honey",
    image: "/Img/honey.jpeg",
    status: "Low Stock",
  },
  {
    id: 3,
    name: "Kashmiri Almond",
    price: "44.00",
    stock: 88,
    category: "Dry Fruits",
    image: "/Img/almonds.jpg",
    status: "In Stock",
  },
  {
    id: 4,
    name: "Kashmiri Blueberry",
    price: "36.00",
    stock: 0,
    category: "Berries",
    image: "/Img/blueberry.jpg",
    status: "Out of Stock",
  },
];

export default function AdminProducts() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tighter text-gray-900 uppercase">Products</h2>
          <p className="text-gray-500 font-medium text-sm">Manage your inventory and product listings.</p>
        </div>
        <Link href="/admin/products/add" className="flex items-center justify-center gap-2 bg-gray-900 text-[#facc15] px-6 py-3 rounded-full font-black text-sm uppercase tracking-widest hover:bg-black transition-all shadow-lg hover:shadow-[#facc15]/20">
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full bg-gray-50 border-none rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-[#facc15] outline-none"
          />
        </div>
        <select className="bg-gray-50 border-none rounded-2xl py-3 px-6 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-[#facc15] outline-none cursor-pointer">
          <option>All Categories</option>
          <option>Dry Fruits</option>
          <option>Honey</option>
          <option>Berries</option>
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-4xl border border-gray-100 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-gray-400">Product</th>
                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-gray-400">Category</th>
                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-gray-400">Price</th>
                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-gray-400">Stock</th>
                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-gray-400">Status</th>
                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-black text-gray-900 uppercase tracking-tight">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-bold text-gray-500">{product.category}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-lg font-black text-gray-900">${product.price}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-bold text-gray-600">{product.stock} units</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                      product.status === "In Stock" ? "bg-green-100 text-green-700" :
                      product.status === "Low Stock" ? "bg-orange-100 text-orange-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-black transition-colors">
                        <Edit size={18} />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
