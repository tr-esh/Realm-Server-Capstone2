import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function ParameterSort({ options, onSort, sx, ...other}) {

    const [parameterdetail, setParameterDetail] = useState('Temperature');
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
      
    const handleClose = (value) => {
        setAnchorEl(null);
        if (value) {
            setParameterDetail(value.label);
            // Call the onSort function with the selected value if needed
            if (onSort) {
                onSort(value.value);
            }
        }
    };

    return (
        <>
            <Button 
                aria-controls="simple-menu" 
                aria-haspopup="true" 
                onClick={handleClick}
                endIcon={<ArrowDropDownIcon />} 
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
                    border: '1px solid #0A1929'
                }}
            >
                {parameterdetail}
            </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={() => handleClose(null)}
                    sx={{
                        '.MuiPaper-root': {
                            backgroundColor: 'rgba(13, 33, 53, 0.32)', 
                            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                            backdropFilter: 'blur(5px)',
                            WebkitBackdropFilter: 'blur(5px)',
                            color: 'white',
                            fontSize: '0.5rem',
                            fontFamily: "'Archivo', sans-serif",
                        },
                        '.MuiMenuItem-root': {
                            fontSize: '0.8rem', 
                            fontFamily: "'Archivo', sans-serif"
                        }
                    }}
                >
                {options.map((option) => (
                    <MenuItem key={option.value} onClick={() => handleClose(option)}>
                        {option.label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
  }

ParameterSort.propTypes = {
    options: PropTypes.array,
    onSort: PropTypes.func,
    sx: PropTypes.object,
};