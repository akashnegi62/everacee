"use client";
import React, { useState, useEffect } from "react";
import { motion, PanInfo } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import { mockProducts } from "@/lib/mockProducts";

const productIds = [3, 9, 5, 6, 10, 11, 12, 13];
const products = productIds.map((id) => mockProducts.find((p) => p.id === id)!).filter(Boolean);

const ProductSec = () => {
  const { addToCart } = useCart();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      let newItemsPerPage = 4;
      if (window.innerWidth < 640) {
        newItemsPerPage = 1;
      } else if (window.innerWidth < 1024) {
        newItemsPerPage = 2;
      }
      setItemsPerPage(newItemsPerPage);
      // Reset index to prevent out-of-bounds errors on resize
      setCurrentIndex(0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      nextSlide();
    } else if (info.offset.x > threshold) {
      prevSlide();
    }
  };

  return (
    <section id="bestseller" className="py-24 px-4 sm:px-8 bg-[#fdfbf9] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-16 text-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-gray-900 uppercase">
              Bestseller
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl text-sm md:text-lg leading-relaxed font-medium">
              Premium quality dry fruits and preserves sourced directly from the
              valleys of Kashmir.
            </p>
          </motion.div>
          <div className="flex gap-3">
            <button
              onClick={prevSlide}
              className="p-3 sm:p-4 border-2 border-gray-200 rounded-full hover:bg-black hover:text-white hover:border-black transition-all duration-300 shadow-sm"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 sm:p-4 border-2 border-black bg-black text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-md"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Product Carousel Container */}
        <div className="relative cursor-grab active:cursor-grabbing overflow-hidden py-2">
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            animate={{ x: `-${currentIndex * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex touch-pan-y"
          >
            {/* Pages of Products */}
            {[...Array(totalPages)].map((_, pageIndex) => (
              <div
                key={pageIndex}
                className={`min-w-full grid gap-6 sm:gap-8 px-2 ${
                  itemsPerPage === 1
                    ? "grid-cols-1"
                    : itemsPerPage === 2
                      ? "grid-cols-2"
                      : "grid-cols-4"
                }`}
              >
                {products
                  .slice(
                    pageIndex * itemsPerPage,
                    (pageIndex + 1) * itemsPerPage,
                  )
                  .map((product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className="group bg-white rounded-4xl p-5 sm:p-6 flex flex-col items-center text-center shadow-sm border border-gray-100 hover:border-transparent transition-all duration-500 select-none"
                    >
                      {/* Image Container */}
                      <div className="relative w-full aspect-square bg-[#f9f9f9] rounded-3xl overflow-hidden mb-6 sm:mb-8 flex items-center justify-center">
                        {product.discount || product.status ? (
                          <span className="absolute top-4 left-4 bg-[#facc15] text-[10px] sm:text-[11px] font-black px-3 py-1.5 rounded-full uppercase z-10 shadow-lg">
                            {product.discount || product.status}
                          </span>
                        ) : null}
                        <Link href={`/product/${product.id}`} className="relative w-full h-full block">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out pointer-events-none"
                          />
                        </Link>
                      </div>

                      {/* Price & Rating */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">
                          From
                        </span>
                        <span className="text-lg sm:text-xl font-black text-gray-900">
                          ${product.price}
                        </span>
                        {product.oldPrice && (
                          <span className="text-xs sm:text-sm text-gray-400 line-through font-bold">
                            ${product.oldPrice}
                          </span>
                        )}
                      </div>

                      <Link href={`/product/${product.id}`} className="text-base sm:text-lg font-black text-gray-800 hover:text-yellow-600 transition-colors mt-2 mb-3 h-10 sm:h-12 line-clamp-2 px-2 leading-tight uppercase tracking-tight block">
                        {product.name}
                      </Link>

                      {/* Rating */}
                      <div className="flex items-center gap-1.5 mb-6 sm:mb-8">
                        {[...Array(5)].map((_, i) => {
                          const ratingValue = i + 1;
                          return (
                            <span key={i}>
                              {product.rating >= ratingValue ? (
                                <FaStar className="text-[#facc15] text-[12px] sm:text-[13px]" />
                              ) : product.rating >= ratingValue - 0.5 ? (
                                <FaStarHalfAlt className="text-[#facc15] text-[12px] sm:text-[13px]" />
                              ) : (
                                <FaRegStar className="text-gray-200 text-[12px] sm:text-[13px]" />
                              )}
                            </span>
                          );
                        })}
                        <span className="text-[10px] sm:text-[11px] font-black text-gray-400 ml-2">
                          {product.rating}
                        </span>
                      </div>

                      {/* Action Button (Pill Style) */}
                      <button 
                        onClick={() => addToCart({ id: `prod-${product.id}`, name: product.name, price: product.price, image: product.image })}
                        className="w-full py-3 sm:py-4 border-2 border-gray-900 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg">
                        Add to Cart
                      </button>
                    </motion.div>
                  ))}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Carousel Indicator */}
        <div className="flex justify-center gap-3 mt-12 sm:mt-16">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all duration-500 ${
                currentIndex === i
                  ? "w-8 sm:w-12 bg-black"
                  : "w-2 bg-gray-200 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSec;
