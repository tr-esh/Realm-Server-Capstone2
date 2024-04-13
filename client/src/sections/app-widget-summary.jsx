import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';
import '../components/styles/ImageStyle.css';

function AppWidgetSummary({
  title,
  imageSource,
  icon,
  color = 'primary',
  sx,
  imageSize,
  stationHolder,
  ...other
}) {
  const isXsOrSm = useMediaQuery('(max-width:600px)'); // Media query for extra small and small screens

  return (
    <Card
      component={Stack}
      spacing={2}
      direction="row"
      sx={{
        borderRadius: 10,
        m: 1,
        backgroundColor: '#10273d',
        boxShadow: 'none',
        ...sx,
      }}
      {...other}
    >
      {icon && <Box sx={{ width: 64, height: 64 }}>{icon}</Box>}

      <Stack>
        <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
          {title}
        </Typography>
        {stationHolder && (
          <Stack>
            {stationHolder} {/* Render the StationCarousel directly */}
          </Stack>
        )}
      </Stack>

      {!isXsOrSm && ( // Conditionally render the img based on screen size
        <img
          src={imageSource}
          alt="Widget Image"
          style={{ width: imageSize, height: 'auto', display: 'block', marginLeft: '3rem' }}
          className="responsive-image"
        />
      )}
    </Card>
  );
}

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  imageSource: PropTypes.string,
  sx: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  stationHolder: PropTypes.node, // Allow any node, including StationCarousel
  total: PropTypes.number,
};

export default AppWidgetSummary;
