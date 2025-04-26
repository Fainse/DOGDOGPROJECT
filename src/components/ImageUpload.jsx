import React, { useState, useRef } from 'react';

const ImageUpload = ({ onPredict }) => {
  const fileInputRef = useRef();
  const imageRef = useRef();
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handlePredictClick = () => {
    if (imageRef.current) {
      onPredict(imageRef.current);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full">
      <div
        className={`w-full max-w-md p-6 border-2 ${
          isDragging ? 'border-blue-500' : 'border-gray-300'
        } border-dashed rounded-xl flex flex-col items-center justify-center bg-white cursor-pointer transition`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          ref={fileInputRef}
          className="hidden"
        />
        <p className="text-gray-500 text-center">Drag & Drop an image here<br />or Click to Upload</p>
      </div>
      {preview && (
        <div className="flex flex-col items-center space-y-4">
          <img src={preview} alt="Preview" ref={imageRef} crossOrigin="anonymous" className="max-w-xs rounded-lg shadow-md" />
          <button onClick={handlePredictClick} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg">
            Predict Breed
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
