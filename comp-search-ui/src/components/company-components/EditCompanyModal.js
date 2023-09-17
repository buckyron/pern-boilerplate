import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Modal from 'react-bootstrap/Modal';
import { useForm } from "react-hook-form";
import { editCompany } from '../../services/CompanyService'

export default function EditCompanyModal({company, companyEdited}) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
      editCompany(company.company_id, data).then(response => {
        companyEdited(response);
        setShow(false);
    });
    };
  
    return (
      <>
        <IconButton aria-label="delete" onClick={handleShow}>
          <EditIcon />
        </IconButton>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Company Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="companyId">Id</label>
                  <input {...register("company_id")} type="text" className="form-control" defaultValue={company.company_id} name="company_id" id="company_id" disabled />
                </div>

            </div>
            <div className="row">
                <div className="form-group col-md-6">
                    <label htmlFor="company">Company</label>
                    <input {...register("company_name")} type="text" className="form-control" defaultValue={company.company_name} name="company_name" id="company_name" placeholder="Create a Company" />
                </div>
            </div>
            <div className="row mrgnbtm">
                <div className="form-group col-md-6">
                    <label htmlFor="address">Address</label>
                    <input {...register("address")} type="text" className="form-control" defaultValue={company.address} name="address" id="address" placeholder="Address" />
                </div>
            </div>
            <div className="btncenter">
              <input type="submit" className="btn btn-danger" />
            </div>
            </form>
          </Modal.Body>
          
        </Modal>
      </>
    );
}