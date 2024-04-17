import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Stack, Typography, Button } from '@mui/material';

export default function StationRecoCard({ suggestionImageSrc, suggestionSubheader, sx, ...other }) {
    const [isSubheaderVisible, setIsSubheaderVisible] = useState(false);

    const handleImageClick = () => {
        setIsSubheaderVisible(!isSubheaderVisible);
    };

    return (
        <Card spacing={3} sx={{ px: 4, py: 4, borderRadius: 10, ...sx }} {...other}>
            <Stack direction={{ xs: 'row', md: 'column' }} alignItems="center" justifyContent="center" spacing={2}>
                <Button
                    variant="outlined"
                    sx={{
                        p: 0,
                        borderColor: '#8cacff',
                        width: '4rem',
                        height: '4rem',
                        '&:hover': {
                            borderColor: '#6b8cff',
                        },
                    }}
                    onClick={handleImageClick}
                >
                    <img src={suggestionImageSrc} alt="Suggestion Image" style={{ width: '60%', height: '60%' }} />
                </Button>
                {isSubheaderVisible && (
                    <Stack direction="column" alignItems="center">
                        <Typography
                            variant="subtitle1"
                            sx={{
                                color: '#8cacff',
                                fontSize: 13,
                                fontFamily: 'Poppins',
                                fontWeight: '400',
                                lineHeight: 0.9,
                                textAlign: 'center',
                            }}
                        >
                            {suggestionSubheader}
                        </Typography>
                    </Stack>
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
