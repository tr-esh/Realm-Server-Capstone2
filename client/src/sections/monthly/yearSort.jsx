import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function YearSort({ onSort, sx, ...other }) {
    const [yearDetail, setYearDetail] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [yearOptions, setYearOptions] = useState([]);

  useEffect(() => {
        const fetchYears = async () => {
            try {
              const response = await fetch('/api/realm/yearOptions');
              const responseData = await response.json();
          
              console.log('Fetched data:', responseData);
          
              if (Array.isArray(responseData.yearOptions)) {
                setYearOptions(responseData.yearOptions);
                setYearDetail(responseData.currentYear || ''); // Set currentYear if available
              } else {
                console.error('Error: yearOptions is not an array:', responseData);
              }
            } catch (error) {
              console.error('Error fetching years:', error);
            }
          };     

    fetchYears();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value) => {
    setAnchorEl(null);

    if (value && value.label) {
      setYearDetail(value.label);

      if (onSort) {
        onSort(value);
      }
    }
  };

  // Conditional rendering: Show loading if yearOptions is empty
  if (yearOptions.length === 0) {
    return <p>Loading...</p>;
  }

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
          fontWeight: '700',
          fontFamily: '"Archivo", Sans-serif',
          border: '1px solid #8CACFF'
        }}
      >
        {yearDetail}
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
        {yearOptions.map((option) => (
          <MenuItem key={option.value} value={option.value} onClick={() => handleClose(option)}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

YearSort.propTypes = {
  onSort: PropTypes.func,
  sx: PropTypes.object,
};
