import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import  LandingPage  from './components/LandingPage';
import PredictionPage  from './components/PredictionPage';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
      
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/predict" element={<PredictionPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;