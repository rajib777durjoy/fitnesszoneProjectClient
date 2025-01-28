import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import useAxios from '../../../../hook/useAxios';
import useAuth from '../../../../hook/useAuth';
import { useState } from 'react';
import { Button } from 'flowbite-react';


const BookedTrainer = () => {
    const axiosSecure = useAxios()
    const [trainer,setTrainer]=useState([])
    const { user } = useAuth()
    const { data: booking = [] } = useQuery({
        queryKey: ['Trainer',user?.email],
        queryFn: async () => {
            const res = await axiosSecure(`/bookingTrainer/${user?.email}`)
            return res.data;
        }
    })
   
    // {
    //     "_id": "679686ab3d8a10e8a1e9698c",
    //     "bookId": "67951cc510d93c43c57d35fe",
    //     "name": "RajeshChanda",
    //     "slot": "evening",
    //     "useremail": "durjoy2001chando@gmail.com",
    //     "Classes": [
    //         "Flex&Stretch",
    //         "yoga flow",
    //         "Barre"
    //     ],
    //     "date": "2025-01-26T19:00:39.653Z"
    // }
    const {_id,name,Classes}=booking ||{}
    return (
        <div className='w-[90%] mx-auto'>
            <Helmet>
                <title>FitnessZone-Dashboard|BookedTrainer-page</title>
            </Helmet>
            <div>
               <h1 className='text-white'>{name}</h1>
               <div className='w-[30%] mx-auto'>
               <Button>Review</Button>
               </div>
              
            </div>
            
        </div>
    );
};

export default BookedTrainer;