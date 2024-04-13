import React from 'react';
import PropTypes from 'prop-types';
import { Card, Table, TableHead, TableBody, TableRow, TableCell, Paper, Button } from '@mui/material';
import { fDateTime } from '../utils/formatTme';

export default function AppLogTimeline({ title, subheader, list, sx, ...other }) {


  const buttonStyle = {
    pointerEvents: 'none',
    '&:hover': {
      backgroundColor: 'inherit', // optional: retain original background color on hover
    },
  };

  

  return (
    <Card spacing={1} sx={{ px: 1, py: 1, overflowX: 'auto', ...sx }} {...other}>
      <Paper sx={{ borderRadius: '15px', overflow: 'auto', backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Table>
          <TableHead style={{ backgroundColor: '#001227', color: 'white', fontWeight: 600 }}>
            <TableRow>
              <TableCell sx={{ color: '#8cacff', fontWeight: 600, fontFamily: 'Poppins', borderBottom: 'none', position: 'sticky', top: 0, zIndex: 1 }}>Stations</TableCell>
              <TableCell sx={{ color: '#8cacff', fontWeight: 600, fontFamily: 'Poppins', borderBottom: 'none', position: 'sticky', top: 0, zIndex: 1 }}>Tester</TableCell>
              <TableCell sx={{ color: '#8cacff', fontWeight: 600, fontFamily: 'Poppins', borderBottom: 'none', position: 'sticky', top: 0, zIndex: 1 }}>Date</TableCell>
              <TableCell sx={{ color: '#8cacff', fontWeight: 600, fontFamily: 'Poppins', borderBottom: 'none', position: 'sticky', top: 0, zIndex: 1 }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((item, index) => (
              <TableRow key={item.id || index}>
                <TableCell variant="subtitle2" sx={{ borderBottom: '1px solid #03324e', color: '#8cacff', fontFamily: 'Poppins', fontWeight: '700' }}>{item.stationName}</TableCell>
                <TableCell variant="subtitle2" sx={{ borderBottom: '1px solid #03324e', color: '#8cacff', fontFamily: 'Poppins' }}>{item.tester}</TableCell>
                <TableCell variant="subtitle2" sx={{ borderBottom: '1px solid #03324e', color: '#8cacff', fontFamily: 'Poppins' }}>{fDateTime(item.dateAdded)}</TableCell>
                <TableCell variant="subtitle2" sx={{ borderBottom: '1px solid #03324e', color: '#8cacff', fontFamily: 'Poppins' }}>
                <Button
                style={buttonStyle}
               variant="contained"
               sx={{
                      backgroundColor: getStatusBackgroundColor(item.status),
                      color: getStatusFontColor(item.status),
                      padding: '0.5rem',
                      fontWeight: '600',
                      borderRadius: '3rem',
                      fontFamily: 'Poppins',
                      lineHeight: 1,
                      boxShadow: 'none',
                      fontSize: '0.7rem',
                    }}
                  >
                    {item.status}
                </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Card>
  );
}

AppLogTimeline.propTypes = {
  list: PropTypes.array,
  subheader: PropTypes.string,
  title: PropTypes.string,
  sx: PropTypes.object,
};

function getStatusBackgroundColor(status) {
  switch (status) {
    case 'Added':
      return '#74a7f7';
    case 'Monitored':
      return '#ffff80';
    case 'Recently Monitored':
      return '#a1e6a6';
    case 'Not Monitored':
      return '#FAD5A5';
    default:
      return 'transparent';
  }
}

function getStatusFontColor(status) {
  switch (status) {
    case 'Added':
      return '#093887';
    case 'Monitored':
      return '#616106';
    case 'Recently Monitored':
      return '#043608';
    case 'Not Monitored':
      return '#CC5500';
    default:
      return 'black';
  }
}
