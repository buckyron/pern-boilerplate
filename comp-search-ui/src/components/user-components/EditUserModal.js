import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useForm } from "react-hook-form";
import { editUser } from '../../services/UserService'
import '../../App.css';

export default function EditUserModal({user, userEdited}) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
      editUser(user.user_id, data).then(response => {
        userEdited(response);
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
            <Modal.Title>User Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row mrgnbtm">
                <div className="form-group col-md-6">
                  <label htmlFor="userId">Id</label>
                  <input {...register("user_id")} type="text" className="form-control" defaultValue={user.user_id} name="user_id" id="user_id" disabled />
                </div>

            </div>
            <div className="row mrgnbtm">
                <div className="form-group col-md-6">
                    <label htmlFor="user">First</label>
                    <input {...register("firstname")} type="text" className="form-control" defaultValue={user.firstname} name="firstname" id="firstname" placeholder="First name" />
                </div>
            </div>
            <div className="row mrgnbtm">
                <div className="form-group col-md-6">
                    <label htmlFor="user">Last</label>
                    <input {...register("lastname")} type="text" className="form-control" defaultValue={user.lastname} name="lastname" id="lastname" placeholder="Last Name" />
                </div>
            </div>
            <div className="row mrgnbtm">
                <div className="form-group col-md-6">
                    <label htmlFor="user">Email</label>
                    <input {...register("email")} type="email" className="form-control" defaultValue={user.email} name="email" id="email" placeholder="Email" />
                </div>
            </div>
            <div className="row mrgnbtm">
                <div className="form-group col-md-6">
                    <label htmlFor="designation">Designation</label>
                    <input {...register("designation")} type="text" className="form-control" defaultValue={user.designation} name="designation" id="designation" placeholder="designation" />
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