// src/components/LoadingSpin.js
import React from 'react';

const LoadingSpin = () => (
    <div className="flex justify-center items-center min-h-[calc(100vh-300px)]">
        <div className="spinner-border animate-spin h-10 w-10 border-t-4 border-blue-600 rounded-full"></div>
    </div>
);

export default LoadingSpin;
