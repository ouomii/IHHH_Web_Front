import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/FileUpload.css';

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setError('');
    }
  };

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      setError('');
    }
  }, []);

  const resetForm = () => {
    setSelectedFile(null);
    setError('');
    // file input 초기화
    const fileInput = document.getElementById('file');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('파일을 선택해주세요.');
      return;
    }

    try {
      // 파일을 Base64로 변환
      const reader = new FileReader();
      reader.onload = async (e) => {
        const fileData = e.target.result; // Base64 데이터
        const fileInfo = {
          name: selectedFile.name,
          size: selectedFile.size,
          uploadDate: new Date().toLocaleString(),
          data: fileData, // Base64 데이터 저장
          type: selectedFile.type // 파일 타입 저장
        };

        const existingFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
        const updatedFiles = [...existingFiles, fileInfo];
        localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));

        alert('파일이 성공적으로 업로드되었습니다.');
        resetForm();
        navigate('/dashboard');
      };
      reader.readAsDataURL(selectedFile);
    } catch (err) {
      setError('파일 업로드에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="upload-page">
      <div className="upload-container">
        <h2>파일 업로드</h2>
        {error && <div className="error-message">{error}</div>}
        <form className="upload-form" onSubmit={handleSubmit}>
          <div 
            className={`file-input-container ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="file"
              onChange={handleFileSelect}
              className="file-input"
            />
            <label htmlFor="file" className="file-label">
              <div className="upload-icon">+</div>
              <div className="upload-text">
                {selectedFile ? (
                  <>
                    <p className="file-name">{selectedFile.name}</p>
                    <p className="file-size">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <button type="submit" className="upload-button">
                      업로드하기
                    </button>
                  </>
                ) : (
                  <>
                    <p>파일을 선택하거나 드래그하세요</p>
                    <span className="upload-hint">클릭하여 파일 선택</span>
                  </>
                )}
              </div>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FileUpload; 