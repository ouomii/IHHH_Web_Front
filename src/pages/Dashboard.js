import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // localStorage에서 파일 목록 불러오기
    const savedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
    setFiles(savedFiles);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteAll = () => {
    if (window.confirm('모든 파일을 삭제하시겠습니까?')) {
      localStorage.removeItem('uploadedFiles');
      setFiles([]);
    }
  };

  const handleDeleteFile = (index) => {
    if (window.confirm('정말로 이 파일을 삭제하시겠습니까?')) {
      const updatedFiles = files.filter((_, i) => i !== index);
      localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));
      setFiles(updatedFiles);
    }
  };

  const handleSaveFile = (file) => {
    try {
      // Base64 데이터를 Blob으로 변환
      const byteString = atob(file.data.split(',')[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      
      const blob = new Blob([ab], { type: file.type });
      
      // 다운로드 링크 생성
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name; // 다운로드될 파일명
      
      // 링크 클릭 시뮬레이션
      document.body.appendChild(link);
      link.click();
      
      // cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('파일 다운로드 중 오류 발생:', error);
      alert('파일 다운로드에 실패했습니다.');
    }
  };

  const handleUpload = () => {
    navigate('/upload');
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h2>내 드라이브</h2>
          <button className="upload-button" onClick={handleUpload}>
            파일 업로드
          </button>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="최신순으로 나열"
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
            style={{ cursor: 'default' }}
            readOnly
          />
          <div className="button-group">
            <button className="delete-all-button" onClick={handleDeleteAll}>
              전체 삭제
            </button>
          </div>
        </div>
        <div className="files-container">
          {files.length > 0 ? (
            <div className="file-list">
              {files.map((file, index) => (
                <div key={index} className="file-item">
                  <span className="file-name">{file.name}</span>
                  <div className="file-actions">
                    <button 
                      className="save-button"
                      onClick={() => handleSaveFile(file)}
                    >
                      저장하기
                    </button>
                    <button 
                      className="delete-button"
                      onClick={() => handleDeleteFile(index)}
                    >
                      삭제하기
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-files-message">
              내 파일이 안전하게 다운로드
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 