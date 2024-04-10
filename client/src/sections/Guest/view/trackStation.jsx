import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Grid, Box, Typography, IconButton } from "@mui/material";
import StationHeaderCard from '../../station/stationHeaderCard';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { Link } from 'react-router-dom';

export default function TrackStation() {
  const location = useLocation();
  const { state: { title } } = location;

  const stationDetails = {
    title: title || 'Default Title',  // Use the title from the URL or a default title
    info: 'GOOD',
    subtitle: 'increased by 12% last month, station 1 will remain healthy for the next 3 months in terms of the initial physical parameter status',
  };

      const progressData = [
        { name: 'progress', value: 42.4 }, // Replace with the actual progress value
      ];

    
      return (
        <Container maxWidth="lg">
          <Grid container spacing={4} mt={4}>

          <Grid item xs={12} sm={12} md={12} mb={-3} ml={1}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '-8px' }}>
              <IconButton
                  component={Link}
                  to="/guest"
                  sx={{
                    borderRadius: 3,
                  }}
                >
                  <ArrowBackRoundedIcon sx={{ fontSize: 25, color: '#8CACFF' }} />
                <Typography sx={{
                  marginLeft: '8px',
                  fontFamily: "Poppins",
                  fontWeight: '00',
                  fontSize: 18,
                  color: '#8CACFF',
                }}>
                  Back
                </Typography>
             </IconButton>
            </Box>
          </Grid>
    
          <Grid item xs={12} sm={12} md={12}>
                    <StationHeaderCard
                        title={stationDetails.title}
                        info={stationDetails.info}
                        subtitle={stationDetails.subtitle}
                        progress={42.4}
                        sx={{
                            backgroundColor: '#0A1929'
                        }}
                    />
                </Grid>
    
          </Grid>
        </Container>
      );
    }
