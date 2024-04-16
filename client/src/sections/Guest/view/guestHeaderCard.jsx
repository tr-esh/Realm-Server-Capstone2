import React from 'react';
import PropTypes from 'prop-types';
import { Card, Stack, Typography, Box, CircularProgress } from '@mui/material';

export default function GuestHeaderCard({ title, info, subtitle, progress, color = 'primary', sx, ...other }) {
  

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
      {/* Conditional rendering based on progress */}
      {progress !== null ? (
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
                paddingTop: { xs: '2rem', sm: '4rem' }, // Adjusted padding based on screen size
                paddingBottom: { xs: '2rem', sm: '4rem' }, // Adjusted padding based on screen size
              }}
            >
              <CircularProgress
                variant="determinate"
                value={progress}
                size={200}
                thickness={5} // Adjust the thickness as needed
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '80%',
                  position: 'relative',
                  color: color, // Changed from optimalStation.color to color
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
                  fontFamily: "Poppins",
                  fontWeight: '700',
                  color: color, // Changed from optimalStation.color to color
                  position: 'absolute',
                  zIndex: 3,
                }}
              >
                {progress}%
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: 13,
                    fontFamily: "Poppins",
                    fontWeight: '300',
                    color: color, // Changed from optimalStation.color to color
                    textAlign: 'center'
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
             borderBottomRightRadius: 15,  
             borderTopLeftRadius: 0, 
             borderTopRightRadius: 0,
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
                  fontFamily: "Poppins",
                  fontWeight: '700',
                  color: color, // Changed from optimalStation.color to color
                  textTransform: 'uppercase',
                  backgroundColor: '#03182f',
                  width: '14rem', 
                  height: '1.7rem',
                  display: 'flex',
                  borderRadius: '2rem',
                  textAlign: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: { xs: '1rem', sm: '2rem' },
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
                  color: color, // Changed from optimalStation.color to color
                  textTransform: 'uppercase',
                  marginTop: '1rem',
                }}
              >
                {info}
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
                  paddingTop: { xs: '0.5rem', sm: '2.5rem' },
                  paddingBottom: { xs: '0.5rem', sm: '2.5rem' },
                }}
              >
                {subtitle}
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
  info: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  progress: PropTypes.number, // Progress value for the CircularProgress can be null
};
