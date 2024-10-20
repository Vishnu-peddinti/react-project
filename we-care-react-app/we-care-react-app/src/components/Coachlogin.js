import React, { useEffect, useState } from "react";
import {useSelector,useDispatch} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import {coachvalidator} from '../actions/action';
import {useNavigate} from 'react-router-dom';
import { Baseline, Heading } from "./headandfoo";

function Coachlogin(){
    let initialData = {
        'id':'',
        'password':''
    }
    const [coachdata,setCoachData] = useState(initialData);
    const [errormessage,setErrorMessage] = useState(initialData);
    const [invalid,setInvalid] = useState(false);
    let isauth = useSelector(state=>state.coachreducer.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
        if(isauth === true){
            navigate('/coachdashboard');
        }
    },[isauth]);
    const handlechange = (event)=>{
        let {name,value} = event.target;
        setCoachData({...coachdata,[name]:value});
    }
    const handlesubmit = (event)=>{
        event.preventDefault();
        let newerrors = {...errormessage};
        Object.keys(coachdata).forEach((key)=>{
            if(coachdata[key].trim() === ''){
                newerrors[key] = `${key} is required`;
            }
            else if(key === 'password' && coachdata[key].length < 5){
                newerrors[key] = `${key} must be atleast 5 characters long`;
            }
            else if(key === 'password' && coachdata[key].length > 10){
                newerrors[key] = `${key} must be not greater than 10 characters long`;
            }
            else{
                newerrors[key] = '';
            }
            setErrorMessage(newerrors);
        });
            if(Object.values(newerrors).some((error)=>error)){
                return;
            }
            else{
                dispatch(coachvalidator(coachdata));
                if(isauth === false){
                    setInvalid(true);
                }
            }
    }
    return(
        <>
        <Heading/>
        <div className="container mt-5 bg-dark" style={{width:'20rem',color:'white'}}>
            <div className="d-flex flex-row align-items-center justify-content-center">
                <img src="https://www.holychildfaridabad.com/images/father.png" style={{width:'100px'}} className="card-img-top mb-3" alt="..."/>
                <h3>Coach login</h3>
            </div>
            <form onSubmit={handlesubmit}>
                <div className="form-group">
                    <label htmlFor="name">Coach Id</label>
                    <input type="text" className="form-control" id="name" name="id" value={coachdata.id} onChange={handlechange} placeholder="Enter your coach id"/>
                    {errormessage.id && <div className="text-danger">{errormessage.id}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={coachdata.password} onChange={handlechange} placeholder="Enter your password"/>
                    {errormessage.password && <div className="text-danger">{errormessage.password}</div>}
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-success mt-3 mb-3">Login</button>
                </div>
                {invalid && <div className="text-danger">Invalid coachId and password</div>}
            </form>
        </div>
        <Baseline/>
        </>
    )
}

export default Coachlogin;