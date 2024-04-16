import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Stack, Typography, Box, CircularProgress } from '@mui/material';

export default function StationHeaderCard({ title, info, subtitle, progress, color = 'primary', sx, ...other }) {
  const getBarColor = (value) => {
    if (value >= 0 && value <= 25) return '#A1E6A6'; // Green
    if (value > 25 && value <= 50) return '#FFFF80'; // Faded Green
    if (value > 50 && value <= 75) return '#EEFF51'; // Almost Yellow
    if (value > 75 && value <= 100) return '#F5B748'; // Almost Orange
    if (value > 100 && value <= 150) return '#FF6551'; // Red
    return '#8CACFF'; // Default color
  };

  const barColor = getBarColor(progress);

  const renderProgress = (
    <Grid
      item
      xs={12}
      md={4}
      sx={{
        bgcolor: '#03182f',
        borderRadius: { xs: '45px 45px 0 0', md: '45px 0 0 45px' },
        p: 5,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
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
            color: barColor, // Use the calculated bar color here
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
            color: barColor,
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
              color: barColor,
              textAlign: 'center'
            }}
          >
            WQI
          </Typography>
        </Typography>
      </Box>
    </Grid>
  );

  const renderDetails = (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        bgcolor: '#001227',
        borderRadius: { xs: '0 0 45px 45px', md: '0 45px 45px 0' },
        p: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ maxWidth: '400px', width: '100%' }}>
        {/* Content of renderDetails */}
        <Stack spacing={2}>
          <Typography
            variant="h4"
            sx={{
              fontSize: 15,
              fontFamily: "Archivo, 'sans-serif'",
              fontWeight: '600',
              backgroundColor: '#03182f',
              color: barColor,
              textTransform: 'uppercase',
              width: '100%', // Adjusted width
              height: '2.5rem',
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
              fontSize: 55,
              fontFamily: "Poppins",
              fontWeight: '700',
              color: barColor, // Use the calculated bar color here for background
              textTransform: 'uppercase',
              marginTop: '1rem',
            }}
          >
            {info}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: 13,
              fontFamily: "Archivo, 'sans-serif'",
              fontWeight: '300',
              color: 'white',
            }}
          >
            {subtitle}
          </Typography>
        </Stack>
      </Box>
    </Grid>
  );

  return (
    <Grid
      container
      spacing={0}
      sx={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
        ...sx,
      }}
      {...other}
    >
      {renderProgress}
      {renderDetails}
    </Grid>
  );
}

StationHeaderCard.propTypes = {
  color: PropTypes.string,
  sx: PropTypes.object,
  title: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired, // Progress value for the CircularProgress
};
