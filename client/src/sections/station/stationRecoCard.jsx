import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Stack, Typography, Button } from '@mui/material';

export default function StationRecoCard({ suggestionImageSrc, suggestionSubheader, sx, ...other }) {
    const [isImageVisible, setIsImageVisible] = useState(true);
    const [isSubheaderVisible, setIsSubheaderVisible] = useState(false);

    const handleImageClick = () => {
        setIsImageVisible(!isImageVisible);
        setIsSubheaderVisible(!isSubheaderVisible);
    };

    const handleSubheaderClick = () => {
        setIsImageVisible(true);
        setIsSubheaderVisible(false);
    };

    return (
        <Card sx={{ borderRadius: 10, ...sx }} {...other}>
            <Stack direction="row" alignItems="center" justifyContent="center">
                {isImageVisible && (
                    <Button
                        variant="outlined"
                        sx={{
                            p: 1,
                            borderColor: '#8cacff',
                            width: '4rem',
                            height: '4rem',
                            '&:hover': {
                                borderColor: '#8cacff',
                            },
                        }}
                        onClick={handleImageClick}
                    >
                        <img src={suggestionImageSrc} alt="Suggestion Image" style={{ width: '70%', height: '70%' }} />
                    </Button>
                )}
                {isSubheaderVisible && (
                    <Typography
                        variant="subtitle1"
                        sx={{
                            color: '#8cacff',
                            fontSize: 13,
                            fontFamily: 'Poppins',
                            fontWeight: '400',
                            lineHeight: 0.9,
                            textAlign: 'center',
                            cursor: 'pointer', // Add cursor pointer to indicate it's clickable
                        }}
                        onClick={handleSubheaderClick}
                    >
                        {suggestionSubheader}
                    </Typography>
                )}
            </Stack>
        </Card>
    );
}

StationRecoCard.propTypes = {
    suggestionImageSrc: PropTypes.string.isRequired,
    suggestionSubheader: PropTypes.string.isRequired,
    sx: PropTypes.object,
};
