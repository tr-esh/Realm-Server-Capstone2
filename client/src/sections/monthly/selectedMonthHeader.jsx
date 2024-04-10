import PropTypes from 'prop-types';

import { Card, Box, Grid, Typography, IconButton } from '@mui/material';
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import { Link } from 'react-router-dom';

export default function SelectedMonthHeader({ title, subtitle, icon, color = 'primary', sx, ...other }) {
    return(
        <Card
            component={Grid}
            container
            spacing={3}
            alignItems="center"
            sx={{
                px: 2,
                py: 4,
                borderRadius: 10,
                ...sx,
            }}
            {...other}
            >
            <Grid item xs={2} sm={1} mt={-2}>
                <Box>
                    <IconButton
                                component={Link}
                                to="/logentries"
                                sx={{   padding: '8px', 
                                        border: `1px solid #8CACFF`, 
                                        borderRadius: 3,
                                        display: 'flex', 
                                        alignItems: 'center',
                                    }}>
                        <KeyboardReturnRoundedIcon sx={{ fontSize: 30, 
                                                         color: '#6990f5'}}/> 
                    </IconButton>  
                </Box>
            </Grid>
            
            <Grid item xs={10} sm={11}>
                <Box>
                <Typography
                    variant="h4"
                    sx={{
                    fontSize: 50,
                    fontFamily: "'Arimo', sans-serif",
                    fontWeight: '700',
                    color: 'white',
                    textTransform: 'uppercase',
                    mt: -4
                    }}
                >
                    {title}
                </Typography>

                <Typography
                    variant="subtitle1"
                    sx={{
                    color: '#8CACFF',
                    fontSize: 15,
                    fontFamily: 'Poppins',
                    fontWeight: '300',
                    lineHeight: '0.2'
                    }}
                >
                    {subtitle}
                </Typography>
                </Box>
            </Grid>
            </Card>
    )
}

SelectedMonthHeader.propTypes = {
    color: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    sx: PropTypes.object,
    title: PropTypes.string,
    subtitle: PropTypes.string,
  };