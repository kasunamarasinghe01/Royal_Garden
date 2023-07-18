import useAuthContext from "../hooks/useAuthContext";
import {Navigate, Outlet} from 'react-router-dom';

const AuthRoute = ({roles}) => {

    const {auth} = useAuthContext();

    if(auth.isAuthenticated && auth.token && auth.user && auth.user?.role.find(r => roles.includes(r))) {
        return <Outlet />
    }

    if(auth.isAuthenticated && auth.token && auth.user && !auth.user?.role.find(r => roles.includes(r))) {
        return <Navigate to='/home' />
    }

    return <Navigate to='/login/user' />

}

export default AuthRoute;