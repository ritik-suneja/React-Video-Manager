import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import BucketsList from './components/BucketsList';
import Bucket from './components/Bucket';
import History from './components/History';

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '24px' }}>
      <Routes>
  <Route path="/" element={<BucketsList />} index />
  <Route path="/bucket/:bucketId" element={<Bucket />} />
  <Route path="/history" element={<History />} />
</Routes>

      </div>
    </Router>
  );
}

export default App;
