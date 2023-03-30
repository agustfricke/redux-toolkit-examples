import { Link, Outlet } from "react-router-dom"
import { logOut } from "../features/auth/authSlice"
import { useDispatch } from "react-redux"

const Layout = () => {
    const disptach = useDispatch()

    return (
      <>
        <Link to="/login">Login</Link>
        <button onClick={() => disptach(logOut())}>Logout</button>

        <Outlet />
      </>
    );
    
}

export default Layout