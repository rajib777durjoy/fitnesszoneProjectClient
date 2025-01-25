import { Button, Card } from 'flowbite-react';
import React from 'react';
import useAxios from '../../hook/useAxios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// import Image from "next/image";

const AllTrainer = () => {
    const axiosSecure=useAxios();
   const {data:trainers=[],isLoading}=useQuery({
    queryKey:['trainer'],
    queryFn:async()=>{
        const res=await axiosSecure('/trainer');
        console.log(res.data)
        return res.data;
    }
   })
   console.log(trainers)
    return (
        <div className='w-[100%] min-h-screen bg-transparent '>
             <Helmet>
                <title>FitnessZone-AllTrainer</title>
            </Helmet>
            <div className='w-[90%] grid grid-cols-3 gap-2 h-auto mx-auto translate-y-20'>
                    {
                        trainers?.map(trainer=><Card className="max-w-sm">
                            <div className="flex flex-col items-center pb-10">
                              
                              <img src={trainer?.image} alt="" className='w-[100px] h-[100px] rounded-full' />
                              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{trainer.name}</h5>
                              <span className="text-sm text-gray-500 dark:text-gray-400">{trainer.email}</span>
                              <div className='flex justify-around gap-4'>
                              <h1>Age:{trainer.age}</h1>
                              <h1>Experience:{trainer.experience}</h1>
                              </div>
                              <h1 className='grid grid-cols-2 gap-2 capitalize'>{
                                trainer?.Available_time?.map(time=><div>{time}</div>)
                                }</h1>
                              <div className="mt-4 flex space-x-3 lg:mt-6">
                              <Link to={`/tainerDetails/${trainer?._id}`}><Button>Know more</Button></Link>
                               
                              </div>
                            </div>
                          </Card>)
                    }
                </div>
               
         

        </div>
    );
};

export default AllTrainer;