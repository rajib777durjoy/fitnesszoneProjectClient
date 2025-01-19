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
             
                    {/* {
                        trainers?.map(trainer=><Card
                            className="min-h-[400px]"
                            imgAlt="Meaningful alt text for an image that is not purely decorative"
                            imgSrc={trainer?.image}
                          >
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                               {trainer.name}
                            </h5>
                             <h2>{trainer.email}</h2>
                             <h1>{trainer.age}</h1>
                             <h1>{trainer.experience}</h1>
                             <h1>{
                                trainer?.Available_time?.map(time=><div>{time}</div>)
                                }</h1>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                            </p>
                            <Link to={`/tainerDetails/${trainer?._id}`}><Button>Know more</Button></Link>
                        </Card>)
                    } */}
                    {
                        trainers?.map(trainer=><Card className="max-w-sm">
                            <div className="flex flex-col items-center pb-10">
                              {/* <Image
                                alt="Bonnie image"
                                height="96"
                                src="/images/people/profile-picture-3.jpg"
                                width="96"
                                className="mb-3 rounded-full shadow-lg"
                              /> */}
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