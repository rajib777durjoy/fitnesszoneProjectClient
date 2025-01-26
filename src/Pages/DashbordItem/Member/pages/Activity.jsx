import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Button, Spinner, Table } from 'flowbite-react';
import { Helmet } from 'react-helmet-async';
import { FaEye } from 'react-icons/fa';
import { IoIosEyeOff } from 'react-icons/io';
import useAxios from '../../../../hook/useAxios';
import { Modal } from "flowbite-react";
import { useState } from "react";
const Activity = () => {
    const axiosSecure = useAxios()
    const [openModal, setOpenModal] = useState(false);
    const [feedback,setfeedback]=useState([])
    const { data: ActivityData = [], isPending } = useQuery({
        queryKey: ['activity'],
        queryFn: async () => {
            const res = await axiosSecure('/activity')
            return res.data;
        }
    })
    console.log('activityData', ActivityData)
    
    const { data: rejectedData = [] } = useQuery({
        queryKey: ['rejected'],
        queryFn: async () => {
            const res = await axiosSecure('/rejected')
            return res.data;
        }
    })
    if (isPending) {
        return <div className="text-center translate-y-40"><Spinner aria-label="Large spinner example" size="lg" /></div>
    }
    console.log('rejected', rejectedData)
    const handelIcon=async(_id)=>{
     const res= await axiosSecure(`/feedback/${_id}`)
    //    console.log('feedback',res.data)
       setfeedback(res.data)
      console.log(_id)
      setOpenModal(true)
    }
    console.log('feedback',feedback)
    const {_id,email,feedback:message}= feedback || {}
    return (
        <div className="overflow-x-auto">
            <Helmet>
                <title>FitnessZone-Dashboard|Activity_Log_Page</title>
            </Helmet>
            {
                ActivityData &&

                <Table>
                    <Table.Head>
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>Email</Table.HeadCell>
                        <Table.HeadCell>Status</Table.HeadCell>
                        <Table.HeadCell>Icon</Table.HeadCell>

                    </Table.Head>
                    <Table.Body className="divide-y">
                        {
                            ActivityData?.map((item, index) => <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">

                                <Table.Cell>{item?.name}</Table.Cell>
                                <Table.Cell>{item?.email}</Table.Cell>
                                <Table.Cell>{item?.status}</Table.Cell>
                                <Table.Cell><IoIosEyeOff className='text-2xl' /></Table.Cell>
                            </Table.Row>)
                        }
                        {
                            rejectedData?.map((item => <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">

                                <Table.Cell>{item?.name}</Table.Cell>
                                <Table.Cell>{item?.email}</Table.Cell>
                                <Table.Cell>{item?.status}</Table.Cell>
                                <Table.Cell onClick={() => handelIcon(item?._id)}><FaEye className='text-2xl' /></Table.Cell>
                            </Table.Row>))
                        }

                    </Table.Body>
                </Table>
            }
            {/* <Button onClick={() => setOpenModal(true)}>Toggle modal</Button> */}
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Rejection Feedback</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                           {message}
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setOpenModal(false)}>Close</Button>
                    
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Activity;