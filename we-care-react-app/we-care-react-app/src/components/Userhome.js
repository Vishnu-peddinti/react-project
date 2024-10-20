import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { userlogin } from "../actions/action";
import axios from "axios";
import { Link, Route, Routes, useNavigate, useParams, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Baseline } from "./headandfoo";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Userhome(){
    const navigate = useNavigate();
    var userId = useSelector(state=>state.userreducer.userid);
    const dispatch = useDispatch();
    return (
        <>
        <nav className="navbar navbar-dark bg-dark">
            <h1 style={{color:"white",cursor:'pointer'}}>we care</h1>
            <div className="d-flex justify-content-end">
                <Link to={`userprofile/${userId}`} className='navbar-brand'>Profile</Link>
                <Link to="userappointment" className='navbar-brand'>Appointments</Link>
                <p style={{alignContent:"right"}} className='navbar-brand'>Call Us: 080 113 4434</p>
                <Link className='navbar-brand' onClick={(e)=>{
                    e.preventDefault();
                    dispatch(userlogin(false,null));
                    navigate("/userlogin");
                }}>Logout</Link>
            </div>
        </nav>
        <Routes>
            <Route path="userprofile/:userId" element={<Userprofile/>}/>
            <Route path="/" element={<Coachesinfo/>}/>
            <Route path="userappointment" element={<UserSchedules/>}/>
            <Route path="userappointment/rescheduleappointment/:bookingId" element={<RescheduleAppointment/>}/>
            <Route path="bookappointment/:coachId" element={<Bookappointment/>}/>
        </Routes>
        <Baseline/>
        </>
    )
}

function Userprofile(){
    const params = useParams();
    console.log("this is : "+params.userId);
    const [userdata,setUserData] = useState({});
    useEffect(()=>{
        axios.get('http://localhost:8000/users/'+params.userId).then((res)=>{
        setUserData(res.data);
    }).catch((err)=>console.log(err));
    },[]);

    console.log(userdata);
    return (
    <>
        <div className="container d-flex justify-content-center align-items-center bg-dark mt-5" style={{color:'white'}}>
            <div className="rounded-circle bg-light d-flex align-items-center justify-content-center" style={{width: '200px', height: '200px', overflow:'hidden', margin: '1rem'}}>
                <img src="https://www.holychildfaridabad.com/images/boy.png" alt="coach" style={{width:'100%', height: '100%', objectFit: 'cover', objectPosition: 'center bottom'}}/>
            </div>
            <div className="d-flex flex-column justify-content-center" style={{margin: '1rem'}}>
                <h3>{userdata.name}</h3>
                <p>User Id : {userdata.id}</p>
                <p>Date Of Birth : {userdata.dob}</p>
                <p>Email Id : {userdata.email}</p>
                <p>Mobile Number : {userdata.mobilenumber}</p>
                <p>Address : {userdata.city},{userdata.state},{userdata.country}</p>
            </div>
        </div>
    </>
);
}

function Coachesinfo(){
    const [coaches,setCoaches] = useState([]);
    const [speciality,setSpeciality] = useState('');
    const [filteredcoaches,setFilteredCoaches] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        axios.get('http://localhost:8000/coaches').then((res)=>{
            setCoaches(res.data);
        }).catch((err)=>console.log(err));
    },[]);

    useEffect(()=>{
        if(speciality === ''){
            setFilteredCoaches(coaches);
        }
        else{
            setFilteredCoaches(coaches.filter((x)=>x.speciality.toLowerCase().includes(speciality.toLowerCase())));
        }
    },[speciality,coaches]);
    
    return(
        <>
        <input type="text" className="form-control mt-5" placeholder="Search for a speciality..." value={speciality} onChange={(e)=>{setSpeciality(e.target.value)}} style={{width:'50%',margin:'auto',border:'1px solid black'}}/>
        <div className="row d-flex align-items-center justify-content-center">
            {filteredcoaches.map((coach)=>{
                return(
                    <div className="col-6">
            <div className="container d-flex justify-content-center align-items-center bg-dark mt-5 rounded" style={{color:'white',width:'30rem'}}>
            <div className="rounded-circle bg-light d-flex align-items-center justify-content-center" style={{width: '150px', height: '150px', overflow:'hidden', margin: '1rem'}}>
                <img src="https://www.holychildfaridabad.com/images/father.png" alt="coach" style={{width:'100%', height: '100%', objectFit: 'cover', objectPosition: 'center bottom'}}/>
            </div>
            <div className="d-flex flex-column justify-content-center" style={{margin: '1rem'}}>
                <h3>{coach.name}</h3>
                <p style={{margin:'0'}}>Coach Id : {coach.id}</p>
                <p style={{margin:'0'}}>Mobile Number : {coach.mobilenumber}</p>
                <p style={{margin:'0'}}>Speciality : {coach.speciality}</p> <br/>
                <button className="btn btn-info" style={{width:'100%'}} onClick={(e)=>{
                    e.preventDefault();
                    navigate(`bookappointment/${coach.id}`);
                }}>Book Appointment</button>
            </div>
        </div>
        </div>
                )})};
        </div>
        </>
    )
}

