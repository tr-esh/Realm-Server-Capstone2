import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function StationParameterCard({parameterValue, parameterName, parameterScript, unit, sx, ...other}) {
    return(
        <Card
            spacing={3}
            sx={{
            px: 4,
            py: 4,
            borderRadius: 12,
            ...sx,
            }}
            {...other}
        >
            <Stack direction="column" alignItems="center">

                <Typography variant="h5"
                    sx={{ color: '#8cacff',
                        fontSize:  30,
                        fontFamily: "'Raleway', sans-serif", 
                        fontWeight: '600',
                    }}
                 >
                    {parameterName}
                </Typography>

                <Typography
                    variant="h6"
                    sx={{
                        fontSize: 13,
                        fontFamily: "Archivo, 'sans-serif'",
                        fontWeight: '500',
                        textTransform: 'uppercase',
                        backgroundColor: '#03182f',
                        width: '14rem',
                        height: '1.7rem',
                        display: 'flex',
                        borderRadius: '2rem',
                        textAlign: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color:
                            parameterScript === 'Optimal temperature' ||
                            parameterScript === 'Water is Clean' ||
                            parameterScript === 'Neutral'
                                ? '#A1E6A6'
                                : parameterScript === 'Suboptimal temperature' ||
                                parameterScript === 'Water is Turbid(Dirty)' ||
                                parameterScript === 'pH level is Acidic'
                                ? '#F5B748'
                                : parameterScript === 'pH level is Alkaline'
                                ? '#FFFF80'
                                : '#FFFFFF', // Default color if none of the conditions are met
                    }}
                >
                    {parameterScript}
                </Typography>


                <Typography variant="h2"
                    sx={{
                        color: '#8cacff',
                        fontFamily: "Poppins",
                        fontWeight: '500',
                        textTransform: 'uppercase',
                      }}
                 >
                    {parameterValue}
                    <span
                        style={{
                        fontSize: 30, // Adjust the font size as needed
                        marginLeft: '0.2em', // Add some space between parameterValue and unit
                        }}
                    >
                        {unit}
                    </span>
                </Typography>

            </Stack>

        </Card>
    )
}

StationParameterCard.propTypes = {
    parameterValue: PropTypes.number.isRequired,
    parameterName: PropTypes.string.isRequired,
    parameterScript: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,
    sx: PropTypes.object,
}