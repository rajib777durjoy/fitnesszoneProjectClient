
import React, { createContext, useEffect, useState} from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import { auth } from '../../firebase/firebase.config';
import useAxios from '../../hook/useAxios';
export const AuthContext= createContext(null)
const Authprovider = ({children}) => {
  const [loading,setloading]=useState(true)
  const [user,setuser]=useState(null)
  const axiosSecure=useAxios()
  const provider = new GoogleAuthProvider();
    
  /// user Ragister
    const createUser=(email,password)=>{
      return  createUserWithEmailAndPassword(auth,email,password)
    }
    /// user login
    const userlogin=(email,password)=>{
      return signInWithEmailAndPassword(auth,email,password)
    }
    /// userlogout
    const userlogout=()=>{
      return signOut(auth)
    }
    /// ToDo: facebook login ///
    const SocialLogin=()=>{
        return signInWithPopup(auth,provider)
    }
    useEffect(()=>{
      const unSubcribe=onAuthStateChanged(auth,async(currentUser)=>{
        setuser(currentUser)
        setloading(false)
        if(currentUser.email){
          const res= await axiosSecure.post('/jwt',currentUser.email);
          console.log(res.data.token)
          localStorage.setItem('access-token',res.data.token)
        }
      })
      return ()=>{
        unSubcribe()
      }
    },[])
    const info={
      createUser,
      userlogin,
      userlogout,
      loading,
      user,
      SocialLogin

    }
    return (
      <AuthContext.Provider value={info}>
        {children}
      </AuthContext.Provider>
    );
};

export default Authprovider;