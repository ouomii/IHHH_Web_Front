import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../App.css';

function Home() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleCardClick = (type) => {
    if (isLoggedIn) {
      if (type === 'download') {
        navigate('/dashboard');
      } else if (type === 'upload') {
        navigate('/upload');
      }
    }
    // 로그인하지 않은 상태에서는 아무 동작도 하지 않음
  };

  return (
    <main className="main-content">
      <h1 className="title">
        <div className="title-content">
          미래를 향한 당신만의<br />
          양자 내성 드라이브 서비스
        </div>
      </h1>
      
      <div className="features-container">
        <h2 className="subtitle">내 파일을 안전하게 관리해보세요</h2>
        
        <div className="features">
          <div 
            className={`feature-card ${isLoggedIn ? 'active' : 'disabled'}`}
            onClick={() => handleCardClick('download')}
            style={{ cursor: isLoggedIn ? 'pointer' : 'not-allowed' }}
          >
            <div className="icon">
              <img src={process.env.PUBLIC_URL + '/minus-file.svg'} alt="다운로드" />
            </div>
            <h3>파일</h3>
            <h3>조회/다운하기</h3>
            <br />
            <span className="description">내 파일 안전하게 다운로드</span>
          </div>
          
          <div 
            className={`feature-card ${isLoggedIn ? 'active' : 'disabled'}`}
            onClick={() => handleCardClick('upload')}
            style={{ cursor: isLoggedIn ? 'pointer' : 'not-allowed' }}
          >
            <div className="icon">
              <img src={process.env.PUBLIC_URL + '/plus-file.svg'} alt="업로드" />
            </div>
            <h3>파일</h3>
            <h3>업로드하기</h3>
            <br /> 
            <span className="description">내 파일 안전하게 업로드</span>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home; 