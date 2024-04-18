import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Stack, Typography } from '@mui/material';

export default function TimeDateDisplay({sx, ...other}) {
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    const getCurrentDateTime = () => {
      const now = new Date();
      
      // Format time
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const amOrPm = hours >= 12 ? 'PM' : 'AM';
      const twelveHourFormat = hours % 12 || 12;
      const formattedTime = `${twelveHourFormat}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${amOrPm}`;

      // Format date
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const dayOfWeek = daysOfWeek[now.getDay()];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const month = months[now.getMonth()];
      const dayOfMonth = now.getDate();

      const formattedDate = `${dayOfWeek}, ${month} ${dayOfMonth}`;

      // Set the combined date and time
      setCurrentDateTime(`${formattedTime} • ${formattedDate}`);
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
            backgroundColor: 'transparent',
            boxShadow: 'none',
            position: 'relative',
            ...sx,
         }}
        {...other}
      >
        <Stack>
            <Typography
                    variant="subtitle2"
                    sx={{
                    fontFamily: "Poppins",
                    fontWeight: '400',
                    color: '#8cacff',
                    marginLeft: '20px',
                    textTransform: 'uppercase',
                    }}
                >
                    {currentDateTime}
            </Typography>
        </Stack>
    </Card>
  );
};

TimeDateDisplay.propTypes ={
    sx: PropTypes.object,
};
