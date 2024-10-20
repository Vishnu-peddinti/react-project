import axios from "axios"

const coachlogin = (isAuthenticated,coachid)=>{
    return {
        type: 'COACH_LOGIN',
       payload:  {
            'isauth': isAuthenticated,
            'id' : coachid
        }
    }
}

const userlogin = (isAuthenticated,userid)=>{
    return {
        type: 'USER_LOGIN',
        payload: {
            'isauth': isAuthenticated,
            'id': userid
        }
    }
}

const coachvalidator = (coachdata)=>{
    return dispatch=>{
        axios.get('http://localhost:8000/coaches/'+coachdata.id).then((response)=>{
            var coach = response.data;
            if(coach && coachdata.password === coach.password){
                dispatch(coachlogin(true,coachdata.id));
            }
            else{
                dispatch(coachlogin(false,null));
            }
        }).catch((err)=>{
            console.log(err);
        });
    }
}

const  uservalidator = (userdata)=>{
    return dispatch=>{
        axios.get('http://localhost:8000/users/'+userdata.id).then((response)=>{
            var user = response.data;
            if(user && userdata.password === user.password){
                dispatch(userlogin(true,userdata.id));
            }
            else{
                dispatch(userlogin(false));
            }
        }).catch((err)=>{
            console.log(err);
        });
    }
}


export {coachlogin,userlogin,coachvalidator,uservalidator}