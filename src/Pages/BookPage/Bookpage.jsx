import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../../hook/useAxios';

const Bookpage = () => {
    const {slot}=useParams()
    const axiosSecure=useAxios()
    console.log(slot)
    const {data:trainerInfo=[]}=useQuery({
        queryKey:['slot',slot],
        queryFn:async()=>{
        const res=await axiosSecure(`/trainerBook/${slot}`)
         console.log(res.data)
         return res.data
        }
    })
    return (
        <div>
            <div className='w-[100%] h-[70px]'></div>
           <h1 className='text-white '>hello world</h1>
        </div>
    );
};

export default Bookpage;