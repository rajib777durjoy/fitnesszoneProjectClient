import React from 'react';
import { useEffect, useState } from "react";
import { useLoaderData } from 'react-router-dom';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuth from '../../hook/useAuth';
import { Button, Spinner } from 'flowbite-react';
import usePublickAxios from '../../hook/usePublickAxios';
import { Helmet } from 'react-helmet-async';
const ForumPage = () => {
    const Data = useLoaderData()
    const { user } = useAuth()
    const [count, setcount] = useState(Data?.total);
    const [itemsPerPage, setitemsPerPage] = useState(6);
    const [Selectbtn, setSelectbtn] = useState(0);
    const numberOffPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOffPages).keys()];
    const axiosPublic= usePublickAxios()
   
    const { data: forumpage = [], refetch,isPending } = useQuery({
        queryKey: ['page', Selectbtn],
        queryFn: async () => {
            const res = await axiosPublic(`/allforum?page=${Selectbtn}&size=${itemsPerPage}`)
            console.log(res.data)
            return res.data
        }
    })
   if(isPending){
    return <div className="text-center translate-y-40"><Spinner aria-label="Large spinner example" size="lg" /></div>
   }
    const handelLike = async (id) => {
        if (user?.email) {
            const email = { email: user.email }
            const res = await axiosPublic.patch(`/voteUp/${id}`, email)
            // console.log(res.data)
            if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Vote 1",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            if (res.data.message) {
                Swal.fire({
                    position: "top-center",
                    icon: "error",
                    title: res.data.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    }
    const handelUnlike=async(id)=>{
          console.log(id)
          if(user?.email){
            const email={email:user.email}
            const res = await axiosPublic.patch(`/voteDown/${id}`,email)
            console.log(res.data)
            if(res.data.modifiedCount>0){
                refetch()
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Vote (-1)",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            if(res.data.message){
                Swal.fire({
                    position: "top-center",
                    icon: "error",
                    title: res.data.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
          }
          
    }

    const { _id, title, details, image,CreatorEmail} = forumpage || {}
    return (
        <div>
            <Helmet>
                <title>FitnessZone-Dashboard | Forum page</title>
            </Helmet>
            <div className=" w-[100%] min-h-screen mx-auto mt-4">
                <div className='w-[100%] h-[70px]'></div>
                <div className='w-[70%] mx-auto'>
                    {
                        forumpage.map(item => <div className='mb-10 py-5 w-[100%] mx-auto bg-slate-400 rounded-lg ' key={item?._id}>
                            <h1 className='text-white my-4 ms-4 text-xl font-semibold'>Title:<span className=' mx-2 text-xl font-light'>{item?.title}</span></h1>
                            <div className='w-[100%] my-2'>
                                <img src={item?.image} alt="" className='w-[100%] h-[300px]' />
                            </div>
                            <h3 className='text-white my-4 ms-4 text-xl font-semibold'>Details:<span className='text-xl font-light mx-2'>{item?.details}</span></h3>
                            <h1>Vote:{item?.Vote}</h1>
                            <div className='flex justify-between gap-10 my-4 px-10'>
                                <div className='flex gap-10'>
                                    <button onClick={() => handelLike(item?._id)}><AiFillLike className='text-2xl' /></button>
                                    <button onClick={() => handelUnlike(item?._id)}><AiFillDislike className='text-2xl' /></button>
                                </div>
                            </div>

                        </div>)
                    }
                </div>
            </div>
            <div className='w-[50%] mx-auto translate-x-32 h-[100px] my-2'>
                <button className="text-white border px-4 py-2 rounded-lg hover:bg-teal-500" onClick={() => setSelectbtn(Selectbtn > 0 ? Selectbtn - 1 : Selectbtn)}>Previous</button>
                {
                    pages.map(page => <button onClick={() => setSelectbtn(page)} className={`text-white border px-4 py-2 mx-2 my-4 rounded-lg ${Selectbtn === page && 'bg-teal-500' || ''}`}>{page}</button>)
                }
                <button className="text-white border px-4 py-2 rounded-lg hover:bg-teal-500" onClick={() => setSelectbtn(Selectbtn < pages.length - 1 ? Selectbtn + 1 : Selectbtn)}>Next</button>
            </div>
        </div>
    );
};

export default ForumPage;