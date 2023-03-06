import { apiSlice } from "../../app/api/apiSlice"

//extendemos y exportamos

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
            // ponemos que el cahce se borre a los 5 seg
            keepUnusedDataFor: 5,
        })
    })
})

export const {
    useGetUsersQuery
} = usersApiSlice 
