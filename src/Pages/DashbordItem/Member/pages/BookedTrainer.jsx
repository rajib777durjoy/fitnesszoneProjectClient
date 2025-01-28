import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import useAxios from '../../../../hook/useAxios';
import useAuth from '../../../../hook/useAuth';
import { useState } from 'react';
import { Button, Modal, } from "flowbite-react";
import { useForm } from "react-hook-form";
import { Label, Textarea,TextInput} from "flowbite-react";
import Swal from "sweetalert2";
const BookedTrainer = () => {
    const axiosSecure = useAxios()
    const [trainer, setTrainer] = useState([])
    const [openModal, setOpenModal] = useState(false);
    const { register, handleSubmit } = useForm()
    const { user } = useAuth()
    const { data: booking = [] } = useQuery({
        queryKey: ['Trainer', user?.email],
        queryFn: async () => {
            const res = await axiosSecure(`/bookingTrainer/${user?.email}`)
            return res.data;
        }
    })
   
    const onSubmit = async (data) => {
        console.log(data)
        const reviewInfo={
            review:data.review,
            rating:data.rating,
        }
        const res= await axiosSecure.post('/review',reviewInfo)
        console.log(res.data)
        if(res.data.insertedId){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "review successful",
                showConfirmButton: false,
                timer: 1500
              });
            setOpenModal(false)
        }
         
    }

    // {
    //     _id: new ObjectId('6798e97815326740d3f20fe0'),
    //     bookId: '6798d54a17298b23a6085b30',
    //     name: 'banana',
    //     slot: 'noon',
    //     useremail: 'apple@gmail.com',
    //     userName: 'apple',
    //     Classes: 'CoreFlow',
    //     trainerEmail: 'banana@gmail.com',
    //     date: '2025-01-28T14:28:08.331Z'
    //   }
    const { _id, name, Classes } = booking || {}
    return (
        <div className='w-[90%] mx-auto'>
            <Helmet>
                <title>FitnessZone-Dashboard|BookedTrainer-page</title>
            </Helmet>
            <div>
                <h1 className='text-white'>{name}</h1>
                <div className='w-[50%] mx-auto bg-slate-400 p-10 rounded-md'>
                    {
                        booking?.map(item => <div>
                            <li className='text-white text-xl my-2 list-none w-[100%]'>TrainerInfo:{item?.trainerEmail}</li>
                            <li className='text-white text-xl my-2 list-none w-[100%]'>ClassesInfo:{item?.Classes}</li>
                            <li className='text-white text-xl my-2 list-none w-[100%]'>slot:{item?.slot}</li>
                            <li className='text-white text-xl my-2 list-none w-[100%]'>BookingId:{item?.bookId}</li>
                        </div>)
                    }
                    <Button onClick={() => setOpenModal(true)}>Review</Button>
                    <Modal show={openModal} onClose={() => setOpenModal(false)}>
                        <Modal.Header>Member Review</Modal.Header>
                        <Modal.Body>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-2 block">
                                    <Label htmlFor="comment" value="Your message" />
                                </div>
                                <Textarea {...register("review")} id="comment" placeholder="Leave a comment..." required rows={4} />
                                <div className="mb-2 block">
                                    <Label htmlFor="rating" value="Enter Rating" />
                                </div>
                                <TextInput {...register("rating")} id="rating" type="number" placeholder="Enter rating" required />
                                <hr />
                                <Button type='submit'>Submit</Button>
                            </form>
                        </Modal.Body>
                        
                    </Modal>
                </div>

            </div>

        </div>
    );
};

export default BookedTrainer;