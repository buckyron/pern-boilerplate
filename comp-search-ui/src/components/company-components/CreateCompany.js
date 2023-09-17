import React from 'react'
import { useForm } from "react-hook-form";
import { createCompany } from '../../services/CompanyService'

export default function CreateCompany(props) {

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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row mrgntop">
                        <label htmlFor="company">Company</label>
                        <input {...register("company_name")} placeholder="Create a Company" className="form-control" name="company_name" id="company_name" required/>
                    </div>
                    <div className="row mrgntop">
                            <label htmlFor="address">Address</label>
                            <input {...register("address")} placeholder="Address" className="form-control" name="address" id="address" required/>
                        </div>
                    <input type="submit" className="btn btn-danger mrgntop" value="Create" />
                </form>
                </div>
            </div>
        </div>
    )
}