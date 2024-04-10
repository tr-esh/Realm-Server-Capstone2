import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Stack, Typography, Box, CircularProgress } from '@mui/material';

export default function GuestHeaderCard({ title, subtitle, color = 'primary', sx, ...other }) {
  const [loading, setLoading] = useState(true);
  const [optimalStation, setOptimalStation] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/realm/lowWQI'); // Updated endpoint
        const data = await response.json();

        const { maxLowWQIStation, wqiValuesOfIdentifiedStation } = data;

        // Find the latest WQI value
        const latestWQI = wqiValuesOfIdentifiedStation[wqiValuesOfIdentifiedStation.length - 1];

        // Determine status based on value
        const getStatus = (value) => {
          if (value >= 0 && value <= 25) return 'Excellent';
          if (value > 25 && value <= 50) return 'Good';
          if (value > 50 && value <= 75) return 'Fair';
          if (value > 75 && value <= 100) return 'Poor';
          if (value > 100 && value <= 150) return 'Very Poor';
          return 'Unknown';
        };

        const optimalStationData = {
          stationId: maxLowWQIStation,
          wqi: latestWQI,
          status: getStatus(latestWQI),
          color: getBarColor(latestWQI)
        };

        setOptimalStation(optimalStationData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Function to get color based on value
  const getBarColor = (value) => {
    if (value >= 0 && value <= 25) return '#A1E6A6'; // Green
    if (value > 25 && value <= 50) return '#FFFF80'; // Faded Green
    if (value > 50 && value <= 75) return '#EEFF51'; // Almost Yellow
    if (value > 75 && value <= 100) return '#F5B748'; // Almost Orange
    if (value > 100 && value <= 150) return '#FF6551'; // Red
    return '#8CACFF'; // Default color
  };

  return (
    <Card
      component={Stack}
      spacing={0}
      direction="column"
      sx={{
        px: 4,
        py: 4,
        borderRadius: 10,
        backgroundColor: '#0d2135',
        boxShadow: 'none',
        ...sx,
      }}
      {...other}
    >
      {loading ? (
        <CircularProgress />
      ) : optimalStation ? (
        <>
          {/* Render Circular Progress */}
          <Card sx={{ bgcolor: '#03182f', borderTopLeftRadius: 15, borderTopRightRadius: 15, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, boxShadow: 'none'}}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: '4rem',
                paddingBottom: '4rem'
              }}
            >
              <CircularProgress
                variant="determinate"
                value={optimalStation.wqi}
                size={200}
                thickness={5} // Adjust the thickness as needed
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '80%',
                  position: 'relative',
                  color: optimalStation.color,
                  zIndex: 2,
                }}
              />

              <CircularProgress
                variant="determinate"
                value={100}
                size={200}
                thickness={5} // Adjust the thickness as needed
                sx={{
                  color: 'rgba(255, 255, 255, 0.1)', // Adjust the color of the track as needed
                  borderRadius: '50%',
                  position: 'absolute',
                  zIndex: 1,
                }}
              />

              {/* Display the value at the center */}
              <Typography
                variant="h4"
                sx={{
                  fontSize: 24,
                  fontFamily: "Archivo, 'sans-serif'",
                  fontWeight: '700',
                  color: optimalStation.color,
                  position: 'absolute',
                  zIndex: 3,
                }}
              >
              {optimalStation.wqi.toFixed(2)}% {/* Display WQI value with two decimals */}
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: 13,
                    fontFamily: "Archivo, 'sans-serif'",
                    fontWeight: '300',
                    color: optimalStation.color, textAlign: 'center'
                  }}
                >
                  WQI
                </Typography>
              </Typography>

            </Box>
          </Card>

          {/* Render Station Details */}
          <Card 
             sx={{ bgcolor: '#001227', 
             borderBottomLeftRadius: 15, 
             borderBottomRightRadius: 15,  borderTopLeftRadius: 0, borderTopRightRadius: 0,
             boxShadow: 'none'
             }}>
            <Stack
              sx={{
                padding: '20px',
                display: 'flex', 
             alignItems: 'center',
             justifyContent: 'center',
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: 13,
                  fontFamily: "Archivo, 'sans-serif'",
                  fontWeight: '700',
                  color: '#1a56bb',
                  textTransform: 'uppercase',
                  backgroundColor: '#051e68',
                  width: '14rem', 
                  height: '1.7rem',
                  display: 'flex',
                  borderRadius: '2rem',
                  textAlign: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '2rem',
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontSize: 25,
                  fontFamily: "Poppins",
                  fontWeight: '700',
                  color: optimalStation.color,
                  textTransform: 'uppercase',
                  marginTop: '1rem',
                }}
              >
                {optimalStation.stationId} {/* Display optimal station name */}
              </Typography>
              

              {/* Display optimal station information */}
              <Typography
                variant="body2"
                sx={{
                  fontSize: 13,
                  fontFamily: "Poppins",
                  fontWeight: '300',
                  color: 'white',
                  textAlign: 'center',
                  paddingTop: '2rem',
                  paddingBottom: '2.5rem',
                }}
              >
                Based on the gathered station data, the optimal water source is the <strong> {optimalStation.stationId} </strong> with a value of <strong>{optimalStation.wqi.toFixed(2)} </strong>interpreted as <strong>{optimalStation.status}.</strong>
              </Typography>

            </Stack>
          </Card>
        </>
      ) : (
        <Typography variant="body1">No data available</Typography>
      )}
    </Card>
  );
}

GuestHeaderCard.propTypes = {
  color: PropTypes.string,
  sx: PropTypes.object,
  title: PropTypes.string.isRequired,
};
