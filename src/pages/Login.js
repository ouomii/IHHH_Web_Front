import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 기본적인 유효성 검사
    if (!formData.email || !formData.password) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    try {
      // API 호출 로직은 나중에 구현
      console.log('로그인 시도:', formData);
      login();  // AuthContext의 login 함수 사용
      navigate('/');
    } catch (err) {
      setError('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>로그인</h2>
        {error && <div className="error-message">{error}</div>}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="이메일을 입력하세요"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <button type="submit" className="login-button">로그인</button>
        </form>
        <div className="login-footer">
          <p>계정이 없으신가요? <Link to="/register">회원가입</Link></p>
          <Link to="/forgot-password" className="forgot-password">비밀번호를 잊으셨나요?</Link>
        </div>
      </div>
    </div>
  );
}

export default Login; 