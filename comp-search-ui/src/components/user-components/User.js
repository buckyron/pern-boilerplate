import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material'
import { colorChannel } from '@mui/system';
import React, {useRef} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { IconMenu } from '../common-components/IconMenu';



export const User = ({currentPage, totalPages, rowsPerPage, totalUsers, rows, deleteUser, userEdited, handleChangePage, handleChangeRowsPerPage}) => {
    const emptyRows =
    currentPage > 0 ? Math.max(0, rowsPerPage - rows.length) : 0;
    const navigate = useNavigate();
    const location = useLocation();
    const initialRoutesSetRef = useRef(false);

    const toUserProfile=(user_id)=>{
        if(!initialRoutesSetRef.current){
            initialRoutesSetRef.current = true;
            navigate('/company/users/user' + location.search ,{state:{id: user_id}});
        }
    }

    return(
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{fontWeight: 'bold', minWidth: 100}}> User Id </TableCell>
              <TableCell style={{fontWeight: 'bold', minWidth: 100}}> First Name </TableCell>
              <TableCell style={{fontWeight: 'bold', minWidth: 100}}> Last Name </TableCell>
              <TableCell style={{fontWeight: 'bold', minWidth: 100}}> email </TableCell>
              <TableCell style={{fontWeight: 'bold', minWidth: 100}}> Designation </TableCell>
              <TableCell style={{fontWeight: 'bold', minWidth: 100}}> Status </TableCell>
              <TableCell style={{fontWeight: 'bold', maxWidth: 100}} align="right"> Action </TableCell>
            </TableRow>
          </TableHead>
           <TableBody>
          {(rows).map((row) => (
            <TableRow key={row.user_id}>
              <TableCell style={{ minWidth: 100 }}>
                {row.user_id}
              </TableCell>
              <TableCell style={{ minWidth: 100 }} >
                {row.firstname}
              </TableCell>
              <TableCell style={{ minWidth: 100 }} >
                {row.lastname}
              </TableCell>
              <TableCell style={{ minWidth: 100 }} >
                {row.email}
              </TableCell>
              <TableCell style={{ minWidth: 100 }} >
                {row.designation}
              </TableCell>
              <TableCell style={{ minWidth: 100 }} >
                {row.active ? "Active" : "Inactive"}
              </TableCell>
              <TableCell align="right" style={{ maxWidth: 150 }}>
                <IconMenu handleManage={toUserProfile} handleDelete={deleteUser} id={row.user_id}/>
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
              colSpan={7}
              count={totalUsers}
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