function UserSchedules(){
    const userId = useSelector(state=>state.userreducer.userid);
    const [schedules,setSchedules] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [bookingid,setBookingId] = useState(0);
    const navigate = useNavigate();

    const cancelappointment = ()=>{
        axios.delete('http://localhost:8000/bookings/'+bookingid).then((res)=>{
            setShow(false);
            axios.get('http://localhost:8000/bookings/?userId='+userId).then((res)=>{setSchedules(res.data);}).catch((err)=>console.log(err));
        }).catch((err)=>console.log(err));
    
    }

    useEffect(()=>{
        console.log('user id is : '+userId);
        axios.get('http://localhost:8000/bookings/?userId='+userId).then((res)=>{
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
        <>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to cancel this appointment ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={cancelappointment}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
        <div className="container mt-3">
            <div className="row d-flex align-items-center justify-content-center">
                {schedules.map((schedule)=>{
                    return(
                        <div className="col-4 mt-3">
                            <div className="card bg-dark" style={{width: '18rem',color:'white'}}>
                                <div className="card-body text-center">
                                    <h5 className="card-title">Appointment</h5>
                                    <p className="card-text" style={{marginBottom: '0'}}>Date: {schedule.appointmentDate}</p>
                                    <p className="card-text" style={{marginBottom: '0'}}>Time: {schedule.slot}</p>
                                    <p className="card-text" style={{marginBottom: '0'}}>Booking Id: {schedule.id}</p>
                                    <p className="card-text" style={{marginBottom: '0'}}>user Id: {schedule.userId}</p>
                                    <p className="card-text" style={{marginBottom: '0'}}>Coach Id: {schedule.coachId}</p><br/>
                                    <button className="btn btn-info" style={{width:'100%'}} onClick={(e)=>{
                                        e.preventDefault();
                                        navigate(`rescheduleappointment/${schedule.id}`);
                                    }}>Reschedule Appointment</button>
                                    <button className="btn btn-danger mt-3" style={{width:'100%'}} onClick={()=>{setBookingId(schedule.id);setShow(true);}}>Cancel Appointment</button>
                                </div>
                            </div>
                        </div>
                    )})}
            </div>
        </div>
        </>
    )
    }
}

function calculateDaysDifference(date){
        const currentDate = new Date();
        const specificDate = new Date(date);
        
        const differenceInTime = currentDate.getTime() - specificDate.getTime();
        
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);
        
        return Math.abs(Math.round(differenceInDays));
    }

function Bookappointment(){
    const params = useParams();
    const userid = useSelector(state=>state.userreducer.userid);
    const [data,setData] = useState({appointmentDate:'',slot:'',userId:userid,coachId:params.coachId});
    const[errors,setErrors] = useState({appointmentDate:'',slot:''});
    const [success,setSuccess] = useState(false);

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(data.appointmentDate === ''){
            setErrors({...errors,appointmentDate:'Please select a date'});
            return;
        }
        else if(calculateDaysDifference(data.appointmentDate) > 7 || calculateDaysDifference(data.appointmentDate) < 0){
            setErrors({...errors,appointmentDate:'Please select in upcoming 7 days'});
            return;
        }
        else{
            setErrors({...errors,appointmentDate:''});
        }
        if(data.slot === ''){
            setErrors({...errors,slot:'Please select a slot'});
            return;
        }
        else{
            setErrors({...errors,slot:''});
        }
        axios.post('http://localhost:8000/bookings',data).then((res)=>{
            setSuccess(true);
        }).catch((err)=>console.log(err));
    }

    if(success){
        return(
            <div className="container mt-5 bg-dark d-flex align-items-center justify-content-center rounded" style={{color:'white',width:'40rem',height:'18rem'}}>
                <h3 className="text-center">Appointment Booked Successfully</h3>
            </div>
        )
    }
    else{
    return (
        <div className="container mt-5 bg-dark" style={{color:'white',width:'40rem'}}>
            <h2 className="text-center">Proceed with your appointment</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label for="date">Date of Appointment</label>
                    <input type="date" className="form-control" id="date" value={data.appointmentDate} onChange={(e)=>{setData({...data,appointmentDate:e.target.value})}}/>
                    {errors.appointmentDate && <div className="text-danger">{errors.appointmentDate}</div>}
                </div>
                <div className="form-group">
                    <label for="slot">Slot</label>
                    <select className="form-control" id="slot" value={data.slot} onChange={(e)=>{setData({...data,slot:e.target.value})}}>
                        <option value="">Select a slot</option>
                        <option value="9AM to 10AM">9AM to 10AM</option>
                        <option value="10AM to 11AM">10AM to 11AM</option>
                        <option value="11AM to 12PM">11AM to 12PM</option>
                        <option value="PM to 3PM">2PM to 3PM</option>
                        <option value="3PM to 4PM">3PM to 4PM</option>
                        <option value="4PM to 5PM">4PM to 5PM</option>
                    </select>
                    {errors.slot && <div className="text-danger">{errors.slot}</div>}
                </div>
                <button type="submit" className="btn btn-info mt-3 mb-3" style={{width:'100%'}}>Book Appointment</button>
                </form>
        </div>
    )
    }
}

