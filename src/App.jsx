import React, { useState, useEffect } from 'react';
import * as tmImage from '@teachablemachine/image';
import ImageUpload from './components/ImageUpload';
import Predictions from './components/Predictions';
import BreedInfo from './components/BreedInfo';
import './App.css';

const MODEL_URL = 'https://teachablemachine.withgoogle.com/models/XQMKeWaj-/';

const App = () => {
  const [model, setModel] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [breedInfo, setBreedInfo] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await tmImage.load(MODEL_URL + 'model.json', MODEL_URL + 'metadata.json');
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  const handlePredict = async (imageElement) => {
    if (model && imageElement) {
      const prediction = await model.predict(imageElement);
      const sorted = prediction.sort((a, b) => b.probability - a.probability).slice(0, 3);
      setPredictions(sorted);
      fetchBreedInfo(sorted[0].className);
    }
  };

  const fetchBreedInfo = async (breedName) => {
    try {
      const res = await fetch(`https://api.thedogapi.com/v1/breeds/search?q=${breedName}`, {
        headers: {
          'x-api-key': import.meta.env.VITE_DOG_API_KEY,
        },
      });
      const data = await res.json();
      if (data.length > 0) setBreedInfo(data[0]);
    } catch (err) {
      console.error('Error fetching breed info:', err);
    }
  };

  return (
    <div className="app">
      <h1>Dog Breed Predictor</h1>
      <ImageUpload setImageData={setImageData} onPredict={handlePredict} />
      <Predictions predictions={predictions} />
      <BreedInfo breedInfo={breedInfo} />
    </div>
  );
};

export default App;
