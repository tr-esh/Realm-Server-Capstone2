import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import DownloadingRoundedIcon from '@mui/icons-material/DownloadingRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

export default function StationReport({ title, description, sx, ...other}) {
    const [isDownloading, setIsDownloading] = useState(true);

    // Function to handle download
    const handleDownload = () => {
      // Add your logic for downloading here
      // This function will be called when the user clicks the download button
      console.log('Downloading station report...');
      // Add your logic for downloading here

      // Simulate a delay before changing the icon to Downloaded
      setTimeout(() => {
        setIsDownloading(false);
      }, 5000); // Change to the desired duration in milliseconds
    };


    return(
        <Card
            spacing={3}
            sx={{
            px: 4,
            py: 4,
            borderRadius: 10,
            ...sx,
            }}
            {...other}
        >
            <Stack direction="column" alignItems="center">

                <Typography variant="h1"
                    sx={{ color: 'white',
                        fontSize:  30,
                        fontFamily: "Archivo, 'sans-serif'", 
                        fontWeight: '600',
                        textTransform: 'uppercase',
                    }}
                 >
                    {title}
                </Typography>

                <Divider  sx={{ my: 1, backgroundColor: '#10273d', width: '100%' }} />

                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                  sx={{ margin: '3rem' }}
                >
                  {isDownloading ? (
                    <DownloadingRoundedIcon
                      onClick={handleDownload}
                      sx={{
                        fontSize: 50,
                        color: '#10273d',
                        my: 1,
                        transition: 'background-color 0.3s ease-in-out',
                        '&:hover': {
                          color: '#0A1929',
                          cursor: 'pointer',
                        },
                      }}
                    />
                  ) : (
                    <CheckCircleRoundedIcon
                      sx={{
                        fontSize: 50,
                        color: 'green',
                        my: 1,
                      }}
                    />
                  )}
                  <Typography
                    variant="subtitle1"
                    sx={{
                      textAlign: 'center',
                      color: '#0d2135',
                      fontSize: 11,
                      fontFamily: "Archivo, 'sans-serif'",
                      fontWeight: '500',
                    }}
                  >
                    {isDownloading ? 'Download' : 'Downloaded!'}
                  </Typography>
                </Box>

                <Typography variant="subtitle1"
                    sx={{
                        textAlign: 'center',
                        color: '#0d2135',
                        fontSize: 11,
                        fontFamily: "Archivo, 'sans-serif'",
                        fontWeight: '500',
                      }}
                 >
                    {description}
                </Typography>

            </Stack>

        </Card>
    )
}

StationReport.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    sx: PropTypes.object,
}