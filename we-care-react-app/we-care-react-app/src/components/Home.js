import react from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import {Heading,Baseline} from './headandfoo';
function Home(){
    let navigate = useNavigate();
    return (
        <>
        <Heading/>
        <div className="container mt-3" style={{textAlign:'center'}}>
            <h1>we are at the heart of appropriate care</h1>
            <div className="row mt-5 d-flex justify-content-center">
                <div className="col-md-4">
                    <div className="card bg-dark" style={{width: "18rem"}}>
                        <img src="https://www.holychildfaridabad.com/images/father.png" style={{width:'50%',display:'block',marginLeft:'auto',marginRight:'auto'}} className="card-img-top" alt="..."/>
                        <br/><br/>
                        <div className="card-body">
                            <button className="btn btn-primary" onClick={(e)=>{
                                e.preventDefault();
                                navigate('/coachlogin');
                            }}>Login as coach</button><br/><br/>
                            <button className='btn btn-primary' onClick={(e)=>{
                                e.preventDefault();
                                navigate('/coachsignup');
                            }}>Join as coach</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card bg-dark" style={{width: "18rem"}}>
                        <img src="https://www.holychildfaridabad.com/images/boy.png" style={{width:'50%',display:'block',marginLeft:'auto',marginRight:'auto'}} className="card-img-top" alt="..."/>
                        <br/><br/>
                        <div className="card-body">
                            <button className="btn btn-primary" onClick={(e)=>{
                                navigate('/userlogin');
                            }}>Login as user</button><br/><br/>
                            <button className='btn btn-primary' onClick={(e)=>{
                                navigate('/usersignup');
                            }}>Join as user</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Baseline/>
        </>
    )
}

export default Home;