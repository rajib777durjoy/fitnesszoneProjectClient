
import { Button, Label, TextInput } from "flowbite-react";
import React, { useState } from 'react';
import Select from 'react-select';
import { FileInput, } from "flowbite-react";
import { useForm } from "react-hook-form"
import useAuth from "../../../hook/useAuth";
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
const BecomeTrainer = () => {
    const {user}=useAuth()
    const [selectedOption, setSelectedOption] = useState([]);
    const [selectedDay, setSelectedDay] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
      const onSubmit = (data) =>{
      const image=data.image[0].name;
      
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
                        <TextInput {...register("email")} id="email1" type="email" placeholder={user?.email} required readOnly />
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