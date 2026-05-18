"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Eye, Heart, ArrowLeftRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { mockProducts as allProducts } from "@/lib/mockProducts";

const AllProduct = () => {
  const { addToCart } = useCart();
  return (
    <section className="py-20 bg-[#fdfbf9]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl font-black tracking-tighter text-gray-900 mb-4"
          >
            Our Healthy Nut Products
          </motion.h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-medium">
            Discover a wide range of organic and crunchy nut snacks packed with
            nutrition and flavor for your everyday lifestyle.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {allProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-[32px] p-5 flex flex-col items-center text-center shadow-sm border border-transparent hover:border-yellow-100 hover:shadow-xl transition-all duration-300"
            >
              {/* Image Container with Floating Actions */}
              <div className="relative w-full aspect-square bg-[#f8f8f8] rounded-[24px] overflow-hidden mb-6 flex items-center justify-center">
                {product.status && (
                  <span className="absolute top-4 left-4 bg-[#facc15] text-[11px] font-black px-3 py-1 rounded-full uppercase z-10 shadow-sm">
                    {product.status}
                  </span>
                )}

                {/* Secondary Actions (Visible on Hover) */}
                <div className="absolute right-4 top-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <Link href={`/product/${product.id}`} className="p-2 bg-white text-gray-800 rounded-full shadow-md hover:bg-[#facc15] transition-colors flex items-center justify-center">
                    <Eye size={16} />
                  </Link>
                  <button className="p-2 bg-white rounded-full shadow-md hover:bg-[#facc15] transition-colors cursor-pointer">
                    <Heart size={16} />
                  </button>
                  <button className="p-2 bg-white rounded-full shadow-md hover:bg-[#facc15] transition-colors cursor-pointer">
                    <ArrowLeftRight size={16} />
                  </button>
                </div>

                <Link href={`/product/${product.id}`} className="relative w-full h-full block">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </Link>
              </div>

              {/* Price & Rating Row */}
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-sm font-bold text-gray-400">From</span>
                <span className="text-xl font-black text-gray-900">
                  ${product.price}
                </span>
                {product.oldPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    ${product.oldPrice}
                  </span>
                )}
              </div>

              {/* Title */}
              <Link href={`/product/${product.id}`} className="text-sm font-bold text-gray-800 hover:text-yellow-600 transition-colors mb-3 h-10 line-clamp-2 px-2 leading-tight block">
                {product.name}
              </Link>

              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => {
                  const val = i + 1;
                  return (
                    <span key={i}>
                      {product.rating >= val ? (
                        <FaStar className="text-[#facc15] text-[10px]" />
                      ) : product.rating >= val - 0.5 ? (
                        <FaStarHalfAlt className="text-[#facc15] text-[10px]" />
                      ) : (
                        <FaRegStar className="text-gray-200 text-[10px]" />
                      )}
                    </span>
                  );
                })}
                <span className="text-[10px] font-bold text-gray-400 ml-1">
                  ({product.rating})
                </span>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => addToCart({ id: `all-${product.id}`, name: product.name, price: product.price, image: product.image })}
                className="w-full py-3.5 border-2 border-gray-900 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-all cursor-pointer">
                Add to Cart
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllProduct;
