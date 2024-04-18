import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Box, CircularProgress, Dialog, DialogContent } from '@mui/material';
import '../../../components/styles/WQIStyle.css';

export default function StationViewHeader({ title, info, subtitle, progress, color = 'primary', sx, ...other }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const getBarColor = (value) => {
    if (value >= 0 && value <= 25) return '#A1E6A6'; // Green
    if (value > 25 && value <= 50) return '#FFFF80'; // Faded Green
    if (value > 50 && value <= 75) return '#EEFF51'; // Almost Yellow
    if (value > 75 && value <= 100) return '#F5B748'; // Almost Orange
    if (value > 100 && value <= 150) return '#FF6551'; // Red
    return '#8CACFF'; // Default color
  };

  const barColor = getBarColor(progress);

  const handleCircularProgressBarClick = () => {
    setDialogOpen(true);
  };

  const renderProgress = (
    <Grid
      item
      xs={12}
      md={4}
      sx={{
        bgcolor: '#03182f',
        borderRadius: { xs: '45px 45px 0 0', md: '45px 0 0 45px' },
        p: 5,
        ...sx,
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
          cursor: 'pointer',
        }}
        onClick={handleCircularProgressBarClick}
      >
        <CircularProgress
          variant="determinate"
          value={progress}
          size={200}
          thickness={5}
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: '80%',
            position: 'relative',
            color: barColor,
            zIndex: 2,
          }}
        />
        <CircularProgress
          variant="determinate"
          value={100}
          size={200}
          thickness={5}
          sx={{
            color: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            position: 'absolute',
            zIndex: 1,
          }}
        />
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
              color: 'white',
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
        ...sx,
      }}
    >
      <Box sx={{ maxWidth: '400px', width: '100%' }}>
        <Typography
          variant="h4"
          sx={{
            fontSize: 15,
            fontFamily: "Archivo, 'sans-serif'",
            fontWeight: '600',
            color: barColor,
            textTransform: 'uppercase',
            backgroundColor: '#03182f',
            width: '100%',
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
            color: barColor,
            textTransform: 'uppercase',
            marginTop: '1rem',
          }}
        >
          {info}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: 13,
            fontFamily: "Archivo, 'sans-serif'",
            fontWeight: '300',
            color: 'white',
          }}
        >
          {subtitle}
        </Typography>
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
      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth
      PaperProps={{
        sx: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          borderRadius: '1rem',
          color: 'white',
          padding: '2rem',
        },
      }}>
        <DialogContent
          sx={{
            backgroundColor: '#0d2135',
            borderRadius: '1rem',
            color: 'white',
            padding: '2rem',
          }}
        >
          <div className='Qi-container'>
            
            
            <Typography variant="h4" sx={{ fontFamily: "Poppins", fontWeight: '700', textAlign: 'center', color: '#8CACFF'}}>
              Classification of Water Quality Index:
            </Typography>
            
            <div className='class-holder'>
              <div className="interpretation-holder">
                <div className='point-holder'>
                  <Typography variant="h6" sx={{ fontFamily: "Poppins", fontWeight: '700', color: '#A1E6A6' }}>
                    0-25
                  </Typography>
                </div>
                <div className='interpretation'>
                  <Typography variant="h6" sx={{ fontFamily: "Poppins", fontWeight: '700' , color: '#A1E6A6'}}>Excellent
                    <Typography variant="body1" sx={{ fontFamily: "Poppins", fontWeight: '400' }}>Clean water, excellently suitable for drinking</Typography>
                  </Typography>
                </div>
              </div>

              <div className="interpretation-holder">
                <div className='point-holder'>
                  <Typography variant="h6" sx={{ fontFamily: "Poppins", fontWeight: '700', color: '#FFFF80' }}>
                    26-50
                  </Typography>
                </div>
                <div className='interpretation'>
                  <Typography variant="h6" sx={{ fontFamily: "Poppins", fontWeight: '700', color: '#FFFF80' }}>Good
                    <Typography variant="body1" sx={{ fontFamily: "Poppins", fontWeight: '400' }}>Suitable for drinking</Typography>
                  </Typography>
                </div>
              </div>

              <div className="interpretation-holder">
                <div className='point-holder'>
                  <Typography variant="h6" sx={{ fontFamily: "Poppins", fontWeight: '700', color: '#EEFF51' }}>
                    51-75
                  </Typography>
                </div>
                <div className='interpretation'>
                  <Typography variant="h6" sx={{ fontFamily: "Poppins", fontWeight: '700', color: '#EEFF51'}}>Fair
                    <Typography variant="body1" sx={{ fontFamily: "Poppins", fontWeight: '400' }}>Modestly suitable for drinking</Typography>
                  </Typography>              
                </div>
              </div>

              <div className="interpretation-holder">
                <div className='point-holder'>
                  <Typography variant="h6" sx={{ fontFamily: "Poppins", fontWeight: '700', color: '#F5B748' }}>
                    76-100
                  </Typography>
                </div>
                <div className='interpretation'>
                  <Typography variant="h6" sx={{ fontFamily: "Poppins", fontWeight: '700' , color: '#F5B748'}}>Poor
                    <Typography variant="body1" sx={{ fontFamily: "Poppins", fontWeight: '400' }}>Unsuitable for drinking, minor treatment (purification) required before usage</Typography>
                  </Typography>                
                </div>
              </div>

              <div className="interpretation-holder">
                <div className='point-holder'>
                  <Typography variant="h6" sx={{ fontFamily: "Poppins", fontWeight: '700', color: '#FF6551' }}>
                    &gt; 100
                  </Typography>
                </div>
                <div className='interpretation'>
                  <Typography variant="h6" sx={{ fontFamily: "Poppins", fontWeight: '700', color: '#FF6551' }}>Very Poor
                    <Typography variant="body1" sx={{ fontFamily: "Poppins", fontWeight: '400' }}>Unsuitable for drinking, Appropriate treatment required before usage or seek alternative sources of supply</Typography>
                  </Typography>               
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Grid>
  );
}

StationViewHeader.propTypes = {
  color: PropTypes.string,
  sx: PropTypes.object,
  title: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
};
