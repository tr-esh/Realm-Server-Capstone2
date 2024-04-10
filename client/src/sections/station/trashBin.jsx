import React from 'react';
import PropTypes from 'prop-types';
import { Button, Box, Typography } from "@mui/material";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

export default function TrashBin({ onClick, totalCount, sx, ...other }) {
    return (
        <Button 
            aria-controls="simple-menu" 
            aria-haspopup="true" 
            onClick={onClick}
            sx={{
                backgroundColor: 'transparent',
                '&:hover': { 
                    backgroundColor: '#8CACFF',
                    opacity: 0.8,
                    color: '#0A1929'
                },
                borderRadius: 5,
                color: 'rgb(25, 118, 210)',
                width: 150, 
                height: 45, 
                fontSize: '0.8rem',
                fontWeight: '500',
                fontFamily: "Poppins",
                border: '1px solid #8CACFF'
            }}
            {...other}
        >
            
            <Box sx={{ borderRadius: '50%',
                       width: 20, 
                       height: 20, 
                       backgroundColor: 'transparent', 
                       color: 'rgb(25, 118, 210)',
                       border: '1px solid rgb(25, 118, 210)',
                       display: 'flex', 
                       justifyContent: 'center', 
                       alignItems: 'center', 
                       marginRight: 1, 
                        }}>
                <Typography variant="body1" 
                            sx={{ color: 'rgb(25, 118, 210)', 
                                  fontWeight: 'bold', 
                                  fontSize: '13px', 
                                  fontFamily: "Poppins",
                                }}>
                                    {totalCount}
                </Typography>
                                  
            </Box>

            Trash Bin

        </Button>
    );
}

TrashBin.propTypes = {
    onClick: PropTypes.func,
    totalCount: PropTypes.number,
    sx: PropTypes.object,
};
