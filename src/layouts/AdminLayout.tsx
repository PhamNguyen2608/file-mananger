import Navbar from '@/components/NavBar';
import React from 'react';
import { Link } from 'wouter';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header chiếm hết chiều ngang phía trên cùng */}
      <div
        className="w-full"
        style={{
          backgroundColor: '#31bde3',
          backgroundImage: 'url(https://hoilhpn.org.vn/documents/20182/20870/WedJan06083322ICT2021_anh_nen.png/8f8fa719-823c-413a-83d6-c8e63486b69c)',
          backgroundPosition: 'top right',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="text-center">
          <a href="/web/guest">
            <img
              src="https://hoilhpn.org.vn/documents/20182/20870/WedJan06094129ICT2021_trang_chinh_moi_2.png/566e5713-4694-4f9c-b381-816e0a9ec863"
              alt="Cổng Thông Tin Hội Liên hiệp Phụ nữ Việt Nam"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </a>
        </div>
      </div>

      {/* Layout chính bao gồm sidebar và nội dung chính */}
      <div className="flex flex-1">
        {/* Sidebar nằm dọc bên trái */}
        <div className="bg-blue-500 text-white w-64">
          <div className="flex flex-col py-4">
            <Link href="/nop-bao-cao" className="py-2 px-4 text-white hover:bg-blue-600 transition duration-200">
              Nộp Báo Cáo
            </Link>
            <Link href="/chi-hoi-truong" className="py-2 px-4 text-white hover:bg-blue-600 transition duration-200">
              Chi Hội Trưởng
            </Link>
          </div>
        </div>

        {/* Main content nằm bên phải của sidebar */}
        <main className="flex-1 p-5">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
