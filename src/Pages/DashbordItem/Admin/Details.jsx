import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../../../hook/useAxios';
import { useQuery } from '@tanstack/react-query';
import { Card } from 'flowbite-react';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import { Button, Modal } from "flowbite-react";

const Details = () => {
    const { id } = useParams()
    const [openModal, setOpenModal] = useState(false);
    const axiosSecure = useAxios();
    const { data: details = [],refetch } = useQuery({
        queryKey: ['details',id],
        queryFn: async () => {
            const res = await axiosSecure(`/details/${id}`)
            return res.data;
        }
    })

   const handelconfirmation= (_id)=>{
     console.log(_id)
    const statusInfo={
        id:_id,
        status:'success'
    }
     axiosSecure.patch('/statusChange',statusInfo)
     .then(res=>{
        console.log(res.data)
        if(res.data.modifiedCount>0){
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Applied Trainer Status Change Done",
                showConfirmButton: false,
                timer: 1500
              });
         axiosSecure.delete(`/applied/${id}`)
         .then(res=>{
            console.log(res.data)
            if(res.data.deletedCount){
                refetch()
                Swal.fire({
                    position:"top-center",
                    icon: "success",
                    title: "Applied Trainer Remove Successful",
                    showConfirmButton: false,
                    timer: 1500
                  });
             
            }
         })
        }
     })   
   }
 

   
    const {_id, name, email, image, age, skills, available_days_a_week, Available_time, experience, description, status} = details || {}
    return (
        <div className='w-[100%] min-h-screen bg-slate-700'>
            <Helmet>
                <title>FitnessZone-AppliedTrainer|DetailsPage</title>
            </Helmet>
            <h1 className='text-center text-2xl text-white font-medium my-2'>Applied Details</h1>
            <Card className={`${details?'w-[60%] mx-auto mt-5':'hidden'}`}>
                <div>
                    <img src={image} alt="" className='h-[300px] w-[90%] mx-auto' />
                </div>
                <div className='flex w-[90%] justify-between  mx-auto'>
                    <h5 className="">
                        Name:{name}
                    </h5>
                    <h2>Age:{age}</h2>
                    <p className="">
                        Email:{email}
                    </p>

                </div>
                <div>
                    <h1 className='flex w-[90%] mx-auto'>Skills:{skills?.map(item=><li className='list-none mx-1 border px-1'>{item}</li>)}</h1>
                    <h1 className='flex w-[90%] mx-auto my-2'>Available_time:{Available_time?.map(item=><div className='border mx-1 px-1'>{item}</div>)}</h1>
                    <h1 className='flex w-[90%] mx-auto'>Available_days_a_week:{available_days_a_week?.map(item=><div className='border mx-1 px-1'>{item}</div>)}</h1>
                </div>
                <div className='flex w-[90%] justify-between mx-auto '>
                    <p className='flex'>Experience:<p className='mx-2'>{experience}</p></p>
                    <p className='flex'>Status:<p className='mx-2'>{status}</p></p>
                </div>
                <p className='w-[90%] mx-auto '>Description:{description}</p>
                <div className='w-[90%] mx-auto flex justify-between'>
                    <button onClick={()=>handelconfirmation(_id)} className='border p-4 '>Confirmation</button>
                    <Button onClick={() => setOpenModal(true)}>Toggle modal</Button>
                </div>
            </Card>
            <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Terms of Service</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              With less than a month to go before the European Union enacts new consumer privacy laws for its citizens,
              companies around the world are updating their terms of service agreements to comply.
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant
              to ensure a common set of data rights in the European Union. It requires organizations to notify users as
              soon as possible of high-risk data breaches that could personally affect them.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>I accept</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
    );
};

export default Details;