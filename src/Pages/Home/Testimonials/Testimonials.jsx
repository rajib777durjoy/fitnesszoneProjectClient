import { useQuery } from '@tanstack/react-query';
import { Carousel} from 'flowbite-react';
import React from 'react';
import usePublickAxios from '../../../hook/usePublickAxios';

const Testimonials = () => {
    const axiospublic = usePublickAxios()
    const { data: reviews = [] } = useQuery({
        queryKey: ['review'],
        queryFn: async () => {
            const res = await axiospublic.get('/allreview')
            return res.data;
        }
    })
    console.log('review', reviews)
    // {
    //     "_id": "67990770fbed901873332fe7",
    //     "review": "[Trainer's Name] takes the time to understand your goals and creates personalized plans that actually work. Their positive attitude and expertise make every session enjoyable and effective. I’m stronger, healthier, and more confident thanks to their guidance!\"",
    //     "rating": "4"
    // }
    return (
        <div className='w-[100%] min-h-screen'>
            <Carousel className='h-[500px] w-[80%] mx-auto'>
                {
                    reviews.map(item => <div className='text-white text-center'>
                        <div>review:{item?.review}</div>
                         <div>rating:{item?.rating}</div>
                    </div>)
                }

            </Carousel>
        </div>
    );
};

export default Testimonials;