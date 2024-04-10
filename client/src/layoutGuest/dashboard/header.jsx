import PropTypes from 'prop-types';
import { Box, Stack, AppBar, Toolbar, Avatar, Divider, IconButton } from '@mui/material';
import { useResponsive } from '../../hooks/useResponsive';
import { HEADER } from '../../layouts/dashboard/configlayout'; 
import UserNotifPopover from '../../layouts/dashboard/universal/usernotifPopover';
import TimeDateDisplay from './timeDateDisplay';
import TimeGreeting from '../../components/elements/TimeGreetings';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { useNavigate } from 'react-router-dom';


export default function Header({ onOpenNav }) {
    const navigate = useNavigate();
    const lgUp = useResponsive('up', 'lg');
    const imageUrl = new URL('../../img/guest_default.jpg', import.meta.url)

    const renderContent = (
        <>
            <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar src={imageUrl} alt="Avatar" />
                <TimeGreeting />
            </Stack>

            <Box sx={{ flexGrow: 1 }} />

            <Stack direction="row" alignItems="center" spacing={2} sx={{ backdropFilter: 'none' }}>
                
                <TimeDateDisplay />
                <Divider orientation="vertical" flexItem style={{backgroundColor:'#8cacff', marginTop: "1rem" ,height: '20px'}}/>
                <UserNotifPopover />
                <IconButton onClick={() => navigate('/user-select')}>
                <HomeRoundedIcon style={{color: '#6990f5', fontSize: 30}}/>
                </IconButton>
            </Stack>
        </>
    );

    return (
        <AppBar
            sx={{
                backgroundColor: '#0d2135', //rgba value rgba(13, 33, 53, 1)
                boxShadow: 'none',
                height: HEADER.H_MOBILE,
                zIndex: 1101,
                transition: 'height 200ms ease-in-out',
                ...(lgUp && {
                    width: '100%', 
                    height: HEADER.H_DESKTOP,
                }),
            }}
        >
            <Toolbar
                sx={{
                    height: 1,
                    px: { lg: 5 },
                }}
            >
                {renderContent}
            </Toolbar>
        </AppBar>
    );
}

Header.propTypes = {
    onOpenNav: PropTypes.func,
};
