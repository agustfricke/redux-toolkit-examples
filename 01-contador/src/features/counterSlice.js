// Okey los slice son diferentes funcionalidades de nuestra aplicacion, donde vamos a ir separando el estado
// de redux en muchos slices, donde por ejemplo un slice podria ser la logica de los ususarios en nuestra aplicacion
// Y luego por ejemmplo otro slice podria ser un para las publicaciones, donde manejariamos la logica de cada uno 
// de manera diferente.

// Vamos a comenzar importando el create Slice desde reduxjs/toolkit
import { createSlice } from "@reduxjs/toolkit";

// Ahora lo siguiente seria crear un initialState, donde como vamos a crear un contador, queremos que este comienze en 0
const initialState = {
    count: 0
}

// Ahora creemos el counterSlice
export const counterSlice = createSlice({
    // Donde tenemos un objecto dentro
    // Comienza con un name
    name: 'counter',
    // Luego el siguiente parametro es el initialState
    initialState,
    // Luego vamos a tener los reducers
    reducers: {
        // Aqui vamos a tener todos los diferentes actions asi que creemos algunos
        // Vamos a tener para sumar, donde vamos a tener una funcion anonima que recibe el estado
        sumar: (state) => {
            // Y aqui dentro vamos a tener el state.count que definimos arriba en nuestro initialState
            // Y vamos a agrear 1 al estado inicial
            state.count += 1
        },
        // Ahora creemos uno para restar
        restar: (state) => {
           state.count -= 1 
        },
        // ##### 2 - Ahora agreemos mas funcionalidades a nuestra app
        reset: (state) => {
            state.count = 0;
        },
        // Incrementar por monto va a recibir no solo en state sino tambien action
        incrementarPorNumero: (state,action) => {
            // El action.payload es el numero por el que queremos incrementar el contador
            state.count += action.payload
        }
    }
})
// Una vez hecho esto vamos a exportar nuestro nuevo reducer y nuestros actions de sumar y restar
// Vamos a destructurar los actions de la siguiente manera
export const { sumar, restar, reset, incrementarPorNumero } = counterSlice.actions;
// Ahora exportemos el reducer y lo imprtemos en el store
export default counterSlice.reducer;
