import {createContext, useReducer, useState, useEffect} from 'react';
import axiosPublic from '../config/axios';
import Loader from "../components/Loader";
import HashLoader from "react-spinners/HashLoader";

const initialState = {
    isAuthenticated: false,
    user: null,
    token: localStorage.getItem('royal_garden_auth') ? localStorage.getItem('royal_garden_auth') : null
}

export const AuthContext = createContext(initialState);

const authReducer = (state, action) => {

    switch(action.type) {
        case 'LOGIN_SUCCESS':
            // save the token to local storage
            localStorage.setItem('royal_garden_auth', action.payload.token);
            return {...state, isAuthenticated: true, token: action.payload.token, user: action.payload.user};
        case 'LOGOUT_SUCCESS':
            // remove the token fron local storage
            localStorage.removeItem('royal_garden_auth');
            return {...state, isAuthenticated: false, token: null, user: null};    
        default:
            return;    
    }
}

const AuthContextProvider = ({children}) => {

    const [auth, dispatch] = useReducer(authReducer, initialState);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('royal_garden_auth') || null;
        if(token) {
            const validateToken = async () => {
                try {
                    const response = await axiosPublic.post('/auth/user', JSON.stringify({token: auth.token}));

                    console.log(response);
                    dispatch({
                        type: 'LOGIN_SUCCESS',
                        payload: response.data
                    })
                } catch (err) {
                    console.log(err);
                } finally {
                    setIsLoading(false);
                }
            }
            validateToken();
        } else {
            setIsLoading(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{auth, dispatch}} >
            {isLoading ? <HashLoader
            color='#000'
            loading={isLoading}
            css=""
            size={80}
            aria-label="Loading Spinner"
            data-testid="loader"
          /> : (children)}
        </AuthContext.Provider>
    );

}

export default AuthContextProvider;




