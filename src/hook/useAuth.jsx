import React, { useContext } from 'react';
import { AuthContext } from '../Auth/Authprovider/Authprovider';


const useAuth = () => {
   const context = useContext(AuthContext)
   return context;
};

export default useAuth;