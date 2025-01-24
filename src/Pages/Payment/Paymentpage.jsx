import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../../hook/useAxios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutFrom/CheckoutForm';


const stripePromise = loadStripe(`${import.meta.env.VITE_Stripe_Public_key}`)
const Paymentpage = () => {
    const [paymentdata, setpaymentdata] = useState([])
    const { id } = useParams()
    const axiosSecure = useAxios()
    const { data: packageData = [] } = useQuery({
        queryKey: [id],
        queryFn: async () => {
            const res = await axiosSecure(`/packageInfo/${id}`)
            return res.data
        }
    })
    const { _id, price, package: packag, TrainerName, slot, Classes, CustomerName, CustomerEmail } = packageData

    return (
        <div className='w-[100%] min-h-screen'>
            <div className='w-[100%] h-[70px]'></div>
            <div className='text-white w-[90%] min-h-[300px] mx-auto mt-20'>
                <div className='w-[40%] mx-auto translate-x-20'>
                    <h1 className='text-xl capitalize'>TrainerName:<span className=' mx-1 text-white'>{TrainerName}</span></h1>
                    <h2 className='text-xl capitalize'>Slot:<span className='mx-1'>{slot}</span></h2>
                    <h2 className='text-xl capitalize'>Package:<span className='mx-1'>{packag}</span></h2>
                    <h2 className='text-xl capitalize'>Price:<span className='mx-1'>{price}</span></h2>
                    <h2 className='text-xl capitalize'>UserName:<span className='mx-1'>{CustomerName}</span></h2>
                    <h2 className='text-xl capitalize'>UserEmail:<span className='mx-1 lowercase'>{CustomerEmail}</span></h2></div>
                <div className='w-[40%] mx-auto mt-20 h-[100px]'>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm packageData={packageData}></CheckoutForm>
                    </Elements>
                </div>
            </div>

        </div>
    );
};

export default Paymentpage;