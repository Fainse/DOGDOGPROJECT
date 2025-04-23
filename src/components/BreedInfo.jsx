import React from 'react';

const BreedInfo = ({ breedInfo }) => {
  return breedInfo ? (
    <div className="breed-info">
      <h2>{breedInfo.name}</h2>
      <p><strong>Temperament:</strong> {breedInfo.temperament}</p>
      <p><strong>Life Span:</strong> {breedInfo.life_span}</p>
      <p><strong>Weight:</strong> {breedInfo.weight?.metric} kg</p>
    </div>
  ) : null;
};

export default BreedInfo;
