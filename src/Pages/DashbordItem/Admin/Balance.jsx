import React, { useEffect, useState } from 'react';
import useAxios from '../../../hook/useAxios';

const Balance = () => {
    const axiosSecure=useAxios()
    const [balance,setbalance]=useState([])
    useEffect(()=>{
       axiosSecure.get('/allpayment')
       .then(res=>{
         setbalance(res.data)
       }) 
    },[])
    const totalbalance= balance.reduce((prev,current)=>prev + parseInt(current?.price),0)
    const langt= balance.length-5
    const slices=balance.slice(0,langt)
   
    // console.log(slices)
    console.log(totalbalance)
    return (
        <div className='text-white'>
            <h1 className='text-center text-4xl'>Balance Page</h1>
            <div className=' w-[90%] mx-auto flex justify-between'>
                <h1 className=''>Total Balance:{totalbalance}</h1>
                 <div></div>
            </div>
            
        </div>
    );
};

export default Balance;