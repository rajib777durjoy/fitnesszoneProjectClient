import { Button, Card } from 'flowbite-react';
import React from 'react';
import BeATrainer from './BeATrainer/BeATrainer';
import useAxios from '../../hook/useAxios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

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
    return (
        <div className='w-[100%] min-h-screen '>
            <div className='w-[90%] mx-auto translate-y-20'>
                <div className='grid grid-cols-3 gap-2'>
                    {
                        trainers.map(trainer=><Card className="max-w-sm" imgSrc={trainer.image} horizontal>
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                               {trainer.name}
                            </h5>
                             <h2>{trainer.email}</h2>
                             <h1>{trainer.available}</h1>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                            </p>
                            <Link to={`/tainerDetails/${trainer?._id}`}><Button>Know more</Button></Link>
                        </Card>)
                    }
                </div>
                <div>
                    <BeATrainer></BeATrainer>
                </div>
            </div>

        </div>
    );
};

export default AllTrainer;