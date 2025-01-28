import { useQuery } from '@tanstack/react-query';
import React from 'react';
import usePublickAxios from '../../../hook/usePublickAxios';
import { Link } from 'react-router-dom';

const ForumPost = () => {
    const axiosPublic = usePublickAxios()
    const { data: forum = [] } = useQuery({
        queryKey: ['forms'],
        queryFn: async () => {
            const res = await axiosPublic('/recentforum')
            return res.data;
        }
    })
    const slices = forum.slice(-6)
    console.log(slices)
    // {
    //     "_id": "67952d44bb96d6a9c44382bf",
    //     "title": " Monitor",
    //     "details": "Monitor your daily activities, calories burned, and workouts with our user-friendly fitness tracker",
    //     "image": "https://i.ibb.co.com/Hqvvz2m/Cardioworkout-Img.jpg",
    //     "Vote": 1,
    //     "votarEmail": "rajib777chanda@gmail.com"
    // }
    return (
        <div className='w-[80%] mx-auto my-4 text-white min-h-screen'>
            {
                slices?.map(item => <div className='mb-10 py-5 w-[100%] mx-auto bg-slate-400 rounded-lg ' key={item?._id}>
                    <Link to={`${item?.link}`} target="_blank"><h1 className='text-white my-4 ms-4 text-xl font-semibold'>Title:<span className=' mx-2 text-xl font-light'>{item?.title}</span></h1></Link>
                    <div className='w-[100%] my-2'>
                        <img src={item?.image} alt="" className='w-[100%] h-[300px]' />
                    </div>
                    <h3 className='text-white my-4 ms-4 text-xl font-semibold'>Details:<span className='text-xl font-light mx-2'>{item?.details}</span></h3>
                    <h1 className='ms-4 md:ms-2'>Vote:{item?.Vote}</h1>
                </div>)
            }
        </div>
    );
};

export default ForumPost;