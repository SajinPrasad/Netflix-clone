import React, { useMemo, useReducer, useState } from "react";

const initialState = {count: 0}
function counterFunction (state, action) {
    // console.log(state, action)
    switch (action.type) {
        case 'increment':
          return { count: state.count + 1 };
        case 'decrement':
          return { count: state.count - 1 };
        default:
          return state;
      }
}
const SquareNumber = () => {
    const [count, despatch] = useReducer(counterFunction, initialState)
    

    return (
        <div>
            <h3>{count.count}</h3>
            <button onClick={() => {despatch({type:'increment'})}}>increment</button>
            <button onClick={() => {despatch({type:'decrement'})}}>decrement</button>
        </div>
    )
}

export default SquareNumber