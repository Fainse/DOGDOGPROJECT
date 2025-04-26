import React from 'react';

const Predictions = ({ predictions }) => {
  return predictions.length > 0 ? (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-center">Top Predictions</h2>
      {predictions.map((p, index) => (
        <div key={index}>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">{p.className}</span>
            <span className="text-sm font-medium text-gray-700">{(p.probability * 100).toFixed(2)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${(p.probability * 100).toFixed(2)}%` }}></div>
          </div>
        </div>
      ))}
    </div>
  ) : null;
};

export default Predictions;
