import React from 'react';
import { motion } from 'framer-motion';

const Predictions = ({ predictions }) => {
  if (!predictions.length) return null;

  return (
    <div className="flex flex-col items-center space-y-4 mt-6 w-full">
      <h2 className="text-2xl font-bold text-center text-softbrown">Top Predictions</h2>

      {predictions.map((pred, index) => (
        <motion.div
          key={pred.className}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2, duration: 0.5 }}
          className="bg-doggray p-4 rounded-xl w-full max-w-md shadow-md text-center space-y-2"
        >
          <p className="text-lg font-semibold">{pred.className}</p>
          <p className="text-sm text-gray-600">{(pred.probability * 100).toFixed(2)}%</p>

          {/* Green bar */}
          <div className="w-full bg-gray-300 rounded-full h-3 mt-2">
            <div
              className="bg-green-400 h-3 rounded-full"
              style={{ width: `${pred.probability * 100}%` }}
            ></div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Predictions;
