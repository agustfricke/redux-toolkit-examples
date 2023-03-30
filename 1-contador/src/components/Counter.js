import { useSelector, useDispatch } from "react-redux";
import { sumar, restar, incrementarPorNumero, reset } from "../features/counterSlice";
import { useState } from "react";

const Counter = () => {

    const count = useSelector((state) => state.counter.count)

    const dispatch = useDispatch();
    
    const [incrementarNumero, setIncrementarNumero] = useState(0);
    
    const addValue = Number (incrementarNumero) || 0;

    const resetNumero = () => {
        setIncrementarNumero(0);
        dispatch(reset());
    }

    return (
        <div>
            <p> { count} </p>
            <button onClick={() => dispatch(sumar())}> + </button>
            <button onClick={() => dispatch(restar())}> - </button>
            <button onClick={resetNumero}> RESET </button>
            <input type='text' value={incrementarNumero} onChange={(e) => setIncrementarNumero(e.target.value)}/>
            <button onClick={() => dispatch(incrementarPorNumero(addValue))}>AGREGAR VALOR</button>
        </div>
    )
}
export default Counter;
