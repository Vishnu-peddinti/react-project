import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Baseline, Heading } from "./headandfoo";

function Coachsignup(){
    const navigate = useNavigate();
    let initialData = {
        name: '',
        password: '',
        dob: '',
        gender:'',
        mobilenumber:'',
        speciality:''
    };
    const [coachdata,setCoachData] = useState(initialData);
    const [errormessage,setErrorMessage] = useState(initialData);
    const [successmessage,setSuccessMessage] = useState(false);
    const [coachid,setCoachId] = useState(null);
    const handlechange = (event)=>{
        let {name,value} = event.target;
        setCoachData({...coachdata,[name]:value});
        let error = validateFeild(name,value,coachdata);
        setErrorMessage({...errormessage,[name]:error});
    }

    const submithandler = async(event)=>{
        event.preventDefault();
        const newformerrors = {};
        Object.keys(coachdata).forEach((key)=>{
            newformerrors[key] = validateFeild(key,coachdata[key],coachdata);
        });
        setErrorMessage(newformerrors);
        if(Object.values(newformerrors).some((error)=>error)){
            return;
        }

        await axios.post("http://localhost:8000/coaches",coachdata).then((response)=>{setCoachId(response.data.id);setSuccessMessage(true);}).catch((err)=>{console.log(err);});
        setCoachData(initialData);
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
            case 'speciality':
                if(value.trim() === ''){
                    return 'Speciality is required';
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
                <img src="https://www.holychildfaridabad.com/images/father.png" style={{width:'200px'}} className="card-img-top mb-3" alt="..."/>
                <h1 style={{textAlign:'center'}}>You are a coach now!</h1>
                <h3 style={{textAlign:'center'}}>Your coach id is {coachid}</h3>
                <button className="btn btn-primary" onClick={()=>{navigate('/coachlogin')}}>Login</button>
                </div>}
        {!successmessage &&
            <div className="container mt-3 bg-dark d-flex flex-column justify-content-center" style={{color:'white'}}>
                <div className="d-flex flex-row align-items-center justify-content-center">
                <img src="https://www.holychildfaridabad.com/images/father.png" style={{width:'100px'}} className="card-img-top mb-3" alt="..."/>
                <h3>Life coach profile</h3>
                </div>
                <form onSubmit={submithandler}>
                <div className="row">
                    <div className="form-group col-md-6">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name" name="name" value={coachdata.name} onChange={handlechange} placeholder="Enter your name"/>
                        {errormessage.name && <div className="text-danger">{errormessage.name}</div>}
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" name="password" value={coachdata.password} onChange={handlechange} placeholder="Enter your password"/>
                        {errormessage.password && <div className="text-danger">{errormessage.password}</div>}
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="Date of birth">dob</label>
                        <input type="date" className="form-control" id="dob" name="dob" value={coachdata.dob} onChange={handlechange} placeholder="Enter your birth date"/>
                        {errormessage.dob && <div className="text-danger">{errormessage.dob}</div>}
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="Gender">Gender</label>
                        <div className="form-row">
                        <input type="radio" id="male" name="gender" value='male' checked={coachdata.gender==='male'} onChange={handlechange}/>
                        <label htmlFor = "gender">Male</label> &nbsp;
                
                        <input type="radio" id="female" name="gender" value='female' checked={coachdata.gender==='female'} onChange={handlechange}/>
                        <label htmlFor = "gender">Female</label> &nbsp;
                        </div>
                        {errormessage.gender && <div className="text-danger">{errormessage.gender}</div>}
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="mobilenumber">Mobile number</label>
                        <input type="number" className="form-control" id="mobilenumber" name="mobilenumber" value={coachdata.mobilenumber} onChange={handlechange} placeholder="Enter your mobile number"/>
                        {errormessage.mobilenumber && <div className="text-danger">{errormessage.mobilenumber}</div>}
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="speciality">Speciality</label>
                        <input type="text" className="form-control" id="speciality" name="speciality" value={coachdata.speciality} onChange={handlechange} placeholder="Enter your speciality"/>
                        {errormessage.speciality && <div className="text-danger">{errormessage.speciality}</div>}
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

export default Coachsignup;