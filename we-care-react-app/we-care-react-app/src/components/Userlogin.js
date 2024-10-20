import React, { useEffect, useState } from "react";
import {useSelector,useDispatch} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import {uservalidator} from '../actions/action';
import {useNavigate} from 'react-router-dom';
import { Baseline, Heading } from "./headandfoo";

function Userlogin(){
    let initialData = {
        'id':'',
        'password':''
    }
    const [userdata,setUserData] = useState(initialData);
    const [errormessage,setErrorMessage] = useState(initialData);
    const [invalid,setInvalid] = useState(false);
    let isauth = useSelector(state=>state.userreducer.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handlechange = (event)=>{
        let {name,value} = event.target;
        setUserData({...userdata,[name]:value});
    }
    useEffect(()=>{
        if(isauth === true){
            navigate('/userdashboard');
        }
    },[isauth]);

    const handlesubmit = (event)=>{
        event.preventDefault();
        let newerrors = {...errormessage};
        Object.keys(userdata).forEach((key)=>{
            if(userdata[key].trim() === ''){
                newerrors[key] = `${key} is required`;
            }
            else if(key === 'password' && userdata[key].length < 5){
                newerrors[key] = `${key} must be atleast 5 characters long`;
            }
            else if(key === 'password' && userdata[key].length > 10){
                newerrors[key] = `${key} must be not greater than 10 characters long`;
            }
            else{
                newerrors[key] = '';
            }
            setErrorMessage(newerrors);
            if(Object.values(newerrors).some((error)=>error)){
                return;
            }
            else{
                dispatch(uservalidator(userdata));
                if(isauth === false){
                    setInvalid(true);
                }
            }
        });
    }
    return(
        <>
        <Heading/>
        <div className="container mt-5 bg-dark" style={{width:'20rem',color:'white'}}>
            <div className="d-flex flex-row align-items-center justify-content-center">
                <img src="https://www.holychildfaridabad.com/images/boy.png" style={{width:'100px'}} className="card-img-top mb-3" alt="..."/>
                <h3>User login</h3>
            </div>
            <form onSubmit={handlesubmit}>
                <div className="form-group">
                    <label htmlFor="name">User Id</label>
                    <input type="text" className="form-control" id="name" name="id" value={userdata.id} onChange={handlechange} placeholder="Enter your user id"/>
                    {errormessage.id && <div className="text-danger">{errormessage.id}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={userdata.password} onChange={handlechange} placeholder="Enter your password"/>
                    {errormessage.password && <div className="text-danger">{errormessage.password}</div>}
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-success mt-3 mb-3">Login</button>
                </div>
                {invalid && <div className="text-danger">Invalid userId and password</div>}
            </form>
        </div>
        <Baseline/>
        </>
    )
}

export default Userlogin;