import React, { useState, useEffect } from 'react';
import Station1Image from '../../img/station1.jpg';
import Station2Image from '../../img/station2.jpg';
import Station3Image from '../../img/station3.jpg';
import '../styles/CarouselStyle.css'; // Import the CSS file for styling

const stations = [
  {
    name: 'STATION HO1',
    description: 'Description for Station 1',
    status: 'Online',
    image: Station1Image,
  },
  {
    name: 'STATION HO2',
    description: 'Description for Station 2',
    status: 'Offline',
    image: Station2Image,
  },
  {
    name: 'STATION HO3',
    description: 'Description for Station 3',
    status: 'Online',
    image: Station3Image,
  },
];

const StationCarousel = () => {
  const [currentStation, setCurrentStation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const stationSlide = document.querySelector('.station-slide');
      const stationImage = document.querySelector('.station-image');
      const stationInfo = document.querySelector('.station-info');
  
      stationSlide.style.transform = 'translateX(-100%)';
      stationImage.style.transform = 'translateX(100%)';
  
      setTimeout(() => {
        setCurrentStation((prevStation) => (prevStation + 1) % stations.length);
  
        setTimeout(() => {
          stationSlide.style.transform = 'translateX(0)';
          stationImage.style.transform = 'translateX(0)';
          stationInfo.style.opacity = 0; // Add this line to make station-info transparent
  
          setTimeout(() => {
            stationInfo.style.opacity = 1; // Add this line to make station-info visible again
          }, 50); // Adjust the duration to match the CSS transition duration
        }, 500); // Adjust the duration to match the CSS transition duration
      }, 500); // Adjust the duration to match the CSS transition duration
    }, 5000);
  
    return () => clearInterval(interval);
  }, []);
  

  return (
    <div className="station-slide">
      <div className="image-container">
        <div className="gradient-overlay"></div>
        <img
          src={stations[currentStation].image}
          alt={`Station ${currentStation + 1}`}
          className="station-image"
        />
      </div>
      <div className="station-info">
        <h2>{stations[currentStation].name}</h2>
        <p>{stations[currentStation].description}</p>
        <p>Status: {stations[currentStation].status}</p>
      </div>
    </div>
  );
};

export default StationCarousel;