function RescheduleAppointment(){
    const params = useParams();
    console.log(params.bookingId);
    const [data,setData] = useState({appointmentDate:'',slot:''});
    const[errors,setErrors] = useState({appointmentDate:'',slot:''});
    const [success,setSuccess] = useState(false);

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(data.appointmentDate === ''){
            setErrors({...errors,appointmentDate:'Please select a date'});
            return;
        }
        else if(calculateDaysDifference(data.appointmentDate) > 7 || calculateDaysDifference(data.appointmentDate) < 0){
            setErrors({...errors,appointmentDate:'Please select in upcoming 7 days'});
            return;
        }
        else{
            setErrors({...errors,appointmentDate:''});
        }
        if(data.slot === ''){
            setErrors({...errors,slot:'Please select a slot'});
            return;
        }
        else{
            setErrors({...errors,slot:''});
        }
        axios.patch(`http://localhost:8000/bookings/${params.bookingId}`,data).then((res)=>{
            setSuccess(true);
        }).catch((err)=>{console.log(err);console.log(data)});
    }

    if(success){
        return(
            <div className="container mt-5 bg-dark d-flex align-items-center justify-content-center rounded" style={{color:'white',width:'40rem',height:'18rem'}}>
                <h3 className="text-center">Appointment Rescheduled Successfully</h3>
            </div>
        )
    }
    else{
    return (
        <div className="container mt-5 bg-dark" style={{color:'white',width:'40rem'}}>
            <h2 className="text-center">Reschedule your appointment</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label for="date">Date of Appointment</label>
                    <input type="date" className="form-control" id="date" value={data.appointmentDate} onChange={(e)=>{setData({...data,appointmentDate:e.target.value})}}/>
                    {errors.appointmentDate && <div className="text-danger">{errors.appointmentDate}</div>}
                </div>
                <div className="form-group">
                    <label for="slot">Slot</label>
                    <select className="form-control" id="slot" value={data.slot} onChange={(e)=>{setData({...data,slot:e.target.value})}}>
                        <option value="">Select a slot</option>
                        <option value="9AM to 10AM">9AM to 10AM</option>
                        <option value="10AM to 11AM">10AM to 11AM</option>
                        <option value="11AM to 12PM">11AM to 12PM</option>
                        <option value="PM to 3PM">2PM to 3PM</option>
                        <option value="3PM to 4PM">3PM to 4PM</option>
                        <option value="4PM to 5PM">4PM to 5PM</option>
                    </select>
                    {errors.slot && <div className="text-danger">{errors.slot}</div>}
                </div>
                <button type="submit" className="btn btn-info mt-3 mb-3" style={{width:'100%'}}>Reschedule Appointment</button>
                </form>
        </div>
    )
    }
}

export {Userhome,Userprofile,UserSchedules,Coachesinfo,Bookappointment,RescheduleAppointment};
