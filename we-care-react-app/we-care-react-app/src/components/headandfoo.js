import { Navigate, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
function Heading() {
    let navigate = useNavigate();
    return (
        <nav className="navbar navbar-dark bg-dark">
            <h1 className="cursor-pointer" style={{color:"white", cursor:'pointer'}} onClick={()=>{
                navigate('/Home');
            }}>we care</h1>
            <p style={{alignContent:"right"}} className='navbar-brand'>Call Us: 080 113 4434</p>
        </nav>
    )
}

function Baseline(){
    return (
        <footer className="bg-dark text-center text-lg-start mt-5" style={{color:'white',position:'fixed',bottom:'0',width:'100%'}}>
            <p style={{textAlign:'center'}}>CopyRight &copy; 2024 we care. All Rights Reserved.</p>
        </footer>
    )
}

export {Heading,Baseline};