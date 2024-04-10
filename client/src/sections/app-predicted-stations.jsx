import PropTypes from 'prop-types';
import { Stack, Card, Divider, Typography, Button } from '@mui/material';

export default function AppPredictedStations({ sx, ...other }) {
    // Placeholder data for station results
    const stationResults = [
        { name: 'Station A', wqi: 80 },
        { name: 'Station B', wqi: 95 },
        { name: 'Station C', wqi: 75 },
    ];

    // Find the station with the highest WQI
    const bestStation = stationResults.reduce((prev, current) =>
        prev.wqi > current.wqi ? prev : current
    );

    // Find the station with the lowest WQI
    const worstStation = stationResults.reduce((prev, current) =>
        prev.wqi < current.wqi ? prev : current
    );

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
            <Stack mt={2} direction="column" alignItems="center">

                <Typography
                    variant="h6"
                    sx={{
                        color: 'white',
                        fontSize: 25,
                        fontFamily: "Archivo, 'sans-serif'",
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        color: '#8cacff',
                    }}
                >
                    Water Quality Predictions for Next Month
                </Typography>

                

                <Stack direction="column" alignItems="center" spacing={2}>

                    {/* Display WQI results for each station */}
                    {stationResults.map((station, index) => (
                        <Typography
                            key={index}
                            variant="body1"
                            sx={{
                                color: '#ffff',
                                fontSize: 16,
                                fontFamily: "Archivo, 'sans-serif'",
                                fontWeight: '600',
                            }}
                        >
                            {`${station.name}: ${station.wqi}`}
                        </Typography>
                    ))}
                    {/* sige */}
                    {/* :P */}
                    <Typography
                        variant="body1"
                        sx={{
                            color: '#ffff',
                            fontSize: 16,
                            fontFamily: "Archivo, 'sans-serif'",
                            fontWeight: '600',
                        }}
                    >
                        Best Suitable Station: {bestStation.name}
                    </Typography>

                    {/* Display the not-so-suitable station */}
                    <Typography
                        variant="body1"
                        sx={{
                            color: '#ffff',
                            fontSize: 16,
                            fontFamily: "Archivo, 'sans-serif'",
                            fontWeight: '600',
                        }}
                    >
                        Not-So-Suitable Station: {worstStation.name}
                    </Typography>
                </Stack>
            </Stack>
        </Card>
    );
}

AppPredictedStations.propTypes = {
    sx: PropTypes.object,
};
