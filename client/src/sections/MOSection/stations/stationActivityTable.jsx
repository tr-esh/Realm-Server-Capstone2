import React from 'react';
import PropTypes from 'prop-types';
import { Card, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import { fDateTime } from '../../../utils/formatTme'; // Adjust the path according to your project structure

export default function StationActivityTable({ title, subheader, list, sx, ...other }) {
  return (
    <Card spacing={3} sx={{ px: 4, py: 4, overflowX: 'auto', ...sx }} {...other}>
      <Paper sx={{ borderRadius: '15px', overflow: 'hidden', backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Table>
          <TableHead style={{ backgroundColor: '#001227', color: 'white', fontWeight: 600 }}>
            <TableRow>
              <TableCell align="center" sx={{ color: '#8cacff', fontWeight: 600, fontFamily: 'Poppins', borderBottom: 'none' }}>Tester</TableCell>
              <TableCell align="center" sx={{ color: '#8cacff', fontWeight: 600, fontFamily: 'Poppins', borderBottom: 'none' }}>Date</TableCell>
              <TableCell align="center" sx={{ color: '#8cacff', fontWeight: 600, fontFamily: 'Poppins', borderBottom: 'none' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((item, index) => (
              <TableRow key={item.id || index}>
                <TableCell align="center" sx={{ borderBottom: '1px solid #03324e', color: '#8cacff', fontFamily: 'Poppins', fontWeight: '700' }}>{item.tester}</TableCell>
                <TableCell align="center" sx={{ borderBottom: '1px solid #03324e', color: '#8cacff', fontFamily: 'Poppins' }}>{fDateTime(item.dateAdded)}</TableCell>
                <TableCell align="center" sx={{ borderBottom: '1px solid #03324e', color: '#8cacff', fontFamily: 'Poppins' }}>
                  <span
                    style={{
                      backgroundColor: getStatusBackgroundColor(item.status),
                      color: getStatusFontColor(item.status),
                      padding: '0.5rem',
                      fontWeight: '700',
                      borderRadius: '3rem',
                      fontFamily: 'Poppins'
                    }}
                  >
                    {item.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Card>
  );
}

StationActivityTable.propTypes = {
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
    default:
      return 'black';
  }
}
