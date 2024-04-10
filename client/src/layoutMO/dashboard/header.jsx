import PropTypes from 'prop-types';

import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';

import { useResponsive } from '../../hooks/useResponsive';

import { HEADER } from '../../layouts/dashboard/configlayout';
import NotificationsPopover from '../../layouts/dashboard/universal/notificationPopover'; 
import AccountPopover from '../../layouts/dashboard/universal/accountPopover';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { Link } from 'react-router-dom';
import MonitorTimeGreetings from '../../components/elements/MonitorTimeGreetings';

export default function Header({ onOpenNav }) {
    const lgUp = useResponsive('up', 'lg');

    const renderContent = (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                <Box sx={{ pr: 2 }}>
                    <AccountPopover />
                </Box>
                <MonitorTimeGreetings />
            </Box>
    
            <Stack direction="row" alignItems="center" spacing={2}>
                <IconButton component={Link} to="/mo-home" sx={{ mr: 1, color: '#6990f5' }}>
                    <HomeRoundedIcon sx={{ fontSize: '30px' }} />
                </IconButton>
                <NotificationsPopover />
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
