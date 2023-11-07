import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { BASE_PATH } from './app/constants';
import Header from './component/Header';
import NotFound from './component/NotFound';
import Home from './pages/Home';
import './App.css';
import './style/custom.css'

function App() {

  return (
    <main>
    <Header />
    <Router>
        <div className="App">
            <Routes>
                <Route path={`${BASE_PATH}`} element={< Home />} />
                <Route path="/" element={<Navigate to={`${BASE_PATH}`} />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    </Router>
</main>
  );
}

export default App;
