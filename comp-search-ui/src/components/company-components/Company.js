import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material'
import React, {useRef} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { IconMenu } from '../common-components/IconMenu';



export const Companies = ({totalPages, currentPage, totalCompanies, rows, rowsPerPage, deleteCompany, handleChangePage, handleChangeRowsPerPage}) => {


    const navigate = useNavigate();
    const location = useLocation();
    const initialRoutesSetRef = useRef(false);
  
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
    currentPage > 0 ? Math.max(0, rowsPerPage - rows.length) : 0;

  

    const toCompanyDetails=(company_id)=>{
        if(!initialRoutesSetRef.current){
            initialRoutesSetRef.current = true;
            navigate('/company/dashboard' + location.search ,{state:{id: company_id, edited: false}});
        }
    }

    return(
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{fontWeight: 'bold', minWidth: 160}}> Company Id </TableCell>
              <TableCell style={{fontWeight: 'bold', minWidth: 100}}> Name </TableCell>
              <TableCell style={{fontWeight: 'bold', minWidth: 200}}> Address </TableCell>
              <TableCell style={{fontWeight: 'bold', maxWidth: 150}} align="right"> Action </TableCell>
            </TableRow>
          </TableHead>
           <TableBody>
          {(rows).map((row) => (
            <TableRow key={row.company_id}>
              <TableCell style={{ minWidth: 160 }}>
                {row.company_id}
              </TableCell>
              <TableCell style={{ minWidth: 100 }} >
                {row.company_name}
              </TableCell>
              <TableCell style={{ minWidth: 200 }} >
                {row.address}
              </TableCell>
              <TableCell align="right" style={{ maxWidth: 150 }}>
                <IconMenu handleManage={toCompanyDetails} handleDelete={deleteCompany} id={row.company_id}/>
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
          
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={4}
              count={totalCompanies}
              rowsPerPage={rowsPerPage}
              page={currentPage}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              
            />
          </TableRow>
        </TableFooter>
        </Table>
      </TableContainer>
  
    )
}