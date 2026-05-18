"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Package, LogOut } from "lucide-react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname() || "";

  const isProductsActive = pathname.startsWith("/admin/products");
  const isUsersActive = pathname.startsWith("/admin/users");
  const isDashboardActive = pathname === "/admin";

  const getPageTitle = () => {
    if (pathname.includes("/products/add")) return "Add Product";
    if (isProductsActive) return "Products";
    if (isUsersActive) return "Users";
    return "Dashboard";
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200 font-black text-xl tracking-tight uppercase">
          Everace Admin
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            <li>
              <Link
                href="/admin"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold text-sm transition-colors cursor-pointer ${
                  isDashboardActive
                    ? "bg-[#facc15] text-black shadow-md font-black"
                    : "text-gray-600 hover:bg-gray-50 hover:text-black"
                }`}
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/admin/products"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold text-sm transition-colors cursor-pointer ${
                  isProductsActive
                    ? "bg-[#facc15] text-black shadow-md font-black"
                    : "text-gray-600 hover:bg-gray-50 hover:text-black"
                }`}
              >
                <Package size={18} />
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/admin/users"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold text-sm transition-colors cursor-pointer ${
                  isUsersActive
                    ? "bg-[#facc15] text-black shadow-md font-black"
                    : "text-gray-600 hover:bg-gray-50 hover:text-black"
                }`}
              >
                <Users size={18} />
                Users
              </Link>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 font-bold text-sm transition-colors cursor-pointer"
          >
            <LogOut size={18} />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Admin Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="h-8 w-1 bg-[#facc15] rounded-full hidden md:block" />
            <h1 className="font-black text-xl tracking-tight uppercase">{getPageTitle()}</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-[#facc15] font-black text-sm border-2 border-gray-100 shadow-sm">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-8">{children}</div>
      </main>
    </div>
  );
}
