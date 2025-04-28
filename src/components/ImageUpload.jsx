import React, { useState, useRef } from 'react';
import { PawPrint } from 'lucide-react';

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
    <div className="flex flex-col items-center space-y-6 w-full">
      {/* Dancing Dog GIF */}
      <img
        src="/gras.gif"
        alt="Dancing dog"
        className="w-24 h-24 object-contain drop-shadow animate-bounce"
      />

      {/* Upload Area (Always visible) */}
      <div
        className={`w-full max-w-md p-6 border-2 ${
          isDragging ? 'border-blue-500' : 'border-gray-300'
        } border-dashed rounded-2xl flex flex-col items-center justify-center bg-white cursor-pointer transition hover:shadow-md space-y-4`}
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

        {preview ? (
          <>
            <img
              src={preview}
              alt="Uploaded Preview"
              ref={imageRef}
              crossOrigin="anonymous"
              className="max-h-64 rounded-xl shadow-md object-contain transition-opacity duration-500"
            />
            <p className="text-gray-400 text-xs">Click or Drag to Replace Image</p>
          </>
        ) : (
          <>
            <PawPrint size={48} className="text-green-400 mb-2" />
            <p className="text-gray-500 text-center text-sm">
              Drag & Drop an image here<br />or Click to Upload
            </p>
          </>
        )}
      </div>

      {/* Predict Button */}
      {preview && (
        <button
          onClick={handlePredictClick}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full transition hover:scale-105"
        >
          <PawPrint size={20} />
          Predict Breed
        </button>
      )}
    </div>
  );
};

export default ImageUpload;
