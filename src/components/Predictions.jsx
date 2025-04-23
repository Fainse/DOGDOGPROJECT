import React from 'react';

const Predictions = ({ predictions }) => {
  return predictions.length > 0 ? (
    <div className="results">
      <h2>Top Predictions</h2>
      {predictions.map((p, index) => (
        <div key={index} className="confidence-bar">
          <strong>{p.className}</strong>
          <div className="bar-bg">
            <div className="bar-fill" style={{ width: `${(p.probability * 100).toFixed(2)}%` }} />
          </div>
          <small>{(p.probability * 100).toFixed(2)}%</small>
        </div>
      ))}
    </div>
  ) : null;
};

export default Predictions;
