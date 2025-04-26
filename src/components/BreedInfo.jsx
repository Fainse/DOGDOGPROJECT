import React from 'react';
import { PawPrint, Dog, Bone } from 'lucide-react';
import akcBreedInfo from '../data/akcBreedInfo';
import { motion } from 'framer-motion';

const BreedInfo = ({ breedInfo, predictedName }) => {
  if (!breedInfo && !predictedName) return null;

  const akcInfo = predictedName ? akcBreedInfo[predictedName] : null;
  const imageUrl = breedInfo?.reference_image_id
    ? `https://cdn2.thedogapi.com/images/${breedInfo.reference_image_id}.jpg`
    : null;

  return (
    <motion.div
      key={predictedName}  // 🔥 Key added to force reanimation
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className="mt-8 flex flex-col items-center text-center space-y-4"
    >
      {predictedName && (
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-3xl font-bold"
        >
          {predictedName}
        </motion.h2>
      )}

      {imageUrl && (
        <motion.img
          src={imageUrl}
          alt={predictedName}
          className="w-48 h-48 object-cover rounded-lg shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        />
      )}

      {akcInfo || breedInfo ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="text-gray-700 space-y-2 text-sm max-w-md mt-4"
        >
          {akcInfo ? (
            <>
              <p>{akcInfo.description}</p>
              {akcInfo.temperament && (
                <p><strong>Temperament:</strong> {akcInfo.temperament}</p>
              )}
              {(akcInfo.minHeight && akcInfo.maxHeight) && (
                <p><strong>Height:</strong> {akcInfo.minHeight}–{akcInfo.maxHeight} cm</p>
              )}
              {(akcInfo.minWeight && akcInfo.maxWeight) && (
                <p><strong>Weight:</strong> {akcInfo.minWeight}–{akcInfo.maxWeight} kg</p>
              )}
              {akcInfo.grooming && (
                <p><strong>Grooming Frequency:</strong> {akcInfo.grooming}</p>
              )}
              {akcInfo.energy && (
                <p><strong>Energy Level:</strong> {akcInfo.energy}</p>
              )}
              {akcInfo.demeanor && (
                <p><strong>Demeanor:</strong> {akcInfo.demeanor}</p>
              )}
            </>
          ) : (
            <>
              {breedInfo.temperament && (
                <p><strong>Temperament:</strong> {breedInfo.temperament}</p>
              )}
              {breedInfo.life_span && (
                <p><strong>Life Span:</strong> {breedInfo.life_span}</p>
              )}
              {breedInfo.height?.metric && (
                <p><strong>Height:</strong> {breedInfo.height.metric} cm</p>
              )}
              {breedInfo.weight?.metric && (
                <p><strong>Weight:</strong> {breedInfo.weight.metric} kg</p>
              )}
            </>
          )}
        </motion.div>
      ) : (
        <div className="text-gray-700 italic mt-6">
          No description available for this breed.
        </div>
      )}
    </motion.div>
  );
};

export default BreedInfo;
