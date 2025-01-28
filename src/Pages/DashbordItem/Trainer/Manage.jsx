import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxios from '../../../hook/useAxios';
import useAuth from '../../../hook/useAuth';
import { Table } from "flowbite-react";
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
const Manage = () => {
  const axiosSecure = useAxios()
  const { user } = useAuth()

  const { data: allSlots = [],refetch } = useQuery({
    queryKey: ['slots'],
    queryFn: async () => {
      const res = await axiosSecure(`/allslot/${user?.email}`)
      return res.data;
    }
  })
  console.log(allSlots)
  const handelDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/slotDelete/${_id}`)
          .then(res => {
            if (res.data.deletedCount){
              refetch()
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          })
      }
    });

  }

  //   {
  //     "_id": "6798e63215326740d3f20fd7",
  //     "bookId": "6798d68417298b23a6085b32",
  //     "name": "akij",
  //     "slot": "morning",
  //     "useremail": "apple@gmail.com",
  //     "Classes": "Barre",
  //     "trainerEmail": "akij@gmail.com",
  //     "date": "2025-01-28T14:14:10.061Z"
  // }
  return (
    <div>
      <Table >
        <Table.Head>
          <Table.HeadCell>Slot</Table.HeadCell>
          <Table.HeadCell>UserName</Table.HeadCell>
          <Table.HeadCell>UserEmail</Table.HeadCell>
          <Table.HeadCell>Icon</Table.HeadCell>

        </Table.Head>
        <Table.Body className="divide-y">
          {
            allSlots?.map(item => <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">

              <Table.Cell className='text-black'>{item?.slot}</Table.Cell>
              <Table.Cell>{item?.userName}</Table.Cell>
              <Table.Cell>{item?.useremail}</Table.Cell>
              <Table.Cell onClick={() => handelDelete(item?._id)}><MdDelete className='text-2xl' /></Table.Cell>

            </Table.Row>)
          }

        </Table.Body>
      </Table>
    </div>
  );
};

export default Manage;