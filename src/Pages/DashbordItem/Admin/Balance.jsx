import React, { useEffect, useState } from 'react';
import useAxios from '../../../hook/useAxios';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Table } from "flowbite-react";

const Balance = () => {
    const axiosSecure = useAxios()
    const [balance, setbalance] = useState([])
    const [newsletter, setnewsletter] = useState([])
    useEffect(() => {
        axiosSecure.get('/allpayment')
            .then(res => {
                setbalance(res.data)
            })
        axiosSecure.get('/Allnewsletter')
            .then(data => {
                setnewsletter(data?.data)
            })
    }, [])

    const totalbalance = balance.reduce((prev, current) => prev + parseInt(current?.price), 0)
    // const langt = balance.length - 5
    // const slices = balance.slice(0, langt)
    const data = [
        { name: 'Total Pain Members', value: balance.length },
        { name: 'Total newsletter subscribers', value: newsletter.length },

    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    const slices = balance.slice(-6)
    console.log(slices)
    return (
        <div className='text-white w-[100%] min-h-screen'>
            <h1 className='text-center text-4xl'>Balance Page</h1>
            <div className='w-[80%] lg:w-[40%] mx-auto '>
              
                    <PieChart width={300} height={250}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend></Legend>
                    </PieChart>
                    
                
            </div>
            <h1 className='text-center text-3xl my-2'>TotalBalance:${totalbalance}</h1>
            <div className='text-white w-[90%] mx-auto h-[300px] overflow-x-auto'>
               
                <Table>
                    <Table.Head>
                        <Table.HeadCell>#</Table.HeadCell>
                        <Table.HeadCell>Name Of Member</Table.HeadCell>
                        <Table.HeadCell>Email</Table.HeadCell>
                        <Table.HeadCell>transactionId</Table.HeadCell>
                        <Table.HeadCell>price</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {
                            balance?.map((item,index) => <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell>{index+1}</Table.Cell>
                                <Table.Cell>{item?.CustomerName}</Table.Cell>
                                <Table.Cell>{item?.email}</Table.Cell>
                                <Table.Cell>{item?.transactionId}</Table.Cell>
                                <Table.Cell>{item?.price}</Table.Cell>
                            </Table.Row>)
                        }


                    </Table.Body>
                </Table>
            </div>
        </div>
    );
};

export default Balance;