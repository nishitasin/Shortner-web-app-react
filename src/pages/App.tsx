// Main App component with routing
// src/App.tsx
import NavBar from "../components/NavBar";




<Router>
  <NavBar />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/stats" element={<Stats />} />
  </Routes>
</Router>






import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Stats from "./App";
import { authenticate } from "../api/index";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const login = async () => {
      try {
        await authenticate();
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Auth failed. App cannot proceed.");
      }
    };

    login();
  }, []);

  if (!isAuthenticated) {
    return <p>Loading app... Please wait.</p>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </Router>
  );
};

export default App;
