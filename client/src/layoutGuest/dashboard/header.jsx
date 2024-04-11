import PropTypes from 'prop-types';
import { Box, Stack, AppBar, Toolbar, Avatar, Divider, IconButton } from '@mui/material';
import { useResponsive } from '../../hooks/useResponsive';
import { HEADER } from '../../layouts/dashboard/configlayout'; 
import UserNotifPopover from '../../layouts/dashboard/universal/usernotifPopover';
import TimeDateDisplay from './timeDateDisplay';
import TimeGreeting from '../../components/elements/TimeGreetings';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AccountPopover from '../../layouts/dashboard/universal/guestAccount';


export default function Header({ onOpenNav }) {

    const lgUp = useResponsive('up', 'lg');
    

    const renderContent = (
        <>
            <Stack direction="row" alignItems="center" spacing={1}>
            <Box sx={{ pr: 2 }}>
                    <AccountPopover />
                </Box>
                <TimeGreeting />
            </Stack>

            <Box sx={{ flexGrow: 1 }} />

            <Stack direction="row" alignItems="center" spacing={0} sx={{ backdropFilter: 'none' }}>
                
                <TimeDateDisplay />
                <UserNotifPopover />
                
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
                    height: 1.5,
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
