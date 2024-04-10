import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from "@mui/material";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

export default function DeleteButton({ onClick, sx, ...other }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        // Call the external onClick function if it exists
        if(onClick) {
            onClick();
        }

        setAnchorEl(event.currentTarget);
    };
    

    return (
        <>
            <Button 
                aria-controls="simple-menu" 
                aria-haspopup="true" 
                onClick={handleClick}
                sx={{
                    backgroundColor: 'transparent',
                    '&:hover': { 
                        backgroundColor: '#ff5252',
                        opacity: 0.8,
                        color: '#a70000',
                        fontWeight: '700',
                    },
                    borderRadius: 5,
                    color: 'white',
                    width: 175, 
                    height: 45, 
                    fontSize: '0.8rem',
                    fontWeight: '500',
                    fontFamily: "Poppins",
                    border: '1px solid #ff5252'
                }}
                startIcon={<DeleteRoundedIcon />}
            >
                Delete Station
            </Button>
                
        </>
    );
  }

  DeleteButton.propTypes = {
    onClick: PropTypes.func,
    sx: PropTypes.object,
};