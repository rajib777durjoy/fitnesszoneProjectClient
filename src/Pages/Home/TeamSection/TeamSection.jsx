import { useQuery } from '@tanstack/react-query';
import React from 'react';
import usePublickAxios from '../../../hook/usePublickAxios';
import { Card } from 'flowbite-react';

const TeamSection = () => {
    const publicApi=usePublickAxios()
    const {data:team=[]}=useQuery({
        queryKey:['team'],
        queryFn:async()=>{
     const res= await publicApi('/team')
     console.log(res.data)
       return res.data;
    }
    })
    console.log(team)
    return (
        <div className='w-[100%] min-h-[400px] py-10 bg-slate-100'>
           <h1 className=' text-center mb-4 text-4xl font-bold '>Team Section</h1>
           <div className='w-[90%] mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
             {
              team?.map(item=><Card className="">
                
                <div className="flex flex-col items-center pb-10">
                  <img
                    alt="Bonnie image"
                    height="96"
                    src={item?.image}
                    width="96"
                    className="mb-3 rounded-full shadow-lg"
                  />
                  <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{item?.name}</h5>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{item?.email}</span>
                  <h1 className='text-black text-start font-bold '>Experience: {item?.experience}</h1>
                      <h1 className='text-black text-center my-2'></h1>
                      <div className='w-[100%] text-center mx-auto gap-2 '>
                      {item?.skills?.map(skill=><li className=' text-center border rounded-md  text-black flex my-1 font-bold'>{skill}</li>)}
                
                   </div>
                   
                   <p  className='text-black'>{item?.description.slice(0,50)}</p>
                </div>
              </Card>)  
             }
           </div>
        </div>
    );
};

export default TeamSection;