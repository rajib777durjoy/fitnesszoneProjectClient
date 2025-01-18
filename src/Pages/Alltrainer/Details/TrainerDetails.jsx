import React from 'react';
import { Link, useParams } from 'react-router-dom';
import usePublickAxios from '../../../hook/usePublickAxios';
import { useQuery } from '@tanstack/react-query';
import { Card } from 'flowbite-react';
import BeATrainer from '../BeATrainer/BeATrainer';
const TrainerDetails = () => {
    const { id } = useParams()
    const axiosPublic = usePublickAxios()
    const { data: trainer = [] } = useQuery({
        queryKey: ['trainer', id],
        queryFn: async () => {
            const res = await axiosPublic(`/trainerDetails/${id}`)
            console.log(res.data)
            return res.data
        }
    })
    // {
    //     "_id": "678b8dae7c5a4e3cfd170da6",
    //     "name": "rajibchando",
    //     "email": "durjoy2001chando@gmail.com",
    //     "image": "https://i.ibb.co.com/hdLfbpm/gratisography-augmented-reality-800x525.jpg",
    //     "age": "23",
    //     "skills": [
    //         "CoreFlow",
    //         "Flex&Stretch"
    //     ],
    //     "available_days_a_week": [
    //         "sun",
    //         "mon",
    //         "tue",
    //         "wed",
    //         "thu",
    //         "fri",
    //         "sat"
    //     ],
    //     "Available_time": [
    //         "morning",
    //         "noon",
    //         "afternoon",
    //         "evening",
    //         "night"
    //     ],
    //     "experience": "3",
    //     "description": "hello world",
    //     "status": "pending"
    // }

    console.log(trainer)
    const { name, email, image, age, skills, available_days_a_week, Available_time, experience, description } = trainer || {}
    return (
        <div className='min-h-screen border-2 border-rose-900'>
            <div className='w-[100%] h-[70px]'></div>
            <h1 className='text-white text-center'>Trainer Information Section</h1>
            <div className='w-[100%] flex flex-col'>
                <Card
                    className="w-[60%] mx-auto min-h-[400px]"
                    imgAlt="Meaningful alt text for an image that is not purely decorative"
                    imgSrc={image}
                >
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Name:{name}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Email:{email}
                    </p>
                    <div className='flex justify-between'>
                        <h1>Age:{age}</h1>
                        <h1 className='flex'>Skills:{skills?.map(i => <li className='list-none mx-1'>{i}</li>)}</h1>
                        <h1>Experience:{experience}</h1>
                    </div>
                    <div className='flex text-xl'>Available_days_a_week:{available_days_a_week?.map(item => <li className='list-none mx-1 text-lg font-medium border-2 p-1'>{item}</li>)}</div>
                    <div className=''>
                        Description:{description}
                    </div>
                </Card>

                <div className='w-[60%] mx-auto mt-10 border-2'>
                    <h1 className='text-white text-4xl font-extrabold text-center'>Available slots</h1>
                    <div>
                        {Available_time?.map(item => <Link to={`/trainerBookPage/${item}`}><li className='text-white w-[40%] mx-auto border-2
                         border-teal-200 bg-teal-950 my-2 list-none text-center capitalize hover:bg-slate-700'>{item}</li></Link>)}
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