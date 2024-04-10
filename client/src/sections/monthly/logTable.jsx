import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, 
         Table, 
         TableBody, 
         TableContainer, 
         TableHead, 
         TableCell, 
         TableRow, 
         TablePagination } from '@mui/material';
import '../../components/styles/LogTableStyle.css';

import { fDateTime } from '../../utils/formatTme';

function TableRowComponent({ tester, paramName, paramValue, createdAt }) {
  return (
    <TableRow>
      <TableCell
        sx={{
          textAlign: 'center',
          borderBottom: 'none',
          color: 'white',
          fontFamily: 'Poppins',
          fontSize: 13,
          fontWeight: 300
        }}
      >
        {tester}
      </TableCell>
      <TableCell
        sx={{
          textAlign: 'center',
          borderBottom: 'none',
          color: 'white',
          fontFamily: 'Poppins',
          fontSize: 13,
          fontWeight: 300
        }}
      >
        {paramName}
      </TableCell>
      <TableCell
        sx={{
          textAlign: 'center',
          borderBottom: 'none',
          color: 'white',
          fontFamily: 'Poppins',
          fontSize: 13,
          fontWeight: 300
        }}
      >
        {paramValue}
      </TableCell>
      <TableCell
        sx={{
          textAlign: 'center',
          borderBottom: 'none',
          color: 'white',
          fontFamily: 'Poppins',
          fontSize: 13,
          fontWeight: 300
        }}
      >
        {fDateTime(createdAt)}
      </TableCell>
    </TableRow>
  );
}

TableRowComponent.propTypes = {
  tester: PropTypes.string,
  paramName: PropTypes.string,
  paramValue: PropTypes.string,
  date: PropTypes.instanceOf(Date),
};

export default function LogTable({ title, subheader, list, sx, ...other }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Card
      spacing={3}
      sx={{
        px: 4,
        py: 4,
        overflowX: 'hidden',
        ...sx,
      }}
      {...other}
    >
      <div className="custom-table">
        <TableContainer
          sx={{
            "& th": {
              color: "#0A1929",
              fontFamily: "Archivo, 'sans-serif'" ,
              fontSize: 15,
              fontWeight: '600',
              backgroundColor: "#8CACFF",
              position: 'sticky',
              top: 0,
            },
            "&::-webkit-scrollbar": {
              display: 'none',
            },
          }}
          style={{ overflowY: 'auto' }}
        >
          <Table style={{ width: '100%',  
                        borderSpacing: '0 15px',
                        textAlign: 'center' }} >
            <TableHead>
              <TableRow>
                  <TableCell 
                      sx={{ textAlign: 'center', 
                            borderBottom: 'none', 
                            }}
                      >
                          Tester
                  </TableCell>
                  <TableCell 
                      sx={{ textAlign: 'center', 
                            borderBottom: 'none'}}
                      >
                        Parameter Name
                  </TableCell>
                  <TableCell 
                      sx={{ textAlign: 'center', 
                            borderBottom: 'none'}}
                      >
                        Value
                  </TableCell>
                  <TableCell 
                      sx={{ textAlign: 'center', 
                            borderBottom: 'none'}}
                      >
                        Date
                  </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list &&
                list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
                  <TableRowComponent key={item.id} {...item} />
                ))}
            </TableBody>
          </Table>
          <TablePagination
            style={{ color: 'white' }}
            rowsPerPageOptions={[10, 25, 45, 50]}
            component="div"
            rowsPerPage={rowsPerPage}
            page={page}
            count={list ? list.length : 0}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>
    </Card>
  );
}

LogTable.propTypes = {
  list: PropTypes.array,
  subheader: PropTypes.string,
  title: PropTypes.string,
  sx: PropTypes.object,
};

