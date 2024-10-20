const coachreducer = (state ={},action)=>{
    switch(action.type){
        case 'COACH_LOGIN':
            return {...state,isAuthenticated:action.payload.isauth,coachid:action.payload.id};
        default:
            return state;
    }
}

export default coachreducer;