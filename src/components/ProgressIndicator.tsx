import React from 'react';

interface ProgressIndicatorProps {
  currentStep: 1 | 2;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
          currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
        }`}>
          1
        </div>
        <div className={`w-16 h-1 mx-2 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
          currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
        }`}>
          2
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;