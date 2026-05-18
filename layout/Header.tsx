"use client";
import React, { useState } from "react";
import Image from "next/image";
import { User, ShoppingBasket, ChevronDown, Phone } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaStar,
  FaSignOutAlt
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

const navItems = [
  {
    name: "Home",
    href: "#",
    hasDropdown: true,
    subItems: [
      "Main Home",
      "Organic Juice Store",
      "Organic Produce",
      "Nut Shop",
      "Healthy Food",
      "Organic Market",
      "Landing",
    ],
  },
  {
    name: "Pages",
    href: "#",
    hasDropdown: true,
    subItems: [
      "About Us",
      "Gift Cards",
      "Reviews",
      "FAQ Page",
      "Terms & Conditions",
    ],
  },
  {
    name: "Shop",
    href: "#",
    hasDropdown: true,
    isMega: true,
    megaMenu: [
      {
        title: "Shop Layouts",
        items: [
          "Two Columns",
          "Three Columns",
          "Four Columns Grid",
          "Four Columns Wide",
          "Five Columns Wide",
        ],
      },
      {
        title: "Product Types",
        items: [
          "Standard",
          "Big Gallery",
          "Big Images",
          "Countdown Product",
          "Variable Flavors Product",
          "Variable Weight Product",
          "Variable Colors Product",
          "Sale Product",
          "New Product",
          "Grouped Product",
          "Thumbnail Images Left",
        ],
      },
      {
        title: "Shop Pages",
        items: ["My Account", "Cart", "Checkout", "Order Tracking"],
      },
    ],
  },
  {
    name: "Blog",
    href: "#",
    hasDropdown: true,
    subItems: ["Standard", "Masonry", "Post Formats"],
  },
  {
    name: "Contact",
    href: "#",
    hasDropdown: false,
  },
];

const Header = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { user, logout, isAuthenticated } = useAuth();
  const { cartTotal, itemCount } = useCart();

  return (
    <header className="w-full font-sans absolute top-0 left-0 z-50 bg-white/90 backdrop-blur-md border-b border-white/20">
      {/* Top Announcement Bar */}
      <div className="bg-[#facc15] py-2 px-6 flex justify-between items-center text-[10px] sm:text-xs font-bold uppercase tracking-widest text-black">
        <div className="flex gap-4">
          <FaFacebookF size={14} className="cursor-pointer hover:opacity-70" />
          <FaInstagram size={14} className="cursor-pointer hover:opacity-70" />
          <FaLinkedinIn size={14} className="cursor-pointer hover:opacity-70" />
          <FaYoutube size={14} className="cursor-pointer hover:opacity-70" />
        </div>
        <p>Free shipping for orders over ₹2000</p>
        <div className="hidden md:block w-20"></div>
      </div>

      {/* Main Navigation Row */}
      <div className="py-4 px-8 flex justify-between items-center border-b border-gray-100">
        {/* Logo (Everace Branding) */}
        <Link href="/" className="cursor-pointer">
          <Image
            src="/Img/logo.webp"
            alt="Everace Logo"
            width={140}
            height={35}
            priority
          />
        </Link>

        {/* Links with Subtabs */}
        <nav className="hidden lg:flex items-center gap-8 text-[13px] font-bold text-gray-800 uppercase tracking-tight relative">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative group h-full py-2"
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <a
                href={item.href}
                className={`flex items-center gap-1 transition-colors duration-300 ${
                  hoveredItem === item.name
                    ? "text-yellow-600"
                    : "text-gray-800"
                } ${item.name === "Shop" ? "text-yellow-600" : ""}`}
              >
                {item.name}
                {item.name === "Shop" && (
                  <FaStar size={12} className="text-[#facc15]" />
                )}
                {item.hasDropdown && (
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${hoveredItem === item.name ? "rotate-180" : ""}`}
                  />
                )}
              </a>

              {/* Active Indicator for Shop */}
              {item.name === "Shop" && (
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-yellow-500" />
              )}

              {/* Dropdowns */}
              <AnimatePresence>
                {hoveredItem === item.name && item.hasDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute top-full left-0 mt-2 bg-white border border-gray-100 shadow-2xl rounded-sm overflow-hidden z-60 ${
                      item.isMega
                        ? "fixed left-0 right-0 mx-auto w-[90vw] max-w-7xl px-12 py-10 grid grid-cols-3 gap-12"
                        : "w-56 py-2"
                    }`}
                  >
                    {!item.isMega
                      ? item.subItems?.map((sub) => (
                          <a
                            key={sub}
                            href="#"
                            className="block px-6 py-3 text-[12px] text-gray-600 hover:text-yellow-600 hover:bg-green-50/50 transition-all duration-200"
                          >
                            {sub}
                          </a>
                        ))
                      : item.megaMenu?.map((section) => (
                          <div
                            key={section.title}
                            className="flex flex-col gap-6"
                          >
                            <h3 className="text-[14px] font-black border-b border-gray-100 pb-3 mb-2">
                              {section.title}
                            </h3>
                            <div className="flex flex-col gap-3">
                              {section.items.map((sub) => (
                                <a
                                  key={sub}
                                  href="#"
                                  className="text-[12px] font-bold text-gray-500 hover:text-yellow-600 transition-colors"
                                >
                                  {sub}
                                </a>
                              ))}
                            </div>
                          </div>
                        ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden xl:flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-500 mr-2 border-r pr-4">
            <Phone size={14} className="text-yellow-500" />{" "}
            <span>+91 1111111111</span>
          </div>
          
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link href="/profile" className="flex items-center gap-2 border-2 border-yellow-100 px-4 py-2 rounded-full text-xs font-bold bg-yellow-50/50 hover:bg-yellow-100/80 transition-colors cursor-pointer">
                <User size={16} className="text-yellow-600" /> 
                <span className="uppercase">{user?.firstName}</span>
              </Link>
              <button 
                onClick={logout}
                className="p-2.5 bg-gray-100 rounded-full hover:bg-red-50 hover:text-red-600 transition-all group"
                title="Logout"
              >
                <FaSignOutAlt size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          ) : (
            <Link href="/login" className="flex items-center gap-2 border-2 border-gray-100 px-4 py-2 rounded-full text-xs font-bold hover:bg-gray-50 transition">
              <User size={16} /> ACCOUNT
            </Link>
          )}
          <Link href="/cart" className="flex items-center gap-2 bg-[#facc15] px-4 py-2 rounded-full text-xs font-black shadow-md hover:bg-black hover:text-white transition-all duration-300">
            <ShoppingBasket size={16} /> RS. {cartTotal.toFixed(2)} ({itemCount})
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
