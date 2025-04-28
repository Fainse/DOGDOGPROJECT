import React, { useState, useEffect } from 'react';
import * as tmImage from '@teachablemachine/image';
import { motion } from 'framer-motion';
import ImageUpload from './components/ImageUpload';
import Predictions from './components/Predictions';
import BreedInfo from './components/BreedInfo';

const MODEL_URL = 'https://teachablemachine.withgoogle.com/models/XQMKeWaj-/';

const App = () => {
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [breedInfo, setBreedInfo] = useState(null);
  const [predictedName, setPredictedName] = useState('');

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

      const topPredictionName = sorted[0]?.className;
      setPredictedName(topPredictionName);
      setBreedInfo(null);
      fetchBreedInfo(topPredictionName);
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
    <div
      className="min-h-screen flex items-center justify-center p-6 bg-cover bg-center font-sans"
      style={{
        backgroundImage: "url('/OPSEG70.jpg')",
      }}
    >
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl space-y-8">
        <motion.h1
          className="text-4xl font-bold text-center text-softbrown"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
        >
          DogView
        </motion.h1>

        {/* Static description */}
        <p className="text-center text-gray-600 text-sm">
          Predict your dog's breed and discover detailed breed information!
        </p>

        <ImageUpload onPredict={handlePredict} />
        <Predictions predictions={predictions} />
        <BreedInfo breedInfo={breedInfo} predictedName={predictedName} />
      </div>
    </div>
  );
};

export default App;
