import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import '../styles/TimeGreetingStyle.css';

const TimeGreetings = () => {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const date = new Date();
    const hours = date.getHours();
    let greetingMessage;

    if (hours < 12) {
      greetingMessage = 'Morning,';
    } else if (hours >= 12 && hours < 17) {
      greetingMessage = 'Afternoon,';
    } else {
      greetingMessage = 'Evening,';
    }

    setGreeting(greetingMessage);
  }, []);

  return <span className='greeting-mood'>{greeting}</span>;
};

const TimeGreeting = () => {

  return (
    <div>
      <Typography variant="h7">
        <span className='subject-greet'>Good</span> <TimeGreetings />{' '}
      </Typography>
      <Typography variant="h7">
        <span className='user-greet'>Guest</span>
      </Typography>
    </div>
  );
};

export default TimeGreeting;
