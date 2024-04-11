import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Stack,
  Typography,
} from '@mui/material';

export default function StationRecoCard({
  suggestionImageSrc,
  suggestionSubheader,
  sx,
  ...other
}) {
  return (
    <Card
      spacing={3}
      sx={{
        px: 4,
        py: 4,
        borderRadius: 10,
        ...sx,
      }}
      {...other}
    >
      <Stack
        direction={{ xs: 'row', md: 'column' }} // Change direction based on screen size
        alignItems="center"
        justifyContent="center" // Center stacks horizontally
        spacing={2}
      >
        <img
          src={suggestionImageSrc}
          alt="Suggestion Image"
          style={{ width: '33%', maxWidth: '100%', marginBottom: '2rem' }} // Adjust size as needed
        />
        {/* Suggestion Subheader */}
        <Stack direction="column" alignItems="center">
          <Typography
            variant="subtitle1"
            sx={{
              color: '#8cacff',
              fontSize: 13,
              fontFamily: "Poppins",
              fontWeight: '400',
              lineHeight: 0.9,
              textAlign: 'center',
            }}
          >
            {suggestionSubheader}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

StationRecoCard.propTypes = {
  suggestionImageSrc: PropTypes.string.isRequired,
  suggestionSubheader: PropTypes.string.isRequired,
  sx: PropTypes.object,
};
