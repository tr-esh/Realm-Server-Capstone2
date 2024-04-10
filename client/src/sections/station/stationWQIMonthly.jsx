import PropTypes from 'prop-types';

import { Box,
         Card,
         Stack,
         Typography } from '@mui/material';


export default function StationWQIMonthly({ title, info, subtitle, color = 'primary', sx, ...other }) {
    return (
        <Card
            component={Stack}
            spacing={3}
            direction="row"
            sx={{
            px: 4,
            py: 4,
            borderRadius: 10,
            ...sx,
            }}
            {...other}
        >
            <Stack>
                <Typography variant="h4" 
                     sx={{ fontSize: 30,
                           fontFamily: "Archivo, 'sans-serif'", 
                           fontWeight: '700',
                           color: '#8CACFF',
                           mb: -3}}>
                            {title}
                </Typography>

                <Typography variant="h4" 
                      sx={{ fontSize: 50,
                            fontFamily: "Archivo, 'sans-serif'", 
                            fontWeight: '700',
                            color: 'white'}}>
                    {info}
                </Typography>

                <Typography variant="body2" 
                      sx={{ fontSize: 13,
                            fontFamily: "Archivo, 'sans-serif'", 
                            fontWeight: '300',
                            color: 'white'}}>
                    {subtitle}
                </Typography>
            </Stack>

        </Card>
    );
}

StationWQIMonthly.propTypes = {
  color: PropTypes.string,
  sx: PropTypes.object,
  title: PropTypes.string,
  info: PropTypes.string,
  subtitle: PropTypes.string,
};