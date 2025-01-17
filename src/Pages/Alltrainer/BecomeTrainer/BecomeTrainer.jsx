
import { Button, Label, TextInput } from "flowbite-react";
import React, { useState } from 'react';
import Select from 'react-select';
import { FileInput, } from "flowbite-react";
import { useForm } from "react-hook-form"
import useAuth from "../../../hook/useAuth";
import usePublickAxios from "../../../hook/usePublickAxios";
import useAxios from '../../../hook/useAxios';
import Swal from "sweetalert2";
const options = [
    { value: 'Professionalism', label: 'Professionalism' },
    { value: 'Empowerment', label: 'Empowerment' },
    { value: 'vanilla', label: 'Vanilla' },
];
const days = [
    { value: 'Sun', label: "Sun" },
    { value: 'Mon', label: "Mon" },
    { value: 'Tue', label: "Tue" },
    { value: 'Wed', label: "Wed" },
    { value: 'Thu', label: "Thu" },
    { value: 'Fri', label: "Fri" },
    { value: 'Sat', label: "Sat" },
]

const image_hosting_api=`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_Api_Key}`
const BecomeTrainer = () => {
    const {user}=useAuth()
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);
    const axiospublick=usePublickAxios();
    const axiosSecure= useAxios()
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
      const onSubmit =async(data) =>{
        console.log(data)
     
     const imagefile={image:data.image[0]}
     const res=await axiospublick.post(image_hosting_api,imagefile,{
        headers:{
            'content-type':'multipart/form-data'
        }
     })
     if(res.data.success){
        const trainerInfo={
            name:data.name,
            email:data.email,
            age:data.age,
            image:res.data.data.display_url,
            availableSlot:data.hours,
            status:'panding'
         }
     
    const trainerRes=await axiosSecure.post('/trainer',trainerInfo)
    console.log(trainerRes.data)
    if(trainerRes.data.insertedId){
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Be a trainer Request done",
            showConfirmButton: false,
            timer: 1500
          });
    }

     }
      console.log(res.data.success)
      
      }

    return (
        <div className="min-h-screen">
            <div className="translate-y-24 w-[50%] mx-auto bg-slate-400 p-4 rounded-lg shadow-md shadow-slate-400">
                <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4 ">
                    <div>
                        <div className="mb-2 block ">
                            <Label value="Full Name" className="text-white" />
                        </div>
                        <TextInput {...register("name")} id="name" type="text" placeholder="Enter your Name" required />
                    </div>
                    <div>
                        <div className="mb-2 block ">
                            <Label value="Your email" className="text-white" />
                        </div>
                        <TextInput {...register("email")} id="email1" type="email" defaultValue={user?.email} required readOnly />
                    </div>
                    <div className="flex items-center justify-between">
                       
                        <TextInput {...register("age")} id="age" type="number" placeholder="Age" required />
                        <div>
                            
                        <FileInput {...register("image")} id="multiple-file-upload" multiple />
                        </div>
                    </div>
                    <div>
                        <div>
                            <Label value="Selecting multiple skills" className="text-white" />
                        </div>
                        <Select
                            defaultValue={selectedOption}
                            onChange={setSelectedOption}
                            options={options}
                            isMulti
                            {...register("skills")}
                        />
                    </div>
                    <div>
                        <div>
                            <Label value="Available days a week"  className="text-white"/>
                        </div>
                        <Select
                            defaultValue={selectedDay}
                            onChange={setSelectedDay}
                            options={days}
                            isMulti
                            {...register("day")}
                        />
                    </div>
                    <div>
                        <TextInput {...register("hours")} id="Time" type="number" placeholder="Available Time in a Day" required />
                    </div>
                    <Button type="submit">Applied Button</Button>
                </form>
            </div>

        </div>
    );
};

export default BecomeTrainer;