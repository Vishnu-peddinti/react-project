import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Baseline, Heading } from "./headandfoo";

function Usersignup(){
    const navigate = useNavigate();
    let initialData = {
        name: '',
        password: '',
        mobilenumber:'',
        email:'',
        dob: '',
        gender:'',
        pincode:'',
        city:'',
        state:'',
        country:''
    };
    const [userdata,setUserData] = useState(initialData);
    const [errormessage,setErrorMessage] = useState(initialData);
    const [successmessage,setSuccessMessage] = useState(false);
    const [userid,setUserId] = useState(null);
    const handlechange = (event)=>{
        let {name,value} = event.target;
        setUserData({...userdata,[name]:value});
        let error = validateFeild(name,value,userdata);
        setErrorMessage({...errormessage,[name]:error});
    }

    const submithandler = async(event)=>{
        event.preventDefault();
        const newformerrors = {};
        Object.keys(userdata).forEach((key)=>{
            newformerrors[key] = validateFeild(key,userdata[key],userdata);
        });
        setErrorMessage(newformerrors);
        if(Object.values(newformerrors).some((error)=>error)){
            return;
        }

        await axios.post("http://localhost:8000/users",userdata).then((response)=>{setUserId(response.data.id);setSuccessMessage(true);}).catch((err)=>{console.log(err);});
        setUserData(initialData);
        setErrorMessage(initialData);

    }

    const validateFeild = (name, value, data)=>{
        switch(name){
            case 'name':
                if(value.trim() === ''){
                    return 'Name is required';
                }
                if(value.length < 3){
                    return 'Name must be atleast 3 characters long';
                }
                if(value.length > 50){
                    return 'Name must be not greater than 50 characters long';
                }
                return '';
            case 'password':
                if(value.trim() === ''){
                    return 'Password is required';
                }
                if(value.length < 5){
                    return 'Password must be atleast 5 characters long';
                }
                if(value.length > 10){
                    return 'Password must be not greater than 10 characters long';
                }
                return '';
            case 'dob':
                if(value.trim() === ''){
                    return 'Date of Birth is required';
                }
                if(calculateAge(value) < 18){
                    return 'Age must be atleast 18 years';
                }
                if(calculateAge(value) > 100){
                    return 'Age must be less than 100 years';
                }
                return '';
            case 'gender':
                if(!value){
                    return 'gender must not be empty';
                }
                return '';
            case 'mobilenumber':
                if(value.trim() === ''){
                    return 'Mobile number is required';
                }
                if(value.length !== 10){
                    return 'Mobile number must be of 10 digits';
                }
                return '';
            case 'email':
                if(value.trim() === ''){
                    return 'Email is required';
                }
                return '';
            case 'pincode':
                if(value.trim() === ''){
                    return 'Pincode is required';
                }
                if(value.length !== 6){
                    return 'Pincode must be of 6 digits';
                }
                return '';
            case 'city':
                if(value.trim() === ''){
                    return 'City is required';
                }
                if(value.length < 6 || value.length > 20){
                    return 'City must be between 6 to 20 characters long';
                }
                return '';
                case 'state':
                    if(value.trim() === ''){
                        return 'State is required';
                    }
                    if(value.length < 6 || value.length > 20){
                        return 'State must be between 6 to 20 characters long';
                    }
                    return '';
                    case 'country':
                        if(value.trim() === ''){
                            return 'Country is required';
                        }
                        if(value.length < 6 || value.length > 20){
                            return 'Country must be between 6 to 20 characters long';
                        }
                        return '';
        }
    }

    function calculateAge(dob) {
        const dobDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - dobDate.getFullYear();
        const monthDifference = today.getMonth() - dobDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dobDate.getDate())) {
            age--;
        }
        return age;
    }

    return(
        <>
        <Heading/>
        {successmessage &&
           <div className="d-flex flex-column align-items-center justify-content-center vh-80">
                <img src="https://www.holychildfaridabad.com/images/boy.png" style={{width:'200px'}} className="card-img-top mb-3" alt="..."/>
                <h1 style={{textAlign:'center'}}>You are a user now!</h1>
                <h3 style={{textAlign:'center'}}>Your user id is {userid}</h3>
                <button className="btn btn-primary" onClick={()=>{navigate('/userlogin')}}>Login</button>
                </div>}
        {!successmessage &&
            <div className="container mt-3 mb-5 bg-dark d-flex flex-column justify-content-center" style={{color:'white'}}>
                <div className="d-flex flex-row align-items-center justify-content-center">
                <img src="https://www.holychildfaridabad.com/images/boy.png" style={{width:'100px'}} className="card-img-top mb-3" alt="..."/>
                <h3>User profile</h3>
                </div>
                <form onSubmit={submithandler}>
                <div className="row">
                    <div className="form-group col-md-6">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name" name="name" value={userdata.name} onChange={handlechange} placeholder="Enter your name"/>
                        {errormessage.name && <div className="text-danger">{errormessage.name}</div>}
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" name="password" value={userdata.password} onChange={handlechange} placeholder="Enter your password"/>
                        {errormessage.password && <div className="text-danger">{errormessage.password}</div>}
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="mobilenumber">Mobile number</label>
                        <input type="number" className="form-control" id="mobilenumber" name="mobilenumber" value={userdata.mobilenumber} onChange={handlechange} placeholder="Enter your mobile number"/>
                        {errormessage.mobilenumber && <div className="text-danger">{errormessage.mobilenumber}</div>}
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="mobilenumber">Email</label>
                        <input type="email" className="form-control" id="email" name="email" value={userdata.email} onChange={handlechange} placeholder="Enter your email"/>
                        {errormessage.email && <div className="text-danger">{errormessage.email}</div>}
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="Date of birth">dob</label>
                        <input type="date" className="form-control" id="dob" name="dob" value={userdata.dob} onChange={handlechange} placeholder="Enter your birth date"/>
                        {errormessage.dob && <div className="text-danger">{errormessage.dob}</div>}
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="Gender">Gender</label>
                        <div className="form-row">
                        <input type="radio" id="male" name="gender" value='male' checked={userdata.gender==='male'} onChange={handlechange}/>
                        <label htmlFor = "gender">Male</label> &nbsp;
                
                        <input type="radio" id="female" name="gender" value='female' checked={userdata.gender==='female'} onChange={handlechange}/>
                        <label htmlFor = "gender">Female</label> &nbsp;
                        </div>
                        {errormessage.gender && <div className="text-danger">{errormessage.gender}</div>}
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="speciality">pincode</label>
                        <input type="number" className="form-control" id="pincode" name="pincode" value={userdata.pincode} onChange={handlechange} placeholder="Enter your pincode"/>
                        {errormessage.pincode && <div className="text-danger">{errormessage.pincode}</div>}
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="city">city</label>
                        <input type="text" className="form-control" id="city" name="city" value={userdata.city} onChange={handlechange} placeholder="Enter your city"/>
                        {errormessage.city && <div className="text-danger">{errormessage.city}</div>}
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="state">state</label>
                        <input type="text" className="form-control" id="state" name="state" value={userdata.state} onChange={handlechange} placeholder="Enter your state"/>
                        {errormessage.state && <div className="text-danger">{errormessage.state}</div>}
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="country">country</label>
                        <input type="text" className="form-control" id="country" name="country" value={userdata.country} onChange={handlechange} placeholder="Enter your country"/>
                        {errormessage.country && <div className="text-danger">{errormessage.country}</div>}
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-success mt-3 mb-3">Register</button>
                </div>
            </form>
                        
            </div>
        }
        <Baseline/>
        </>
    )
}

export default Usersignup;