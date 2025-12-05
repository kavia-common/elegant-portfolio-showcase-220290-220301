import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Contact from "./pages/Contact";

/**
 * Root application with theme handling and router shell.
 * Applies Tailwind-based modern UI using the Cosmic Energy theme.
 */
// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <BrowserRouter>
      <div className="min-h-dvh bg-cosmic-gradient">
        <Navbar theme={theme} onToggleTheme={toggleTheme} />
        <main className="container-page py-8 sm:py-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <footer className="container-page pb-10 pt-6 text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Portfolio. Built with React + Tailwind CSS.
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
