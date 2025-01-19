import { Table } from 'flowbite-react';
import React from 'react';
import useAxios from '../../../hook/useAxios';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hook/useAuth';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// import { CiSquareRemove } from 'react-icons/ci';
// import { FaCheck } from 'react-icons/fa';

const AppliedTrainer = () => {
    const { user } = useAuth()
    const axiosSecure = useAxios()
    const { data: trainer = [] } = useQuery({
        queryKey: ['trainer', user?.email],
        queryFn: async () => {
            const res = await axiosSecure(`/appliedTrainer/${user?.email}`)
            return res.data;
        }
    })
    console.log(trainer)
    return (
        <div>
            <Helmet>
                <title>FitnessZone-Dashboard|AppliedTrainer</title>
            </Helmet>
            <h1 className='text-3xl text-white text-center mt-2'> Applied Trainer </h1>
            <div className="overflow-x-auto mt-10 w-[90%] mx-auto">
                <Table>
                    <Table.Head>
                        <Table.HeadCell>#</Table.HeadCell>
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>Email</Table.HeadCell>
                        <Table.HeadCell>Details</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {
                            trainer?.map((item, index) => <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell>{index + 1}</Table.Cell>
                                <Table.Cell>{item?.name}</Table.Cell>
                                <Table.Cell>{item?.email}</Table.Cell>
                                <Link to={`/dashboard/details/${item?._id}`} className='border-2 p-2'><Table.Cell>Details</Table.Cell></Link>
                            </Table.Row>)
                        }


                    </Table.Body>
                </Table>
            </div>
        </div>
    );
};

export default AppliedTrainer;