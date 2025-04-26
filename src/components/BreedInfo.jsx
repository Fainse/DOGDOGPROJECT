import React from 'react';
import akcBreedInfo from '../data/akcBreedInfo';

const BreedInfo = ({ breedInfo, predictedName }) => {
  if (!breedInfo && !predictedName) return null;

  const akcInfo = predictedName ? akcBreedInfo[predictedName] : null;
  const imageUrl = breedInfo?.reference_image_id
    ? `https://cdn2.thedogapi.com/images/${breedInfo.reference_image_id}.jpg`
    : null;

  return (
    <div className="mt-8 flex flex-col items-center text-center space-y-4">
      {predictedName && (
        <h2 className="text-3xl font-bold">{predictedName}</h2>
      )}

      {imageUrl && (
        <img
          src={imageUrl}
          alt={predictedName}
          className="w-48 h-48 object-cover rounded-lg shadow-md"
        />
      )}

      {akcInfo ? (
        <div className="text-gray-700 space-y-2 text-sm max-w-md mt-4">
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
          {akcInfo.grooming !== undefined && (
            <p><strong>Grooming Frequency:</strong> {akcInfo.grooming}</p>
          )}
          {akcInfo.energy && (
            <p><strong>Energy Level:</strong> {akcInfo.energy}</p>
          )}
          {akcInfo.demeanor && (
            <p><strong>Demeanor:</strong> {akcInfo.demeanor}</p>
          )}
        </div>
      ) : breedInfo ? (
        <div className="text-gray-700 space-y-2 text-sm max-w-md mt-4">
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
        </div>
      ) : (
        <div className="text-gray-700 italic mt-6">
          No description available for this breed.
        </div>
      )}
    </div>
  );
};

export default BreedInfo;
