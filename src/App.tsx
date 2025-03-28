
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { Toaster } from './components/ui/toaster';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
