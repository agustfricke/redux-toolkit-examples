// importamos el apoSlice
import { apiSlice } from "../../app/api/apiSlice";

// Exportamos el authApiSlice donde inyectamos los endpoit
export const authApiSlice = apiSlice.injectEndpoints({
    // Aqui defimos nuestros endpotins
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth',
                method: 'POST',
                body: { ...credentials }
            })
        }),
    })
})

// Exportamos
export const {
    useLoginMutation
} = authApiSlice
