
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
    const [selectedsocial, setSelectedsocial] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);

    const options = [
        { value: 'yoga flow', label: 'yoga flow' },
        { value: 'CoreFlow', label: 'CoreFlow' },
        { value: 'Barre', label: 'Barre' },
        { value: 'Flex&Stretch', label: 'Flex&Stretch' },
        { value: 'Pilates', label: 'Pilates' },
        { value: 'CardioCrush', label: 'CardioCrush' },
        { value: 'Core', label: 'Core' },
        { value: 'Hiit', label: 'Hiit' },

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
    const social = [
        { value: 'Facebook', label: 'facebook' },
        { value: 'Instagram', label: 'Instagram' },
        { value: 'Twitter', label: 'Twitter' },
        { value: 'Linkedin', label: 'Linkedin' },
    ]
    const classes = [
        { value: 'yoga flow', label: 'yoga flow' },
        { value: 'CoreFlow', label: 'CoreFlow' },
        { value: 'Barre', label: 'Barre' },
        { value: 'Flex&Stretch', label: 'Flex&Stretch' },
        { value: 'Pilates', label: 'Pilates' },
        { value: 'CardioCrush', label: 'CardioCrush' },
        { value: 'Core', label: 'Core' },
        { value: 'Hiit', label: 'Hiit' },

    ]

    console.log(selectedOption)
    const skills = selectedOption.map(item => item)
    const skillArry = skills.map(skill => skill.value)

    const day = selectedDays.map(item => item)
    const singleDay = day.map(i => i.value)

    const alltime = selectedTime.map(item => item)
    const times = alltime.map(t => t.value)

    const socials = selectedsocial.map(item => item)
    const icons = socials.map(icon => icon.value)

    console.log('items', skillArry, singleDay, times, icons)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {

        // console.log(data)
        const imagefile = { image: data.image[0] }
        const res = await axiospublick.post(image_hosting_api, imagefile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        console.log(res.data.data.display_url)
        const{value}= selectedClass;
        const classes=value;
        if (res.data.success) {
            const trainerInfo = {
                name: data.name,
                email: data.email,
                image: res.data.data.display_url,
                age: data.age,
                skills: skillArry,
                available_days_a_week: singleDay,
                Available_time: times,
                experience: data.experience,
                socialIcon:icons,
                hours: data.ClassDuration,
                Class:classes,
                description: data.description,
                status: 'pending'
            }
            console.log('trainer information', trainerInfo)
            const trainerRes = await axiosSecure.post('/trainer', trainerInfo)
            console.log(trainerRes.data)
            if (trainerRes.data.insertedId) {
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Be a trainer Request done",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            if(trainerRes.data.message){
                Swal.fire({
                    position: "top-center",
                    icon: "error",
                    title: trainerRes.data.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            }

        }
        // console.log(res.data.success)

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
                            <TextInput {...register("email")} id="email1" type="email" defaultValue={user.email} readOnly required />
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
                        <div className="w-[45%]">
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
                        <div className="w-[45%]">
                            <div className="mb-2 block">
                                <Label htmlFor="day" value="Available days a week" />
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
                        <div className="w-[45%]">
                            <div className="mb-2 block">
                                <Label htmlFor="experience" value="Experience" />
                            </div>
                            <TextInput {...register("experience")} id="experience" type="number" placeholder="Exprience" required />
                        </div>
                        <div className="w-[45%]">
                            <div className="mb-2 block">
                                <Label htmlFor="social" value="Select you social link" />
                            </div>
                            <Select
                                value={selectedsocial}
                                onChange={(e) => setSelectedsocial(e)}
                                options={social}
                                isMulti
                            />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="w-[45%]">
                            <div className="mb-2 block">
                                <Label htmlFor="time" value="Available time in a day" />
                            </div>
                            <Select
                                value={selectedTime}
                                onChange={(e) => setSelectedTime(e)}
                                options={time}
                                isMulti
                            />
                            
                        </div>
                        <div className="w-[45%]">
                                <div className="mb-2 block">
                                    <Label htmlFor="ClassDuration" value="ClassDuration" />
                                </div>
                                <TextInput {...register("ClassDuration")} id="ClasssDuration" type="number" placeholder="Class Duration" required />
                        </div>
                    </div>
               
                    <div className="mb-2 block">
                                <Label htmlFor="time" value="Select Class" />
                            </div>
                            <Select
                                value={selectedClass}
                                onChange={(e) => setSelectedClass(e)}
                                options={classes}  
                            />
                   
                    <Textarea id="comment" {...register("description")} placeholder="Bio..." required rows={4} />
                    <Button type="submit">Apply</Button>
                </form>
            </div>

        </div>
    );
};

export default BecomeTrainer;