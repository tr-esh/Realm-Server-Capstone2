// App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import Router from './routes/section';
import ScrollToTopButton from './layouts/dashboard/universal/scrolltoTopButton';

function App() {
  const [isVisible, setIsVisible] = useState(false);

  // Show or hide the button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 2) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Scroll to top when button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="App">
      <Router />
      <ScrollToTopButton isVisible={isVisible} scrollToTop={scrollToTop} />
    </div>
  );
}

export default App;
