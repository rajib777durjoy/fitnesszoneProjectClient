
import { useQuery } from "@tanstack/react-query";
import { Table } from "flowbite-react";
import useAxios from "../../../hook/useAxios";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const AllTrainerList = () => {
    const axiosSecure=useAxios()
    const {data:trainerList=[],refetch}=useQuery({
        queryKey:['trainer'],
        queryFn:async()=>{
         const res= await axiosSecure('/alltrainerlist')
         return res.data
        }
    })
    console.log('trainerlist',trainerList)
    const handelChangerole=async(id)=>{
      console.log(id)
     const res= await axiosSecure.delete(`/trainerRoleChange/${id}`)
      console.log(res.data)
      if(res.data.deletedCount>0){
         refetch()
         Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          });
      }
    }
    return (
        <div className="overflow-x-auto">
            {trainerList &&
            <Table>
                <Table.Head>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
                    <Table.HeadCell>Status</Table.HeadCell>
                    <Table.HeadCell>Role</Table.HeadCell>
                    <Table.HeadCell>Delete</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {
                        trainerList?.map(item=><Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {item?.name}
                            </Table.Cell>
                            <Table.Cell>{item?.email}</Table.Cell>
                            <Table.Cell>{item?.status}</Table.Cell>
                            <Table.Cell>{item?.role}</Table.Cell>
                            <Table.Cell onClick={()=>handelChangerole(item?._id)}><MdDelete className="text-2xl" /></Table.Cell>
                            
                        </Table.Row>)
                    }
                    
                   
                </Table.Body>
            </Table>
}
        </div>
    );
};

export default AllTrainerList;