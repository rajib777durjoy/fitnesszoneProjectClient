import { useQuery } from '@tanstack/react-query';
import { Card } from 'flowbite-react';
import React from 'react';
import usePublickAxios from '../../../hook/usePublickAxios';

const FeatureClass = () => {
    const axiosPublic=usePublickAxios()
    const {data:classlist=[]}=useQuery({
        queryKey:['class'],
        queryFn:async()=>{
        const res= await axiosPublic('/featureClass');
        console.log(res.data) 
        return res.data;
        }
    })
   console.log('classlist',classlist)
    return (
        <div className='w-[100%] bg-slate-200'>
            <h1 className=' text-center text-4xl font-bold py-10'>Features Class</h1>
            <div className='w-[90%] mx-auto grid md:grid-cols-3 gap-4 py-4'>
               {
                classlist.slice(0,6).map(item=><Card key={item?._id}
                    className="max-w-sm"
                >
                    <button className='text-end text-2xl'>...</button>
                    <div className='w-[90%] mx-auto'>
                        <img src={item?.image} alt="" className='w-[100%] h-[200px] rounded-md'  />
                    </div>
                    
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {item?.name}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                       {item?.details.slice(0,60)}
                    </p>
                </Card>)
               }
               
            </div>
        </div>

    );
};

export default FeatureClass;