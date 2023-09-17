import React from 'react'
import { useForm } from "react-hook-form";
import { createCompany } from '../../services/CompanyService'

export default function CompanyDetails(props) {

    const { register, handleSubmit } = useForm();
    const onSubmit = (data, e) => {
        createCompany(data).then(response => {
            props.companyCreated();
            e.target.reset();
        });
    };

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12 mrgntop">
                <h2>Company List</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row p-3 mrgntop">
                        <label htmlFor="exampleInputEmail1">Company</label>
                        <input {...register("company_name")} placeholder="Create a Company" className="form-control" name="company_name" id="company_name" />
                    </div>
                    <div className="row p-3 mrgntop">
                            <label htmlFor="exampleInputPassword1">Address</label>
                            <input {...register("address")} placeholder="Address" className="form-control" name="address" id="address" />
                        </div>
                    <input type="submit" className="btn btn-danger mrgntop" />
                </form>
                </div>
            </div>
        </div>
    )
}