"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";

// Filtered data for exactly two premium cards
const cardData = [
  {
    id: 1,
    title: "Why Choose Organic Nuts?",
    content:
      "Our organic nuts are the pure path to health, free from harmful pesticides and packed with natural vitality.",
    image: "/Img/gallery1.jpeg", // Use your background-removed PNG
  },
  {
    id: 2,
    title: "Deluxe Roasted Salted Mixed Nuts",
    content:
      "A savory sensation: deluxe roasted mixed nuts seasoned with sea salt for the ultimate flavor experience.",
    image: "/Img/almonds.jpg", // Use your background-removed PNG
  },
];

const MarqueSec = () => {
  const marqueeText =
    " • Organic & Fresh • Packed with Essential Nutrients • Your Daily Superfood • ";

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-6 z-10">
        {/* 2. Premium 2-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-stretch">
          {cardData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-[30px] shadow-2xl hover:shadow-cyan-100 transition-all border border-gray-100/50"
            >
              {/* Product Visual (Using BG-removed PNG) */}
              <div className="relative w-44 h-44 shrink-0 group">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 drop-shadow-2xl"
                  priority
                />
              </div>

              {/* Text Content */}
              <div className="grow text-center md:text-left">
                <h3 className="text-2xl font-black text-gray-950 mb-3 leading-tight tracking-tight">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 font-medium">
                  {item.content}
                </p>
                <button className="text-sm font-black text-[#0ea5e9] uppercase tracking-wider hover:text-black transition-colors">
                  Explore Now →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3. The Animated Marquee */}
      <div className="relative bg-[#0ea5e9] py-5 flex overflow-hidden select-none z-10">
        <motion.div
          className="flex whitespace-nowrap gap-10 items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 25, repeat: Infinity }}
        >
          {/* Loop text four times for smooth wrap */}
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-10">
              <span className="text-white text-lg font-black uppercase tracking-widest flex items-center gap-4">
                <Star className="fill-white text-white" size={20} />
                {marqueeText}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MarqueSec;
