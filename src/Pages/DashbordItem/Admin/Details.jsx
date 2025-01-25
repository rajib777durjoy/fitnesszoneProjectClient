import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../../../hook/useAxios';
import { useQuery } from '@tanstack/react-query';
import { Card, Label, Textarea } from 'flowbite-react';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import { Button, Modal } from "flowbite-react";
import { useForm } from 'react-hook-form';

const Details = () => {
  const { id } = useParams()
  const [openModal, setOpenModal] = useState(false);
  const [feedback,setfeedback]=useState('')
  const axiosSecure = useAxios();
     

  const { data: details = [], refetch } = useQuery({
    queryKey: ['details', id],
    queryFn: async () => {
      const res = await axiosSecure(`/details/${id}`)
      return res.data;
    }
  })
  const { _id, name, email, image, age, skills, available_days_a_week, Available_time, experience, description, status } = details || {}
  const handelconfirmation = (_id) => {
    console.log(_id)
    const statusInfo = {
      id: _id,
      status: 'success'
    }
    axiosSecure.patch('/statusChange', statusInfo)
      .then(res => {
        console.log(res.data)
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Applied Trainer Status Change Done",
            showConfirmButton: false,
            timer: 1500
          });
          axiosSecure.delete(`/applied/${id}`)
            .then(res => {
              console.log(res.data)
              if (res.data.deletedCount) {
                refetch()
                Swal.fire({
                  position: "top-center",
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
  const rejectFeedback= async()=>{
    const appliedInfo={
      id:_id,
      name,
      email,
      status:"Rejected",
      feedback:feedback
    }
    console.log('apkidfldsjkfsf',appliedInfo)
   const res= await axiosSecure.post('/feedback',appliedInfo)
   console.log(res.data)
   if(res.data.insertedId){
    setfeedback('')
    axiosSecure.delete(`/appliedReject/${_id}`)
    .then(respons=>{
      console.log(respons.data)
      if(respons.data.deletedCount>0){
        refetch()
        Swal.fire({
          position:"top-center",
          icon:"success",
          title:"Applied Trainer Remove Successful",
          showConfirmButton:false,
          timer:1500
        });
       
      }
      setOpenModal(false)
    })
   }
  
  }
 console.log('feedbak',feedback)

 
  return (
    <div className='w-[100%] min-h-screen bg-slate-700'>
      <Helmet>
        <title>FitnessZone-AppliedTrainer|DetailsPage</title>
      </Helmet>
      <h1 className='text-center text-2xl text-white font-medium my-2'>Applied Details</h1>
      <Card className={`${details ? 'w-[60%] mx-auto mt-5' : 'hidden'}`}>
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
          <h1 className='flex w-[90%] mx-auto'>Skills:{skills?.map(item => <li className='list-none mx-1 border px-1'>{item}</li>)}</h1>
          <h1 className='flex w-[90%] mx-auto my-2'>Available_time:{Available_time?.map(item => <div className='border mx-1 px-1'>{item}</div>)}</h1>
          <h1 className='flex w-[90%] mx-auto'>Available_days_a_week:{available_days_a_week?.map(item => <div className='border mx-1 px-1'>{item}</div>)}</h1>
        </div>
        <div className='flex w-[90%] justify-between mx-auto '>
          <p className='flex'>Experience:<p className='mx-2'>{experience}</p></p>
          <p className='flex'>Status:<p className='mx-2'>{status}</p></p>
        </div>
        <p className='w-[90%] mx-auto '>Description:{description}</p>
        <div className='w-[90%] mx-auto flex justify-between'>
          <button onClick={() => handelconfirmation(_id)} className='border p-4 '>Confirmation</button>
          <Button onClick={() => setOpenModal(true)}>Toggle modal</Button>
        </div>
      </Card>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Terms of Service</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
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
              <h1 className='flex w-[90%] mx-auto'>Skills:{skills?.map(item => <li className='list-none mx-1 border px-1'>{item}</li>)}</h1>
              <h1 className='flex w-[90%] mx-auto my-2'>Available_time:{Available_time?.map(item => <div className='border mx-1 px-1'>{item}</div>)}</h1>
              <h1 className='flex w-[90%] mx-auto'>Available_days_a_week:{available_days_a_week?.map(item => <div className='border mx-1 px-1'>{item}</div>)}</h1>
            </div>
            <div className='flex w-[90%] justify-between mx-auto '>
              <p className='flex'>Experience:<p className='mx-2'>{experience}</p></p>
              <p className='flex'>Status:<p className='mx-2'>{status}</p></p>
            </div>
            <p className='w-[90%] mx-auto '>Description:{description}</p>
            
            <div className="mb-2 block">
              <Label htmlFor="comment" value="Reject Feedback" />
            </div>
            <Textarea onChange={(e)=>setfeedback(e.target.value)} id="comment" placeholder="type reject feedback" required rows={4} />
            
          </div>

        </Modal.Body>
        <Modal.Footer>
        <Button type='submit' onClick={rejectFeedback}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Details;