import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Route, Routes, useLocation } from 'react-router-dom';
import { editCompany, getCompanyByID } from '../../services/CompanyService'
import DrawerNavigate from '../common-components/DrawerNavigate';
import UserList from '../user-components/UserList';
import { Dashboard } from './Dashboard';
import { UserProfile } from '../user-components/UserProfile';

export const CompanyDetails = (props) => {
    
    const [companyDetails, setCompanyDetails] = useState([]);
    const location = useLocation();
    const [edited, setEdited] = useState(location.state.edited);
    const [company_id, setCompany_id] = useState(location.state.id);

    // const company_id = location.state.id;

    useEffect(() => {
        getCompanyByID(company_id).then(company => {
            setCompanyDetails(company);
        });
    },  [company_id, edited] )


  
    const { register, handleSubmit } = useForm();
    const onSubmit = (data, e) => {
        const json_data = {}
        if(data.address !== ""){
            json_data.address = data.address;
        }
        if(data.company_name !== ""){
            json_data.company_name = data.company_name;
        }
        if(json_data !== {}){
            editCompany(companyDetails.company_id, json_data).then(response => {
                setEdited(response);;
            });
        }
        
    };

    return(
        <>
        <DrawerNavigate id={company_id} />
        <Routes>
            <Route path={`/dashboard`} element={ <Dashboard companyDetails={companyDetails} handleSubmit={handleSubmit} onSubmit={onSubmit} register={register} />} />
            <Route path={`/users`} element={ <UserList company_id={company_id} />} />
            <Route path={`/users/user`} element={<UserProfile />} />
        </Routes>
    
        </>
    )
}