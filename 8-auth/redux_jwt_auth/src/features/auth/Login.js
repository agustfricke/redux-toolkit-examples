import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'

const Login = () => {
    const userRef = useRef()
    const errRef = useRef()
    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()

    // Ponemos la mutacion
    const [login, { isLoading }] = useLoginMutation()
    const dispatch = useDispatch()

    useEffect(() => {
        // Solo vamos a hacer esto apenas carge el componente
        userRef.current.focus()
    }, [])

    // Vamos a ver el estado que tenemos por el usuario y contranna y  si uno de esos cambia vamos a poner el setErrMsg
    // devulva a su estado inicial porque capaz que vieron un mensaje de error 
    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

    // Cremoa el handelSub
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            // vamos a gatillar el endpoint con el contenitdo de user y passworrd
            const userData = await login({ user, pwd }).unwrap()
            // Y vamos a poner las crendeciales
            dispatch(setCredentials({ ...userData, user }))
            // Volvemos todo a su estaado inical y los mandamos al welcome
            setUser('')
            setPwd('')
            navigate('/welcome')
        } catch (err) {
            if (!err?.originalStatus) {
                // isLoading: true until timeout occurs
                setErrMsg('No Server Response');
            } else if (err.originalStatus === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.originalStatus === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    // Para el input
    const handleUserInput = (e) => setUser(e.target.value)

    const handlePwdInput = (e) => setPwd(e.target.value)

    // Si esta cargando 
    const content = isLoading ? <h1>Loading...</h1> : (
        <section className="login">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

            <h1>Employee Login</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    value={user}
                    onChange={handleUserInput}
                    autoComplete="off"
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={handlePwdInput}
                    value={pwd}
                    required
                />
                <button>Sign In</button>
            </form>
        </section>
    )

    return content
}
export default Login
