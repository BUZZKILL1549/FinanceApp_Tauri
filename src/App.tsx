import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';

import Login from './components/pages/login/Login';
import Dashboard from './components/pages/dashboard/Dashboard';
import Insurance from './components/pages/insurance/Insurance';
import Investments from './components/pages/investments/Investments';
import Settings from './components/pages/settings/Settings';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem('isAuthenticated') === 'true'
  );

  const handleLogin = () => {
    sessionStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
    console.log('user auth: ', isAuthenticated);
  };

  const handleLogout = () => {
    sessionStorage.setItem('isAuthenticated', 'false');
    setIsAuthenticated(false);
    console.log('user auth: ', isAuthenticated);
  }

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        window.location.reload();
      }
    };
    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);

  return (
    <Router>
      <AppContent isAuthenticated={isAuthenticated} handleLogin={handleLogin} handleLogout={handleLogout} />
    </Router>
  );
}

function AppContent({ isAuthenticated, handleLogin, handleLogout }: { isAuthenticated: boolean; handleLogin: () => void; handleLogout: () => void; }) {
  const location = useLocation();
  const showNavbar = location.pathname !== "/login";

  return (
    <>
      {showNavbar && <Navbar onLogout={handleLogout}/>}
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/" element={isAuthenticated ? (<Dashboard />) : (<Navigate to="/login" replace />)} />
          <Route path="/insurance" element={isAuthenticated ? (<Insurance />) : (<Navigate to="/login" replace />)} />
          <Route path="/investments" element={isAuthenticated ? (<Investments />) : (<Navigate to="/login" replace />)} />
          <Route path="/settings" element={isAuthenticated ? (<Settings />) : (<Navigate to="/login" replace />)} />
        </Routes>
      </div>
    </>
  );
}

export default App;
