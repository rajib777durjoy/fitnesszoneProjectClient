import React from 'react';
import useAuth from '../../hook/useAuth';
import { Navigate } from 'react-router-dom';
import { Spinner } from 'flowbite-react';

const PrivateRoute = ({children}) => {
    const {user,loading}=useAuth()
    if(loading){
        return <div className='text-center w-[20%] mx-auto'><Spinner aria-label="Default status example" /></div>
    }
    if(!user){
      return <Navigate to='/'></Navigate>
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default PrivateRoute;