import {useContext} from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuthContext = () => {

    const {auth, dispatch, result} = useContext(AuthContext);

    return {auth, dispatch, result};
}

export default useAuthContext;