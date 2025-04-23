import React, { useRef, useState } from 'react';

const ImageUpload = ({ setImageData, onPredict }) => {
  const fileInputRef = useRef();
  const imageRef = useRef();
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePredictClick = () => {
    if (imageRef.current) {
      onPredict(imageRef.current);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" ref={fileInputRef} onChange={handleChange} />
      {preview && (
        <>
          <img src={preview} alt="Preview" ref={imageRef} crossOrigin="anonymous" />
          <button onClick={handlePredictClick}>Predict Breed</button>
        </>
      )}
    </div>
  );
};

export default ImageUpload;
