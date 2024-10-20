const userreducer = (state = {},action)=>{
    switch(action.type){
        case 'USER_LOGIN':
            return {...state,isAuthenticated:action.payload.isauth,userid:action.payload.id};
        default:
            return state;
    }
}

export default userreducer;