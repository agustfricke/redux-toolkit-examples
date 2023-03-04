// el store es un objecto de JavaScript inmutable que se va a encargar de manejar todo el estado de nuestra aplicacion
import { configureStore } from "@reduxjs/toolkit";
// Importamos el counterSLice
import counterReducer from "../features/counterSlice";

// Aqui vamos a exportar el store que va a ser igual a configureStore donde vamos a poner un objecto
// que va a tener un reducer, aqui van a ir todos los reducers de la aplicacion
// Ahora debemos ir al index y importar este store
export const store = configureStore ({
    reducer: {
        // Ponemos el reudcer dentro del store, y ahora esta disponible en toda nuestra aplicacion gracias al provider 
        // dentro de index.js
        counter: counterReducer, 
    }
})


