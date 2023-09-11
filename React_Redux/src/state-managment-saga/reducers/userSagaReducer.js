import {UsersFetchRequested,
    UsersFetchSucceeded, 
    UsersFetchFailed } from "../actions/actionTypes";


    const initialState = {
        items: [],
        isLoading: true,
        message:''
      };

      function usersReducer(state=initialState,action){
        switch(action.type){
            case UsersFetchRequested:
                return {...state,isLoading:true};
            case UsersFetchSucceeded:
                return {isLoading:false,items:action.users};

            case UsersFetchFailed:
                return {isLoading:true,items:[],message:action.message};
            default:
                return state;
        }
      }

      export default usersReducer;