import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Box, Drawer, ListItemButton } from '@mui/material';
import {Stack} from '@mui/material';

import { usePathname } from '../../routes/hooks/usePathname';
import { RouterLink } from '../../routes/components/routerLink';

import { useResponsive }  from '../../hooks/useResponsive';

import Logo from '../../components/logo/logo'
import Scrollbar from '../../components/scrollbar/scrollbar';

import { SIDE } from '../../layouts/dashboard/configlayout'; 
import sideConfig from './navigationSide'; 

export default function Sidebar({ openNav, onCloseNav }){
    const pathname = usePathname();

    const upLg = useResponsive('up', 'lg');

    useEffect(() => {
        if (openNav) {
            onCloseNav();
        }
    }, [pathname]);


//#0A1929
    const renderMenu = (
        <Stack component="nav" spacing={1} sx={{ mt: 7, px: 2 }}>
            {sideConfig.map((item) => (
                <NavItem key={item.title} item={item}/>
            ))}
        </Stack>
    );

    const renderContent = (
        <Scrollbar
            sx={{
                backgroundColor: '#0A1929',
                height:1,
                '& .simple-content': {
                    height: 1,
                    display: 'flex',
                    flexDirection: 'column'
                },
            }}
         >
            <Logo sx={{ mt: 8, ml: 9 }} />
            
            {renderMenu}

            <Box sx={{ flexGrow: 1 }} />

        </Scrollbar>
    );

    return (
        <Box
          sx={{
            flexShrink: {lg: 0},
            width: {lg: SIDE.WIDTH},
          }}>
            {upLg ? (
                <Box
                sx={{
                    height: 1,
                    position: 'fixed',
                    width: SIDE.WIDTH,
                    borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
                }}
                >
                {renderContent}
                </Box>
            ) : (
                <Drawer
                open={openNav}
                onClose={onCloseNav}
                PaperProps={{
                    sx: {
                    width: SIDE.WIDTH,
                    },
                }}
                >
                {renderContent}
                </Drawer>
            )}
        </Box>
    );


}

Sidebar.propTypes = {
    openNav: PropTypes.bool,
    onCloseNav: PropTypes.func,
};

function NavItem({ item }) {
    const pathname = usePathname();

    const active = item.path === pathname;

    return(
        <ListItemButton
            component={RouterLink}
            href={item.path}
            sx={{
            minHeight: 50,
            borderRadius: 6,
            typography: 'body2',
            color: 'white',
            textTransform: 'capitalize',
            fontFamily: "Archivo, 'sans-serif'",
            fontWeight: '500',
            ...(active && {
                color: '#0A1929',
                fontWeight: '700',
                bgcolor: '#8CACFF',
                '&:hover': {
                bgcolor: '#8CACFF',
                },
            }),
            }}
        >
            <Box component="span" sx={{ width: 24, height: 24, ml: 2, mr: 2 }}>
                {item.icon}
            </Box>

            <Box component="span">{item.title} </Box>

        </ListItemButton>
    );

}

NavItem.propTypes = {
    item: PropTypes.object,
};