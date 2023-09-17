import React, {useState,useEffect} from 'react'
import { useForm } from "react-hook-form";
import { useLocation } from 'react-router-dom';
import { editUser, getUsersById } from '../../services/UserService';

export const UserProfile = () => {
    const location = useLocation();
    const [user_id, setUser_id] = useState(location.state.id);
    const [userProfile, setUserProfile] = useState([]);
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        getUsersById(user_id).then(user => {
            console.log(user)
            setUserProfile(user);
            console.log(UserProfile)
            // setTabSwitch(!tabSwitch);
        });
    },  [user_id] )
    
    const onSubmit = (data, e) => {
        data.user_id = user_id;
        editUser(data.user_id, data).then(response => {
            // alert("User Edited")
        });
    }
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12 mrgntop">
                <h2>Profile</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className='row'>
                        <div className='col'>
                            <div className="row mrgntop">
                                <label htmlFor="user_id">User Id</label>
                                <input placeholder="User Id" defaultValue={userProfile.user_id} className="form-control" name="user_id" id="user_id"  disabled/>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="row mrgntl">
                                    <label htmlFor="company_id">Company Id</label>
                                    <input {...register("company_id")} placeholder="Company Id" defaultValue={userProfile.company_id} className="form-control" name="company_id" id="company_id" />
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col '>
                            <div className="row mrgntop">
                                <label htmlFor="firstname">First name</label>
                                <input {...register("firstname")} placeholder="First Name" defaultValue={userProfile.firstname} className="form-control" name="firstname" id="firstname" required/>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="row mrgntl">
                                    <label htmlFor="lastname">Last name</label>
                                    <input {...register("lastname")} placeholder="Last Name" defaultValue={userProfile.lastname} className="form-control" name="lastname" id="lastname" />
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className="row mrgntop">
                                <label htmlFor="email">Email</label>
                                <input {...register("email")} placeholder="Email Address" defaultValue={userProfile.email} className="form-control" name="email" id="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required/>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="row mrgntl">
                                    <label htmlFor="designation">Designation</label>
                                    <input {...register("designation")} placeholder="Designation" defaultValue={userProfile.designation} className="form-control" name="designation" id="designation" />
                            </div>
                        </div>
                    </div>
                    
                    <input type="submit" className="btn btn-danger mrgntop" value="Update" />
                </form>
                </div>
            </div>
        </div>
    )
}
