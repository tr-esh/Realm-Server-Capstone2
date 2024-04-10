import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function StationSort({ onSort, sx, ...other }) {
  const [stationDetail, setStationDetail] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [stationOptions, setStationOptions] = useState([]);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch('/api/realm/stationOptions');
        const data = await response.json();
        setStationOptions(data);
        setStationDetail(data.length > 0 ? data[0].label : '');
      } catch (error) {
        console.error('Error fetching stations:', error);
      }
    };

    fetchStations();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value) => {
    setAnchorEl(null);
    if (value) {
      setStationDetail(value.label);
      if (onSort) {
        onSort(value);
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
          backgroundColor: '#8CACFF',
          '&:hover': {
            backgroundColor: '#8CACFF',
            opacity: 0.8
          },
          borderRadius: 5,
          color: '#0A1929',
          width: 150,
          height: 45,
          fontSize: '0.8rem',
          fontWeight: '700',
          fontFamily: '"Archivo", Sans-serif'
        }}
      >
        {stationDetail}
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
        {stationOptions.map((option) => (
          <MenuItem key={option.value} value={option.value} onClick={() => handleClose(option)}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

StationSort.propTypes = {
  onSort: PropTypes.func,
  sx: PropTypes.object,
};
