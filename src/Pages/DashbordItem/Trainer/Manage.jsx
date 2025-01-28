import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxios from '../../../hook/useAxios';
import useAuth from '../../../hook/useAuth';
import { Table } from "flowbite-react";
const Manage = () => {
    const axiosSecure=useAxios()
    const {user}=useAuth()
    const {data:allSlots=[]}=useQuery({
        queryKey:['slots'],
        queryFn:async()=>{
            const res= await axiosSecure(`/allslot/${user?.email}`)
            return res.data;
        }
    })
    console.log()
    return (
        <div>
        <Table>
        <Table.Head>
          <Table.HeadCell>Product name</Table.HeadCell>
          <Table.HeadCell>Color</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          
        </Table.Head>
        <Table.Body className="divide-y">
         <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
           
                <Table.Cell className='text-black'>{allSlots.length}</Table.Cell>
                <Table.Cell>Laptop</Table.Cell>
                <Table.Cell>$2999</Table.Cell>
              </Table.Row>
          
         
        </Table.Body>
      </Table>
        </div>
    );
};

export default Manage;