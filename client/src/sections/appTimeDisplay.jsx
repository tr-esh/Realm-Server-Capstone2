import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Stack, Typography, IconButton } from '@mui/material';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import BedtimeRoundedIcon from '@mui/icons-material/BedtimeRounded';

export default function AppTimeDisplay({sx, ...other}) {
    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [currentIcon, setCurrentIcon] = useState(<LightModeRoundedIcon style={{ fontSize: '35px' }} />);
    const [backgroundColor, setBackgroundColor] = useState('#10273d'); // Initial background color


    useEffect(() => {
        const getCurrentDateTime = () => {
          const now = new Date();
    
          // Format time
          const hours = now.getHours();
    
          // Determine the icon and background color based on the time
          if (hours >= 5 && hours < 18) {
            setCurrentIcon(<LightModeRoundedIcon style={{ fontSize: '35px' }} />);
            setBackgroundColor('#8CACFF');
          } else {
            setCurrentIcon(<BedtimeRoundedIcon style={{ fontSize: '35px' }} />);
            setBackgroundColor('#8CACFF');
          }
    
          const amOrPm = hours >= 12 ? 'PM' : 'AM';
          const twelveHourFormat = hours % 12 || 12;
          const formattedTime = `${twelveHourFormat}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')} ${amOrPm}`;
    
          setCurrentTime(formattedTime);
    
          // Format date
          const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          const dayOfWeek = daysOfWeek[now.getDay()];
          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          const month = months[now.getMonth()];
          const dayOfMonth = now.getDate();
    
          const formattedDate = `${dayOfWeek}, ${month} ${dayOfMonth}`;
    
          setCurrentDate(formattedDate);
        };
    
        // Update the date and time every second
        const intervalId = setInterval(getCurrentDateTime, 1000);
    
        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
      }, []);


    return (
        <Card
            component={Stack}
            spacing={3}
            direction="row"
            sx={{
                borderRadius: 10,
                m: 1,
                backgroundColor,
                boxShadow: 'none',
                position: 'relative',
                ...sx,
            }}
            {...other}
            >
            <Stack>
                <Stack marginTop={16} marginBottom={8}>
                <Typography
                    variant="h6"
                    sx={{
                    fontFamily: "Poppins",
                    fontWeight: '600',
                    color: '#8CACFF',
                    marginLeft: '30px',
                    lineHeight: 0.2,
                    }}
                >
                    TODAY
                </Typography>
                <Typography
                    variant="h2"
                    sx={{
                    fontFamily: "'Archivo', sans-serif",
                    fontWeight: '600',
                    color: 'white',
                    marginLeft: '25px',
                    }}
                >
                    {currentTime}
                </Typography>
                <Typography
                    variant="subtitle"
                    sx={{
                    fontFamily: "Poppins",
                    fontWeight: '200',
                    color: '#8CACFF',
                    marginLeft: '30px',
                    lineHeight: 0.2,
                    }}
                >
                    {currentDate}
                </Typography>
                </Stack>
            </Stack>

            {/* Display the dynamically updated icon and background color */}
            <IconButton sx={{
                            color: 'white',
                            position: 'absolute',
                            top: 20,
                            right: 20,
                            backgroundColor,
                            cursor: 'auto',
                            '&:hover, &:active': {
                            backgroundColor, 
                            },
                        }}
                        disableTouchRipple // Disable ripple effect on touch
                        disableFocusRipple // Disable ripple effect on focus
                >
                {currentIcon}
            </IconButton>
        </Card>
    )
}

AppTimeDisplay.propTypes ={
    sx: PropTypes.object,
};