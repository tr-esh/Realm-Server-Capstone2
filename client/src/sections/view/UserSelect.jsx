import React, { useEffect } from 'react';
import { Container, Grid, Button, Typography } from '@mui/material';
import AppUserSelect from '../app-user-select';
import '../../components/styles/User.css';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

const AdminIL = new URL('../../img/Admin_illustration.png', import.meta.url);
const MoIL = new URL('../../img/MO_illustration.png', import.meta.url);
const UserIL = new URL('../../img/client_illustration.png', import.meta.url);

export default function UserSelect() {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    dispatch({ type: 'SET_ROLE', payload: role });
    localStorage.setItem('selectedRole', JSON.stringify(role));

    if (role !== 'Guest') {
      if (!localStorage.getItem('user')) {
        navigate('/login', { state: { role } });
        return;
      }
    }

    let destinationPath = '/dashboard';

    if (role === 'Monitoring-Officer') {
      destinationPath = '/mo-home';
    } else if (role === 'Guest') {
      destinationPath = '/guest';
    }

    navigate(destinationPath, { state: { role } });
  };

  useEffect(() => {
    const handlePopstate = () => {
      localStorage.removeItem('selectedRole');
    };

    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);

  return (
    <div className='user-main'>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <Typography variant='h6' mt={3}
              sx={{
                marginLeft: '2rem',
                fontFamily: '"Archivo", Sans-serif',
                fontWeight: '700'
              }}>
              SELECT <span style={{ color: '#8cacff' }}>USER</span> TYPE
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Button
              sx={{
                borderRadius: '40px',
                width: { xs: '100%', sm: 350, lg: 350 }
              }}
              onClick={() => handleRoleSelection('Guest')}
            >
              <AppUserSelect
                imageSource={UserIL}
                imageSize="100%"
                subheader='GUEST'
              />
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Button
              sx={{
                borderRadius: '40px',
                width: { xs: '100%', sm: 350, lg: 350 }
              }}
              onClick={() => handleRoleSelection('Admin')}
            >
              <AppUserSelect
                imageSource={AdminIL}
                imageSize="100%"
                subheader='ADMIN'
              />
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Button
              sx={{
                borderRadius: '40px',
                width: { xs: '100%', sm: 350, lg: 350 }
              }}
              onClick={() => handleRoleSelection('Monitoring-Officer')}
            >
              <AppUserSelect
                imageSource={MoIL}
                imageSize="100%"
                subheader='MONITORING OFFICER'
              />
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
