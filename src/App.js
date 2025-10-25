import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Admin from './pages/Admin';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navigation />

          {/* Main Content */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/portfolio/:collectionId" element={<Portfolio />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>

          {/* Footer - Hide on admin page */}
          <Routes>
            <Route path="/admin" element={null} />
            <Route path="*" element={<Footer />} />
          </Routes>

          {/* Toast Container */}
          <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            className="z-50"
            theme="colored"
            toastClassName="font-medium"
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;