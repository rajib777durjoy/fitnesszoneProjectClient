
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const instance = axios.create({
    baseURL:`http://localhost:9000`
})
const useAxios = () => {
    const navigetes=useNavigate()
    const {userlogout}=useAuth()
    instance.interceptors.request.use(function(config){
        const token= localStorage.getItem('access-token')
        console.log('request by insteref',token)
        config.headers.authorization = `Bearer ${token}`;
    return config;
   },function(error){
    return Promise.reject(error)
   });


   instance.interceptors.response.use(function(response){
    return response;
   },async(error)=>{
    console.log('status error',error.status)
    const status= error.status;
    if(status === 401 || status === 403){
           await userlogout()
           navigetes('/login')
    }
    return Promise.reject(error);
   })
    return instance
};

export default useAxios;