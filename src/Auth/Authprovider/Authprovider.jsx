
import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../../firebase/firebase.config';
import usePublickAxios from '../../hook/usePublickAxios';
import Swal from 'sweetalert2';
export const AuthContext = createContext(null)
const Authprovider = ({ children }) => {
  const [loading, setloading] = useState(true)
  const [user, setuser] = useState(null)
  const axiospublick = usePublickAxios()
  const provider = new GoogleAuthProvider();

  /// user Ragister
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }
  /// user login
  const userlogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }
  /// userlogout
  const userlogout = () => {
    return signOut(auth)
  }
  /// ToDo: facebook login ///
  const SocialLogin = () => {
    return signInWithPopup(auth, provider)
  }
  console.log('userldfsd',user)
  useEffect(() => {
    const unSubcribe = onAuthStateChanged(auth, (currentUser) => {
     
      if (currentUser) {
        setuser(currentUser)
        setloading(false)
        const userinfo = { email: currentUser.email }
        axiospublick.post('/jwt', userinfo).then(res => {
          if (res.data.token) {
            localStorage.setItem('access-token', res.data.token) 
          }
        })
      }
      else {
        localStorage.removeItem('access-token')
      }
    })
    return () => {
      unSubcribe()
    }
  }, [])
  const info = {
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