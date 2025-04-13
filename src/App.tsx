import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';

import Dashboard from './components/pages/dashboard/Dashboard';
import Insurance from './components/pages/insurance/Insurance';
import Investments from './components/pages/investments/Investments';

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/insurance" element={<Insurance />} />
          <Route path="/investments" element={<Investments />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
