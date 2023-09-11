import { FETCH_USERS_FAILED, FETCH_USERS_SUCC, FETCH_USERS_START } from "./actionTypes";

//action creator

export function getAllUser(dispatch){
    const apiUrl="https://jsonplaceholder.typicode.com/users"
    dispatch(fetchUserStart());
    fetch(apiUrl)
    .then(response=>response.json())
    .then(data=>{
        dispatch(fetchUserSucc(data));
    })
    .catch(error=>{
        dispatch(fetchUserFailed(error));
    });
}

export const getAllUserAsync= async(dispatch)=>{
    const apiUrl="https://jsonplaceholder.typicode.com/users"
    dispatch(fetchUserStart());
    let response=await fetch(apiUrl);
    if (response.status){
        dispatch(fetchUserSucc(response.data));
    }else {
        dispatch(fetchUserFailed(response.errorMessage));
    }       
   
}
export const fetchUserStart=()=>({
    type: FETCH_USERS_START
})

export const fetchUserSucc=(data)=>({
type:FETCH_USERS_SUCC,
payload:data
})

export const fetchUserFailed=(errorMessage)=>({
    type:FETCH_USERS_FAILED,
    payload:errorMessage
})