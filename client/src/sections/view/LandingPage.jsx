import React from 'react';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../../components/styles/Landing.css';

const Illustration = new URL('../../img/realm-mainlogo.png', import.meta.url);

function LandingPage() {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const handleAccessAccount = () => {
    navigate('/user-select');
  };

  return (
    <div className='main'>
      <div className='admin-land'>
        <div className='ban-title'>
          <h3>
            TOWARDS <span> BLUE </span> MONITORING
          </h3>
          <p className='banner'>
            Real-time Aqualert Monitoring helps you monitor water status. We provide data results, analytics and other
            information you need, pertaining to the quality of your water source.
          </p>
          <button className='btn' onClick={handleAccessAccount}> ACCESS ACCOUNT </button>
        </div>
        {isSmallScreen ? null : (
          <div className='illutrator-contain'>
            <img className='pic' src={Illustration} alt='icon' />
          </div>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
