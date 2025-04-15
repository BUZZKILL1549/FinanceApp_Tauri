import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';

import Login from './components/pages/login/Login';
import Dashboard from './components/pages/dashboard/Dashboard';
import Insurance from './components/pages/insurance/Insurance';
import Investments from './components/pages/investments/Investments';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    console.log('user auth: ', isAuthenticated);
  };

  return (
    <Router>
      <AppContent isAuthenticated={isAuthenticated} handleLogin={handleLogin} />
    </Router>
  );
}

function AppContent({ isAuthenticated, handleLogin }: { isAuthenticated: boolean; handleLogin: () => void }) {
  const location = useLocation();
  const showNavbar = location.pathname !== "/login";

  return (
    <>
      {showNavbar && <Navbar />}
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/" element={isAuthenticated ? (<Dashboard />) : (<Navigate to="/login" replace />)} />
          <Route path="/insurance" element={isAuthenticated ? (<Insurance />) : (<Navigate to="/login" replace />)} />
          <Route path="/investments" element={isAuthenticated ? (<Investments />) : (<Navigate to="/login" replace />)} />
        </Routes>
      </div>
    </>
  );
}

export default App;
