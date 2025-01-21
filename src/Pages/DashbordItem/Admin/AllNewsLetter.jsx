import React from 'react';

import { Table } from "flowbite-react";
import useAxios from '../../../hook/useAxios';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hook/useAuth';

const AllNewsLetter = () => {
    const {user}=useAuth()
    const axiosSecure=useAxios()
    const {data:news=[]}=useQuery({
        queryKey:['news',user?.email],
        queryFn:async()=>{
            const res= await axiosSecure(`/allnewsletter/${user?.email}`)
            return res.data;
        }
    })
    console.log('ngjhgjg',news)
    const {name,email,role}= news|| {}
    return (
        <div className='w-[100%]'>
            <h1 className='text-white font-extrabold text-4xl text-center my-2'>All Newsletter Subscribers</h1>
            <div className="overflow-x-auto mt-10 w-[90%] mx-auto">
                <Table>
                    <Table.Head>
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>Email</Table.HeadCell>
                        <Table.HeadCell>Role</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {
                            news.map(item=><Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell>{item?.name}</Table.Cell>
                                <Table.Cell>{item?.email}</Table.Cell>
                                <Table.Cell>{item?.role}</Table.Cell>
                            </Table.Row>)
                        }
                        
                        
                    </Table.Body>
                </Table>
            </div>
        </div>
    );
};

export default AllNewsLetter;