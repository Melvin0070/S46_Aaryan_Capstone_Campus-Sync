import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Results from './Pages/Results';
import Fees from './Pages/Fees';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results/>}></Route>
        <Route path="/fees" element={<Fees/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
