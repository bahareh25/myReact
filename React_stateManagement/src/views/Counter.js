import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { increment,decrement } from "../state-management/actions/countAction";


export const Counter = () => {
    const counter=useSelector(state=>state.countstate);
    const dispatch=useDispatch();
  return (
    <div>
        <label>Counter value: {counter}</label>
    <br />
    <button onClick={() => dispatch(increment())}>+1</button>
    <button onClick={() => dispatch(decrement())}>-1</button>
    </div>
  )
}
