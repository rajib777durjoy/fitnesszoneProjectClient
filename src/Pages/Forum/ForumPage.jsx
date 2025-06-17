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
    const axiosPublic = usePublickAxios()

    const { data: forumpage = [], refetch, isPending } = useQuery({
        queryKey: ['page', Selectbtn],
        queryFn: async () => {
            const res = await axiosPublic(`/allforum?page=${Selectbtn}&size=${itemsPerPage}`)
            console.log(res.data)
            return res.data
        }
    })
    if (isPending) {
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
    const handelUnlike = async (id) => {
        console.log(id)
        if (user?.email) {
            const email = { email: user.email }
            const res = await axiosPublic.patch(`/voteDown/${id}`, email)
            console.log(res.data)
            if (res.data.modifiedCount > 0) {
                refetch()
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Vote (-1)",
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

    const { _id, title, details, image, CreatorEmail, badge } = forumpage || {}
    console.log(forumpage)
    return (
        <div>
            <Helmet>
                <title>FitnessZone-Dashboard | Forum page</title>
            </Helmet>
            <div className=" w-[100%] min-h-screen mx-auto mt-4">
                <div className='w-[100%] h-[70px]'></div>
                <div className='w-[90%] mx-auto border grid md:grid-cols-2 gap-4'>
                    {
                        forumpage.map(item => <div className='mb-10 py-5 w-[100%]  mx-auto bg-slate-400 rounded-lg ' key={item?._id}>
                            <div className='flex items-center'>
                                <div className='w-[30%] ms-4'>
                                    <img className='w-[100%] h-[200px] rounded-md' src={item?.image} alt="" />
                                </div>
                                <div className='ms-4'>
                                    <h1>Title:{item?.title}</h1>
                                     <span>{item?.CreatorEmail}</span>
                                  
                                </div>
                            </div>
                            <p className='ms-4 my-2'>{item?.details}</p>
                             <div className='flex justify-between mt-4 w-[90%] mx-auto'>
                                    <button onClick={() => handelLike(item?._id)}><AiFillLike className='text-2xl' /></button>
                                    <button onClick={() => handelUnlike(item?._id)}><AiFillDislike className='text-2xl' /></button>
                                </div>
                            {/* <div className='flex justify-between gap-10 my-4 px-10'>
                                <div>
                                    {title}
                                </div>
                                <img src={image} alt="" />
                                <div>
                                    {details}
                                </div>
                               
                            </div> */}

                        </div>)
                    }
                </div>
            </div>
            <div className='w-[80%] md:w-[50%] mx-auto lg:translate-x-32 h-[100px] my-2'>
                <button className="text-white border px-4 py-2 rounded-lg font-medium bg-teal-600 hover:bg-teal-400" onClick={() => setSelectbtn(Selectbtn > 0 ? Selectbtn - 1 : Selectbtn)}>Previous</button>
                {
                    pages.map(page => <button onClick={() => setSelectbtn(page)} className={`text-white border px-4 py-2 mx-2 my-4 rounded-lg ${Selectbtn === page && 'bg-teal-600' || 'bg-slate-300'}`}>{page}</button>)
                }
                <button className="text-white border px-4 py-2 rounded-lg font-medium  bg-teal-600 hover:bg-teal-400" onClick={() => setSelectbtn(Selectbtn < pages.length - 1 ? Selectbtn + 1 : Selectbtn)}>Next</button>
            </div>
        </div>
    );
};

export default ForumPage;