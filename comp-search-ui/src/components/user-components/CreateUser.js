import React from 'react'
import { useForm } from "react-hook-form";
import { createUser } from '../../services/UserService'

export default function CreateUser(props) {

    const { register, handleSubmit } = useForm();
    const onSubmit = (data, e) => {
        data.company_id = props.company_id;
        createUser(data).then(response => {
            props.userCreated();
            e.target.reset();
        });
    };

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12 mrgntop">
                <h2>Users</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='row'>
                        <div className='col '>
                            <div className="row mrgntop">
                                <label htmlFor="firstname">First</label>
                                <input {...register("firstname")} placeholder="First Name" className="form-control" name="firstname" id="firstname" required/>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="row mrgntl">
                                    <label htmlFor="lastname">Last</label>
                                    <input {...register("lastname")} placeholder="Last Name" className="form-control" name="lastname" id="lastname" />
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className="row mrgntop">
                                <label htmlFor="email">Email</label>
                                <input {...register("email")} placeholder="Email Address" className="form-control" name="email" id="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required/>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="row mrgntl">
                                    <label htmlFor="designation">Designation</label>
                                    <input {...register("designation")} placeholder="Designation" className="form-control" name="designation" id="designation" />
                            </div>
                        </div>
                    </div>
                    <input type="submit" className="btn btn-danger mrgntop" value="Create" />
                </form>
                </div>
            </div>
        </div>
    )
}