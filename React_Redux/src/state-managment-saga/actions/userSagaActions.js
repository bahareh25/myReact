import { UsersFetchFailed,UsersFetchRequested,UsersFetchSucceeded} from "./actionTypes"

export const usersFetchRequested = () => ({
    type:UsersFetchRequested
})

export const usersFetchSucceeded = (data) => ({
    type:UsersFetchSucceeded,
    payload:data
})


export const usersFetchFailed = (errorMessage) => ({
    type:UsersFetchFailed,
    payload:errorMessage
})