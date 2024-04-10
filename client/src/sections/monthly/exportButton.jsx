import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from "@mui/material";

export default function ExportButton({ onClick, sx, ...other }) {
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
          <Tooltip title="Export station report in XLSX format">
            <Button 
                aria-controls="simple-menu" 
                aria-haspopup="true" 
                onClick={handleClick}
                sx={{
                    backgroundColor: 'transparent',
                    '&:hover': { 
                        backgroundColor: '#8CACFF',
                        opacity: 0.8,
                        color: '#0A1929'
                    },
                    borderRadius: 5,
                    color: 'white',
                    width: 150, 
                    height: 45, 
                    fontSize: '0.8rem',
                    fontWeight: '500',
                    fontFamily: 'Poppins',
                    border: '1px solid #8CACFF'
                }}
            >
                Export Data
            </Button>
         </Tooltip>     
       </>
    );
  }

  ExportButton.propTypes = {
    onClick: PropTypes.func,
    sx: PropTypes.object,
};