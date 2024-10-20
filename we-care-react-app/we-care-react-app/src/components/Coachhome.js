import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Link, Route, Routes, useNavigate, useParams} from 'react-router-dom';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Baseline } from "./headandfoo";
import {coachlogin} from "../actions/action"

function Coachhome(){
    const navigate = useNavigate();
    var coachId = useSelector(state=>state.coachreducer.coachid);
    const dispatch = useDispatch();
    return (
        <>
        <nav className="navbar navbar-dark bg-dark">
            <h1 style={{color:"white",cursor:'pointer'}}>we care</h1>
            <div className="d-flex justify-content-end">
                <Link to={`coachprofile/${coachId}`} className='navbar-brand'>Profile</Link>
                <Link to="coachappointment" className='navbar-brand'>Appointments</Link>
                <p style={{alignContent:"right"}} className='navbar-brand'>Call Us: 080 113 4434</p>
                <Link className='navbar-brand' onClick={(e)=>{
                    e.preventDefault();
                    dispatch(coachlogin(false,null));
                    navigate("/coachlogin");
                }}>Logout</Link>
            </div>
        </nav>
        <Routes>
            <Route path="coachprofile/:coachId" element={<Coachprofile/>}/>
            <Route path="/" element={<CoachSchedules/>}/>
            <Route path="coachappointment" element={<CoachSchedules/>}/>
        </Routes>
        <Baseline/>
        </>
    )
}

function Coachprofile(){
    const params = useParams();
    console.log("this is : "+params.coachId);
    const [coachdata,setCoachData] = useState({});
    useEffect(()=>{
        axios.get('http://localhost:8000/coaches/'+params.coachId).then((res)=>{
        setCoachData(res.data);
    }).catch((err)=>console.log(err));
    },[]);

    console.log(coachdata);
    return (
    <>
        <div className="container d-flex justify-content-center align-items-center bg-dark mt-5" style={{color:'white'}}>
            <div className="rounded-circle bg-light d-flex align-items-center justify-content-center" style={{width: '200px', height: '200px', overflow:'hidden', margin: '1rem'}}>
                <img src="https://www.holychildfaridabad.com/images/father.png" alt="coach" style={{width:'100%', height: '100%', objectFit: 'cover', objectPosition: 'center bottom'}}/>
            </div>
            <div className="d-flex flex-column justify-content-center" style={{margin: '1rem'}}>
                <h3>{coachdata.name}</h3>
                <p>Coach Id : {coachdata.id}</p>
                <p>Date Of Birth : {coachdata.dob}</p>
                <p>Mobile Number : {coachdata.mobilenumber}</p>
                <p>Speciality: {coachdata.speciality}</p>
            </div>
        </div>
    </>
);
}

function CoachSchedules(){
    const coachId = useSelector(state=>state.coachreducer.coachid);
    const [schedules,setSchedules] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:8000/bookings/?coachId='+coachId).then((res)=>{
            setSchedules(res.data);
        }).catch((err)=>console.log(err));
    },[]);
    if(schedules.length === 0){
        return(
            <div className="container mt-5">
                <h2 className="text-center">No Appointments</h2>
            </div>
        )
    }
    else{
    return(
        <div className="container mt-5">
            <div className="row d-flex align-items-center justify-content-center">
                {schedules.map((schedule)=>{
                    return(
                        <div className="col-4">
                            <div className="card bg-dark" style={{width: '18rem',color:'white'}}>
                                <div className="card-body text-center">
                                    <h5 className="card-title">Appointment</h5>
                                    <p className="card-text">Date: {schedule.appointmentDate}</p>
                                    <p className="card-text">Time: {schedule.slot}</p>
                                    <p className="card-text">Booking Id: {schedule.id}</p>
                                    <p className="card-text">user Id: {schedule.userId}</p>
                                </div>
                            </div>
                        </div>
                    )})}
            </div>
        </div>
    )
    }
}

export {Coachhome,Coachprofile,CoachSchedules};
