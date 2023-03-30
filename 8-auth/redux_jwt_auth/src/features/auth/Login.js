import {  useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const [login, { isLoading }] = useLoginMutation()
    const dispatch = useDispatch()


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const userData = await login({ username, password }).unwrap()
            dispatch(setCredentials({ ...userData, username }))
            setUsername('')
            setPassword('')
            navigate('/welcome')
        } catch (err) {
            console.error(err)
        }
    }

    const handleUserInput = (e) => setUsername(e.target.value)

    const handlePwdInput = (e) => setPassword(e.target.value)

    const content = isLoading ? <h1>Loading...</h1> : (

        <section className="login">

            <h1>Login Redux Toolkit</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='Username'
                    value={username}
                    onChange={handleUserInput}
                    required
                />

                <input
                    type="password"
                    placeholder='Password'
                    onChange={handlePwdInput}
                    value={password}
                    required
                />
                <button>Sign In</button>
            </form>
        </section>
    )

    return content
}
export default Login
