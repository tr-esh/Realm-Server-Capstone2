import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Card, Stack, Typography } from '@mui/material';

export default function StationStatus({ station, index, sx, ...other }) {
  const { title, cover, subtitle, status } = station;
  const [isHovered, setIsHovered] = useState(false);

  const renderTitle = (
    <Typography
      variant="h6"
      color="textPrimary"
      sx={{
        fontSize: 30,
        fontFamily: "Archivo, 'sans-serif'",
        fontWeight: '600',
        textTransform: 'uppercase',
        mt: 2,
        position: 'relative',
        color: isHovered ? '#0d2135' : '#8CACFF',
        '&:before': {
          content: '""',
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          zIndex: -1,
          transition: 'background-color 0.3s ease-in-out',
        },
        '&:hover:before': {
          backgroundColor: '#0d2135',
        },
      }}
    >
      {title}
    </Typography>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Excellent':
        return '#A1E6A6';
      case 'Good':
        return '#FFFF80';
      case 'Fair':
        return '#EEFF51';
      case 'Poor':
        return '#F5B748';
      case 'Very Poor':
        return '#FF6551';
      default:
        return '#000000'; // Default color if status not recognized
    }
  };

  const statusColor = getStatusColor(status);

  const getStatusInterpretation = (status) => {
    switch (status) {
      case 'Excellent':
        return 'Excellent';
      case 'Good':
        return 'Good';
      case 'Fair':
        return 'Fair';
      case 'Poor':
        return 'Poor';
      case 'Very Poor':
        return 'Very Poor';
      default:
        return 'Unknown'; // Default interpretation if status not recognized
    }
  };

  const statusInterpretation = getStatusInterpretation(status);

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        px: 4,
        py: 4,
        borderRadius: 10,
        backgroundColor: '#10273d',
        position: 'relative',
        transition: 'background-color 0.3s ease-in-out',
        '&:hover': {
          backgroundColor: '#8CACFF',
          cursor: 'pointer',
        },
        ...sx,
      }}
      {...other}
    >
      <Stack direction="column" alignItems="center">
        {renderTitle}
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            color: 'white',
            fontSize: 10,
            fontFamily: "'Archivo', sans-serif",
            fontWeight: '400',
            textTransform: 'capitalize',
            lineHeight: 0.2,
            mb: 3,
          }}
        >
          {subtitle}
        </Typography>
      </Stack>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-23%)',
          width: '100%',
          height: '70%',
          ml: -4,
          overflow: 'hidden', // Ensure the gradient doesn't overflow
        }}
      >
        <Box
          component="div"
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: 'inherit',
            display: 'block',
            position: 'relative', // Position relative for pseudo-element
            background: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)), url(${cover})`, // Gradient overlay + Image URL
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '80%',
            left: '90%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: statusColor,
            width: 30,
            height: 30,
            borderRadius: '50%',
          }}
        />
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            position: 'absolute',
            top: '75%',
            left: '70%',
            transform: 'translateX(-50%)',
            color: 'white',
            fontSize: 20,
            fontFamily: "'Archivo', sans-serif",
            fontWeight: '400',
            textTransform: 'capitalize',
          }}
        >
          {statusInterpretation}
        </Typography>
      </Box>
    </Card>
  );
}

StationStatus.propTypes = {
  station: PropTypes.shape({
    title: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['Excellent', 'Good', 'Fair', 'Poor', 'Very Poor']).isRequired,
  }).isRequired,
  index: PropTypes.number,
  sx: PropTypes.object,
};
