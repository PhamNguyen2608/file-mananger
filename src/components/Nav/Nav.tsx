import { Link } from 'wouter'; // Hoặc 'react-router-dom' nếu bạn đang sử dụng Router này
import Container from '../Container';

const Nav = () => {
  const headerMiddleStyle = {
    backgroundColor: '#31bde3',
    backgroundImage: 'url(https://hoilhpn.org.vn/documents/20182/20870/WedJan06083322ICT2021_anh_nen.png/8f8fa719-823c-413a-83d6-c8e63486b69c)',
    backgroundPosition: 'top right',
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <nav className="mb-12" style={headerMiddleStyle}>
      <Container className="flex justify-between items-center py-4">
        <div className="flex items-center">
          <Link href="/web/guest">
            <a>
              <img src="https://hoilhpn.org.vn/documents/20182/20870/WedJan06094129ICT2021_trang_chinh_moi_2.png/566e5713-4694-4f9c-b381-816e0a9ec863" alt="Cổng Thông Tin Hội Liên hiệp Phụ nữ Việt Nam" style={{ height: '50px' }} /> {/* Điều chỉnh kích thước logo tùy ý */}
            </a>
          </Link>
        </div>
        <p>
          <Link href="/admin">
            <a className="text-md font-medium text-slate-900 hover:text-slate-900 drop-shadow-[0_2px_0px_rgba(255,255,255,1)]">
              Liên hệ
            </a>
          </Link>
        </p>
      </Container>
    </nav>
  );
};

export default Nav;
