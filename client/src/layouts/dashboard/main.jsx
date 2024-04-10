import PropTypes from 'prop-types';

import { Box } from '@mui/material';

import { useResponsive } from '../../hooks/useResponsive';

import { SIDE, HEADER } from './configlayout';

const SPACING = 8;

export default function Main({ children, sx, ...other }) {
    const lgUp = useResponsive('up', 'lg');

    return(
        <Box
            component="main"
            sx={{
                flexGrow:1,
                minHeight:1,
                display: 'flex',
                flexDirection: 'column',
                py: `${HEADER.H_MOBILE + SPACING}px`,
                ...(lgUp && {
                    px: 2,
                    py: `${HEADER.H_DESKTOP + SPACING}px`,
                    width: `calc(100% - ${SIDE.WIDTH}px),`
                }),
                ...sx,
            }}
            {...other}
            >
                { children }
        </Box>
    );
}

Main.propTypes = {
    children: PropTypes.node,
    sx: PropTypes.object,
};