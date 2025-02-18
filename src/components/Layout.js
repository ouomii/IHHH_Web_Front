import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Layout({ children }) {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    if (isLoggedIn) {
      if (window.confirm('정말로 로그아웃 하시겠습니까?')) {
        logout();
        navigate('/');
      }
    } else {
      navigate('/login');
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className="App">
      <header className="header">
        <div className="logo">
          <Link to="/">
            <img 
              src={process.env.PUBLIC_URL + '/logo.svg'} 
              alt="로고" 
              onClick={handleLogoClick}
              style={{ cursor: 'pointer' }}  // 마우스 오버 시 포인터 커서 표시
            />
          </Link>
          <button 
            className="auth-button" 
            onClick={handleLoginClick}
          >
            {isLoggedIn ? '로그아웃' : '로그인'}
          </button>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}

export default Layout;