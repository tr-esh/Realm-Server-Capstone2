import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Card, Stack, Typography } from '@mui/material';

export default function StationCard({ station, onDelete, index, sx, ...other }) {
  const { cover, title, subtitle } = station;
  const [isHovered, setIsHovered] = useState(false);

  const renderTitle = (
    <Typography
      variant="h6"
      color="textPrimary"
      sx={{
        fontSize: 30,
        fontFamily: "Poppins",
        fontWeight: '700',
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
          variant="subtitle2"
          color="textSecondary"
          sx={{
            color: 'white',
            fontSize: 10,
            fontFamily: "Poppins",
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
            background: `linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)), url(${cover})`, // Gradient overlay + Image URL
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
      </Box>
    </Card>
  );
}

StationCard.propTypes = {
  station: PropTypes.object.isRequired,
  index: PropTypes.number,
  onDelete: PropTypes.func,
  sx: PropTypes.object,
};
