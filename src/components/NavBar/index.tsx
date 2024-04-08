import React from 'react';
import { Link } from 'wouter'; // Sử dụng Link từ wouter

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              {/* Logo của website, thay thế "/" bằng đường dẫn trang chủ của bạn */}
              <a href="/" className="flex items-center py-4 px-2">
                <span className="font-semibold text-gray-500 text-lg">Tên Hội</span>
              </a>
            </div>
            {/* Primary Navbar items */}
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/nop-bao-cao" className="py-4 px-2 text-gray-500 border-b-4 border-blue-500 font-semibold ">Nộp Báo Cáo</Link>
              <Link href="/chi-hoi-truong" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">Chi Hội Trưởng</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
