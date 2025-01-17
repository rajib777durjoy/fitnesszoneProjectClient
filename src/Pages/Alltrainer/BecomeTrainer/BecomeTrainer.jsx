
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import React, { useState } from 'react';
import Select from 'react-select';
import { FileInput, } from "flowbite-react";
import { useForm } from "react-hook-form"
import useAuth from "../../../hook/useAuth";
import usePublickAxios from "../../../hook/usePublickAxios";
import useAxios from '../../../hook/useAxios';
import Swal from "sweetalert2";


const image_hosting_api = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_Api_Key}`
const BecomeTrainer = () => {

    const { user } = useAuth()
    const axiospublick = usePublickAxios();
    const axiosSecure = useAxios()
    const [selectedOption, setSelectedOption] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedTime, setSelectedTime] = useState([]);
    const options = [
        { value: 'yoga flow', label: 'yoga flow' },
        { value: 'CoreFlow', label: 'CoreFlow' },
        { value: 'PulseFit', label: 'PulseFit' },
        { value: 'Flex&Stretch', label: 'Flex&Stretch' },
        { value: 'ZenFit', label: 'ZenFit' },
    ];
    const days = [
        { value: 'sun', label: 'sun' },
        { value: 'mon', label: 'mon' },
        { value: 'tue', label: 'tue' },
        { value: 'wed', label: 'wed' },
        { value: 'thu', label: 'thu' },
        { value: 'fri', label: 'fri' },
        { value: 'sat', label: 'sat' },
    ];
    const time = [
        { value: 'morning', label: 'morning' },
        { value: 'noon', label: 'noon' },
        { value: 'afternoon', label: 'afternoon' },
        { value: 'evening', label: 'evening' },
        { value: 'night', label: 'night' },
    ]
    console.log(selectedOption)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        console.log(data)
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
                age:data.age,
                selectedOption,
                selectedDays,
                selectedTime,
                experience:data.experience,
                hours:data.hours,
                description:data.description,
                status:'pending'
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
            <div className="translate-y-24 w-[70%] mx-auto bg-slate-400 p-4 rounded-lg shadow-md shadow-slate-400">
                <form onSubmit={handleSubmit(onSubmit)} className="flex w-[100%] flex-col gap-4">
                    <div className="flex justify-between">
                        <div className="w-[50%]">
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Your Full Name" />
                            </div>
                            <TextInput {...register("name")} id="name" type="text" placeholder="" required />
                        </div>
                        <div className="w-[50%]">
                            <div className="mb-2 block">
                                <Label htmlFor="email1" value="Your email" />
                            </div>
                            <TextInput {...register("email")} id="email1" type="email"  defaultValue={user.email} readOnly required />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        {/* <div className="mb-2 block">
                            <Label htmlFor="email1" value="Profile Image" />
                        </div> */}
                        <TextInput id="photo" {...register("image")} type='file' placeholder="Profile Image" required />
                        {/* <div className="mb-2 block">
                            <Label htmlFor="email1" value="Profile Image" />
                        </div> */}
                        <TextInput {...register("age")} className="w-[40%]" id="age" type='number' placeholder="Age" required />
                    </div>
                    <div className="flex justify-between">
                        <div className="w-[50%]">
                            <div className="mb-2 block">
                                <Label htmlFor="skills" value="Skills" />
                            </div>
                            <Select
                                value={selectedOption}
                                onChange={(e) => setSelectedOption(e)}
                                options={options}
                                isMulti
                            />
                        </div>
                        <div className="w-[50%]">
                            <div className="mb-2 block">
                                <Label htmlFor="day" value="Available days" />
                            </div>
                            <Select
                                value={selectedDays}
                                onChange={(e) => setSelectedDays(e)}
                                options={days}
                                isMulti
                            />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="w-[50%]">
                            <div className="mb-2 block">
                                <Label htmlFor="experience" value="Experience" />
                            </div>
                            <TextInput {...register("experience")} id="experience" type="number" placeholder="Exprience" required />
                        </div>
                        <div className="w-[50%]">
                            <div className="mb-2 block">
                                <Label htmlFor="hours" value="Class Duration" />
                            </div>
                            <TextInput {...register("hours")} id="hours" type="text" placeholder="hours" required />
                        </div>
                    </div>
                    <div className="">
                        <div className="mb-2 block">
                            <Label htmlFor="time" value="Available time" />
                        </div>
                        <Select
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e)}
                            options={time}
                            isMulti
                        />
                    </div>
                    <Textarea id="comment" {...register("description")} placeholder="Bio..." required rows={4} />
                    <Button type="submit">Apply</Button>
                </form>
            </div>

        </div>
    );
};

export default BecomeTrainer;