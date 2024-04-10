import PropTypes from 'prop-types';

import { Card,
         Stack,
         Typography } from '@mui/material';



export default function MonthHeaderCard({ title, subtitle, icon, color = 'primary', sx, ...other }) {
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
                     sx={{ fontSize: 50,
                           fontFamily: "Archivo, 'sans-serif'", 
                           fontWeight: '700',
                           color: 'white',
                           mb: -3}}>
                            {title}
                </Typography>

                <Typography variant="h4" 
                      sx={{ fontSize: 50,
                            fontFamily: "Archivo, 'sans-serif'", 
                            fontWeight: '700'}}>
                    {subtitle}
                </Typography>
            </Stack>

        </Card>
    );
}

MonthHeaderCard.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};