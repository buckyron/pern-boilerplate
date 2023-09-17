
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import CreateUser from './CreateUser'
import { deleteUser, getUsersByCompany } from '../../services/UserService'
import { useLocation } from 'react-router-dom';
import { User } from './User';

function UserList(props) {

  const [users, setUsers] = useState([])
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalUsers, setTotalUsers] = useState(0);
  const [numberOfUsers, setNumberOfUsers] = useState([])
  const [isUserEdited, setUserEdited] = useState(false)
  const location = useLocation();
  const [company_id, setCompany_id] = useState(location.state.id);

  useEffect(() => {
    getUsersByCompany(company_id, currentPage, rowsPerPage).then(data => {
      if(data.users){
        setUsers(data.users);
      }
      if(data.totalPages) {
        setTotalPages(data.totalPages);
      }
      if(data.totalUsers) {
        setTotalUsers(data.totalUsers);
      }
      if(data.currentPage) {
        setCurrentPage(parseInt(data.currentPage));
      }
      });
  }, [company_id, numberOfUsers, isUserEdited, currentPage, totalPages, rowsPerPage])


  function delUser(userId) {
      deleteUser(userId).then(response => {
        setNumberOfUsers(numberOfUsers - 1)
      });
  }

  function userCreated() {
    setNumberOfUsers(numberOfUsers + 1)
  }

  function userEdited(res) {
     setUserEdited(res)
  }

  const handleChangePage = (event, newPage) => {
     setCurrentPage(newPage);
  }
  

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setCurrentPage(0);
  };
    
  return (
    <div className="App">
      <div className="container mrgntop">
        <div className="row">
          <div className="col-md-12">
              <CreateUser company_id={company_id} userCreated={userCreated}></CreateUser>
          </div>
        </div>
      </div>
      <div className="container mrgntop">
        <User currentPage={currentPage} totalPages={totalPages} totalUsers={totalUsers} rows={users} rowsPerPage={rowsPerPage} deleteUser={delUser} userEdited={userEdited} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage}></User>
     </div> 
  </div>
  );
}

export default UserList;