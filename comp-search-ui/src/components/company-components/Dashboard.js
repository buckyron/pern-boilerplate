import React from 'react';

export const Dashboard = ({handleSubmit, register, onSubmit, companyDetails}) => {
    return (
        <div className="container">
        <div className="row">
            <div className="col-md-12 mrgntop">
            <h2>Dashboard</h2>
                <div className='row'>
                    <div className='col-md-6'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row p-3 mrgntop">
                                <label htmlFor="exampleInputEmail1">Company</label>
                                <input {...register("company_name")} placeholder="Create a Company" defaultValue={companyDetails.company_name} className="form-control" name="company_name" id="company_name" />
                            </div>
                            <div className="row p-3 mrgntop">
                                    <label htmlFor="exampleInputPassword1">Address</label>
                                    <input {...register("address")} placeholder="Address" defaultValue={companyDetails.address} className="form-control" name="address" id="address" />
                            </div>   
                            <input type="submit" className="btn btn-danger mrgntop" value="Update" />                         
                        </form>
                    </div>
                    <div className='col-md-6'>
                        <img src={`http://127.0.0.1:3070/map/${companyDetails.company_id}.png`} alt="Map" width="500" height="300"/ >
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

