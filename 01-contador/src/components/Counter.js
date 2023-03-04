// importamos los hoos useSelector y useDispatch desde react-redux
import { useSelector, useDispatch } from "react-redux";
// Ahora importemos nuestros actions
import { sumar, restar, incrementarPorNumero, reset } from "../features/counterSlice";
// Ahora vamos a importar el useState de react, para poder elegir el numero por el que queremos incrementar
import { useState } from "react";

const Counter = () => {

    // ahora pongamos nuestro estado al componente, poniendo el hook useSelector, pasamos el state
    // y luego con una funcion anonima pasamos el state.counter.count haciendo referencia al name conuter
    // dentro del reducer, y el count que es el estado inicial, que esta en 0
    const count = useSelector((state) => state.counter.count)

    // Ahora creemos el dispathc que se hace
    const dispatch = useDispatch();
    
    // Ahora creemos un estado temporal para poder elegir el numero por el cual queremos incrementar el contador
    const [incrementarNumero, setIncrementarNumero] = useState(0);
    
    // Ahora vamos a convertir el valor a numero y si no es un numero lo vamos a volver a poner a 0
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
