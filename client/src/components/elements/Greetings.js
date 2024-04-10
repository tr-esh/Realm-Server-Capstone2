import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import '../styles/GreetingStyle.css';
import { useAuthContext } from '../../hooks/useAuthContext';

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

const Greeting = () => {
  const { user } = useAuthContext(); // Destructure user from the context

  return (
    <div>
      <Typography variant="h4">
        <span className='subject-greet'>Good</span> <TimeGreetings />{' '}
      </Typography>
      <Typography variant="h4">
        {user && <span className='user-greet'>{user.username}</span>}
      </Typography>
      <Typography variant="h7">
        <span className='sub-greet'>Uncover water insights in your local</span>
      </Typography>
    </div>
  );
};

export default Greeting;
