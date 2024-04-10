
import React, { useState, useEffect } from 'react';
import '../../../components/styles/ScrollToTopButton.css'
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';

const ScrollToTopButton = () => {
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
      <button
        className={`scroll-to-top-btn ${isVisible ? 'visible' : ''}`}
        onClick={scrollToTop}
        title="Go to top"
      >
        <ArrowUpwardRoundedIcon />
      </button>
    );
  };
  
  export default ScrollToTopButton;