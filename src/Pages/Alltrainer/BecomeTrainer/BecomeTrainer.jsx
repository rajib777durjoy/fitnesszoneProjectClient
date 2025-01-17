
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
const time = [
    { value: 'Morning', label: "Morning" },
    { value: 'Noon', label: "Noon" },
    { value: 'AfterNoon', label: "AfterNoon" },
    { value: 'Night', label: "Night" }
]

const image_hosting_api = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_Api_Key}`
const BecomeTrainer = () => {
    const { user } = useAuth()
    const [selectedOption, setSelectedOption] = useState([]);
    const [selectedDay, setSelectedDay] = useState([]);
    const [selectedtime, setSelectedtime] = useState([]);
    const axiospublick = usePublickAxios();
    const axiosSecure = useAxios()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = async (data) => {

        const imagefile = { image: data.image[0] }
        const res = await axiospublick.post(image_hosting_api, imagefile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
            const trainerInfo = {
                name: data.name,
                email: data.email,
                age: data.age,
                image: res.data.data.display_url,
                available_time: data.time,
                skills: data.skills,
                availableDay: data.day,
                status: 'panding'
            }
            console.log('trainer information', trainerInfo)
            const trainerRes = await axiosSecure.post('/trainer', trainerInfo)
            console.log(trainerRes.data)
            if (trainerRes.data.insertedId) {
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("name")} />
                    {errors.exampleRequired && <span>This field is required</span>}
                    <input {...register("email")} />
                    {errors.exampleRequired && <span>This field is required</span>}
                    <input {...register("age")} type="number" />
                    {errors.exampleRequired && <span>This field is required</span>}
                    <input {...register("Name")} type="text"/>
                    {errors.exampleRequired && <span>This field is required</span>}
                    <input {...register("Name")} type="text"/>
                    {errors.exampleRequired && <span>This field is required</span>}
                    
                    <input type="submit" />
                </form>
            </div>

        </div>
    );
};

export default BecomeTrainer;