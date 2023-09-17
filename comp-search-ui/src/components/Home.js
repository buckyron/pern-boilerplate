
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import Header from './Header'
import CreateCompany from './company-components/CreateCompany'
import { getAllCompanies, deleteCompany } from '../services/CompanyService'
import { Companies } from './company-components/Company';

function Home() {

  const [companies, setCompanies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [numberOfCompanies, setNumberOfCompanies] = useState([]);
  const [isCompanyEdited, setCompanyEdited] = useState(false);

  useEffect(() => {
    getAllCompanies(currentPage, rowsPerPage).then(data => {
      if(data.companies){
        setCompanies(data.companies);
      }
      if(data.totalPages) {
        setTotalPages(data.totalPages);
      }
      if(data.totalCompanies) {
        setTotalCompanies(data.totalCompanies);
      }
      if(data.currentPage) {
        setCurrentPage(parseInt(data.currentPage));
      }
        
      });
  }, [numberOfCompanies, isCompanyEdited, currentPage, rowsPerPage, totalPages])


  function delCompany(companyId) {
      deleteCompany(companyId).then(response => {
        setNumberOfCompanies(numberOfCompanies - 1)
      });
  }

  function companyCreated() {
    setNumberOfCompanies(numberOfCompanies + 1)
  }

  function companyEdited(res) {
     setCompanyEdited(res)
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
      <Header></Header>
      <div className="container mrgntop">
        <div className="row">
          <div className="col-md-12">
              <CreateCompany companyCreated={companyCreated}></CreateCompany>
          </div>
        </div>
      </div>
      <div className="container mrgntop">
        <Companies totalPages={totalPages} currentPage={currentPage} totalCompanies={totalCompanies} rows={companies} rowsPerPage={rowsPerPage} deleteCompany={delCompany} companyEdited={companyEdited} handleChangePage={handleChangePage}handleChangeRowsPerPage={handleChangeRowsPerPage} ></Companies>
     </div> 
  </div>
  );
}

export default Home;