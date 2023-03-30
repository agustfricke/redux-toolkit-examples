// Impotamos
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// IMprtamos lo que acabamos de crear
import { setCredentials, logOut } from '../../features/auth/authSlice'

// creamos el baseQuery que es como un axios basicamente 
const baseQuery = fetchBaseQuery({
    // Ruta basica
    baseUrl: 'http://127.0.0.1:8000',
    // eso va a mandar nuestra http only cookie 
    credentials: 'include',
    // descrucuramos el getSttae
    prepareHeaders: (headers, { getState }) => {
        // definimos el token porque queremos mandar unestro acces token 
        // llamamos el getState
        const token = getState().auth.token
        // Si hay token ponemos la autorizacion header que viene del backend, 
        // Y mandamos el token
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        // retornamos lso headers
        // basicamente estamos poniendo este accesstooken a nuestro header cada vez que hagamos un request
        return headers
    }
})

// aqora ceemos el baseQueryWithReauth para poder tener el refresh token 
const baseQueryWithReauth = async (args, api, extraOptions) => {
    // definimoa el result
    let result = await baseQuery(args, api, extraOptions)
    // Si el http status es 403 proibido vamos a mandar el refresh token  para obtener un nuevo access token
       if (result?.error?.originalStatus === 403) {
        console.log('sending refresh token')
        // send refresh token to get new access token 
        const refreshResult = await baseQuery('auth/token/refresh/', api, extraOptions)
        console.log(refreshResult)
           // ponemos el user que deberia estar en nuestro estado 
        if (refreshResult?.data) {
            const user = api.getState().auth.user
            // guardamos el nuevo token 
            api.dispatch(setCredentials({ ...refreshResult.data, user }))
            // ponemos el nuevo access token en el baseQuery 
            result = await baseQuery(args, api, extraOptions)
        } else {
            // Despachamos el logout si no tenemos el nuevo access token
            api.dispatch(logOut())
        }
    }
    // Retornamos el result si todos va bien
    return result
}

// cremao y exportamos el apiSlice
export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})
