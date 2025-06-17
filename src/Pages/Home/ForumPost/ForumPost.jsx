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
    return (
        <div className='w-[100%] mx-auto bg-slate-50 min-h-screen py-10'>
            <h1 className='text-center text-4xl font-bold mb-5'>Post</h1>
            <div className=' w-[90%] grid md:grid-cols-3 gap-2 mx-auto'>
            {
                slices?.map(item => <div className='mb-10  bg-slate-300 rounded-lg ' key={item?._id}>
                    <Link to={`${item?.link}`} target="_blank"><h1 className=' ms-4 text-xl font-semibold'><span className=' mx-2 text-xs lg:text-xl font-light'>{item?.title.slice(0,10)}</span></h1></Link>
                    <div className='w-[100%] my-2'>
                        <img src={item?.image} alt="" className='w-[100%] h-[300px]' />
                    </div>
                    <h3 className='t my-4 ms-4 text-xl font-medium'><span className='text-xs font-medium '>{item?.details.slice(0,100)}</span></h3>
                    <h1 className='ms-4 md:ms-4 text-xs my-2'>Vote:{item?.Vote}</h1>
                </div>)
            }
            </div>
            
        </div>
    );
};

export default ForumPost;