import React from 'react';
import Image from 'next/image';
import { 
  User, ShoppingBasket, ChevronDown, Phone 
} from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaStar } from 'react-icons/fa';

const Header = () => {
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
        <div className="cursor-pointer">
          <Image 
            src="/Img/logo.webp" 
            alt="Everace Logo" 
            width={140}
            height={35} 
            priority
          />
        </div>

        {/* Links (Replacing Search Bar Position) */}
        <nav className="hidden lg:flex items-center gap-8 text-[13px] font-bold text-gray-800 uppercase tracking-tight">
          <a href="#" className="flex items-center gap-1 hover:text-yellow-500 transition">Home <ChevronDown size={14}/></a>
          <a href="#" className="flex items-center gap-1 hover:text-yellow-500 transition">Pages <ChevronDown size={14}/></a>
          <a href="#" className="flex items-center gap-1 text-yellow-600 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-yellow-500">
            Shop <FaStar size={12} className="text-[#facc15]" />
          </a>
          <a href="#" className="flex items-center gap-1 hover:text-yellow-500 transition">Blog <ChevronDown size={14}/></a>
          <a href="#" className="hover:text-yellow-500 transition">Contact</a>
        </nav>

        {/* Action Buttons (Palm Tree Style) */}
        <div className="flex items-center gap-3">
          <div className="hidden xl:flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-500 mr-2 border-r pr-4">
            <Phone size={14} className="text-yellow-500" /> <span>+91 1111111111</span>
          </div>
          <button className="flex items-center gap-2 border-2 border-gray-100 px-4 py-2 rounded-full text-xs font-bold hover:bg-gray-50 transition">
            <User size={16} /> ACCOUNT
          </button>
          <button className="flex items-center gap-2 bg-[#facc15] px-4 py-2 rounded-full text-xs font-black shadow-md hover:bg-black hover:text-white transition-all duration-300">
            <ShoppingBasket size={16} /> RS. 0.00 (0)
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;