import PropTypes from 'prop-types';

import { Box, Stack, AppBar, Toolbar } from '@mui/material';
import { IconButton } from '@mui/material';

import { useResponsive } from '../../hooks/useResponsive';

import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

import { SIDE, HEADER } from './configlayout';
import NotificationsPopover from './universal/notificationPopover';
import AccountPopover from './universal/accountPopover';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { Link } from 'react-router-dom';

export default function Header({ onOpenNav }) {
    const lgUp = useResponsive('up', 'lg');

    const renderContent = (
        <>
            {!lgUp && (
                <IconButton onClick={onOpenNav} sx={{ mr: 1, color: '#6990f5' }}>
                    <MenuRoundedIcon sx={{ fontSize: '30px' }} />
                </IconButton>
            )}

            <Box sx={{ flexGrow: 1 }} />

            <Stack direction="row" alignItems="center" spacing={2} sx={{ backdropFilter: 'none' }}>
                {(lgUp && (
                    <>
                        <NotificationsPopover />
                        <IconButton component={Link} to="/dashboard" sx={{ mr: 1, color: '#6990f5' }}>
                            <HomeRoundedIcon sx={{ fontSize: '30px' }} />
                        </IconButton>
                        <AccountPopover />
                    </>
                )) || (
                    // Render HomeRoundedIcon next to MenuRoundedIcon for smaller screens
                    <>
                        <IconButton  component={Link} to="/dashboard" sx={{ mr: 1, color: '#6990f5' }}>
                            <HomeRoundedIcon sx={{ fontSize: '30px' }} />
                        </IconButton>
                        <NotificationsPopover />
                        <AccountPopover />
                    </>
                )}
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
                width: `calc(100% - ${SIDE.WIDTH + 1}px)`,
                height: HEADER.H_DESKTOP,
            }),
            }}
        >
            <Toolbar
                sx={{
                    height: 1,
                    px: {lg: 5},
                }}>
                {renderContent}
            </Toolbar>
        </AppBar>
    );
}

Header.propTypes = {
    onOpenNav: PropTypes.func,
};