import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import {Box, Link} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { RouterLink } from '../../routes/components/routerLink';

// ----------------------------------------------------------------------

const imageUrl = new URL('../../img/realm_text.png', import.meta.url)

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;

  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 125,
        height: 40,
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      <img
        src={imageUrl}
        alt="Logo"
        style={{ width: '100%', height: '100%', cursor: 'pointer', ...sx }}
      />
    </Box>
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href="/dashboard" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;
