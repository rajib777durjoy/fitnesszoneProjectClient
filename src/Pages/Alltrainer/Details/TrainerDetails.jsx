import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import usePublickAxios from '../../../hook/usePublickAxios';
import { useQuery } from '@tanstack/react-query';
import { Card } from 'flowbite-react';
import BeATrainer from '../BeATrainer/BeATrainer';

import { Helmet } from 'react-helmet-async';
import useAuth from '../../../hook/useAuth';
const TrainerDetails = () => {
    const { id } = useParams()
    const {user}=useAuth()
    const navigate = useNavigate()
    const axiosPublic = usePublickAxios()
    const { data: trainer = [] } = useQuery({
        queryKey: ['trainer', id],
        queryFn: async () => {
            const res = await axiosPublic(`/trainerDetails/${id}`)
            console.log(res.data)
            return res.data
        }
    })
    const { _id, name, email, socialIcon, image, age, skills, available_days_a_week, Available_time, experience, description,hours } = trainer || {}
    const handelSlot = async (slot) => {
        const trainerInfo = {
            bookId: _id,
            name: name,
            slot: slot,
            useremail:user?.email,
            Classes: skills,
            date: new Date()
        }
        const res = await axiosPublic.post(`/slot`, trainerInfo)
        console.log(res.data)

        if (res.data?.insertedId) {
            const id = res.data.insertedId;
            navigate(`/trainerBookPage/${id}`)
        }
    }


    console.log(trainer)

    return (
        <div className='min-h-screen border-0'>
            <Helmet>
                <title>FitnessZone-TrainerDetails</title>
            </Helmet>
            <div className='w-[100%] h-[70px]'></div>
            <h1 className='text-white text-center'>Trainer Information Section</h1>
            <div className='w-[100%] flex flex-col'>
             
                <Card className="max-w-xl mx-auto">
                    <div className="flex flex-col items-center pb-10">
                        <img
                            alt="Bonnie image"
                            height="96"
                            src={image}
                            width="96"
                            className="mb-3 rounded-full shadow-lg"
                        />
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Name:{name}</h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400"> Email:{email}</span>
                        <div className='grid grid-cols-3 gap-1'>
                        <h1>Age:{age}</h1>
                        <h1>Experience:{experience}</h1>
                        <h1>ClassDuration:{hours}</h1>
                        </div>
                        <div>
                        <div className='flex'>SocialLink:{socialIcon?.map(item => <li className='list-none mx-1'>{item}</li>)}</div>
                        </div>
                            <div className='grid '>
                                <h1 className='grid grid-cols-4'>Skills:{skills?.map(i => <li className='list-none mx-1'>{i}</li>)}</h1>
                            </div>
                            <div>
                            Available_days_a_week:
                            <div className='grid grid-cols-4'>{available_days_a_week?.map(item =><li className='list-none mx-1 text-xs font-medium border-2 p-1'>{item}</li>)}</div>
                            </div>
                            <div className=''>
                                Description:{description}
                            </div>
                    </div>
                </Card>

                <div className='w-[60%] mx-auto mt-10 border-2'>
                    <h1 className='text-white text-4xl font-extrabold text-center'>Available slots</h1>
                    <div className='grid grid-cols-3 my-4'>
                        {Available_time?.map(item => <button onClick={() => handelSlot(item)} className='text-white w-[40%] mx-auto border-2
                         border-teal-200 bg-teal-950 my-2  text-center capitalize hover:bg-slate-700'>{item}</button>)}
                    </div>
                </div>

            </div>
            <div className='my-10 rounded-lg'>
                <BeATrainer></BeATrainer>
            </div>
        </div>
    );
};

export default TrainerDetails;