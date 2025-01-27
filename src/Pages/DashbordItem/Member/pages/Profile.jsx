import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button, Card, Dropdown, Modal, Checkbox, TextInput } from "flowbite-react";
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../../hook/useAxios';
import useAuth from '../../../../hook/useAuth';
import { useState } from "react";
import { FileInput, Label } from "flowbite-react";
import { useForm } from 'react-hook-form';
import usePublickAxios from '../../../../hook/usePublickAxios';
import Swal from 'sweetalert2';


const image_hosting_api = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_Api_Key}`
const Profile = () => {
    const [openModal, setOpenModal] = useState(false);
    const [userName, setuserName] = useState('')
    const axiosSecure = useAxios()
    const axiospublic = usePublickAxios()
    const { user } = useAuth()
    const { register, handleSubmit } = useForm()
    const { data: profileInfo = [] } = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const res = await axiosSecure(`/profile/${user?.email}`);
            return res.data;
        }
    })
    const { _id, name, email, image, userObject } = profileInfo;
    console.log('usfhfsdfs', userName)
    const updateProfile = (id) => {
        console.log(id)
        setuserName(profileInfo?.name)
        setOpenModal(true)
    }
    const onSubmit = async (data) => {
        console.log(data)
        const imagefile = { image: data.image[0] }
        const res = await axiospublic.post(image_hosting_api, imagefile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        console.log(res.data.data.display_url)
        if (res.data.success) {
            const updateInfo = {
                name: userName,
                email: data.email,
                image: res.data.data.display_url
            }
            const updatedData = await axiosSecure.put(`/update/${_id}`, updateInfo)
            // console.log(classData.data.insertedId)
            if (updatedData.data.insertedId) {
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Profile update Successful",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    }
        return (
            <div className='w-[100%] min-h-screen'>
                <Helmet>
                    <title>FitnessZone-Dashboard|Profile-Page</title>
                </Helmet>

                <Card className="max-w-sm lg:max-w-2xl min-h-[350px] lg:min-h-[400px] mx-auto mt-20">
                    <div className="flex justify-end px-4 pt-4">
                        <Dropdown inline label="">
                            <Dropdown.Item>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Edit
                                </a>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Export Data
                                </a>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Delete
                                </a>
                            </Dropdown.Item>
                        </Dropdown>
                    </div>
                    <div className="flex flex-col items-center pb-10">
                        <img src={profileInfo?.image} alt="" />
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{email}</span>
                        <h1 className="text-sm text-gray-500 dark:text-gray-400">Last login status:{profileInfo?.userObject}</h1>
                        <div className="mt-4 flex space-x-3 lg:mt-6">
                            <Button onClick={() => { updateProfile(_id) }}>Updata Profile</Button>
                        </div>
                    </div>
                </Card>

                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                    <Modal.Header>Update Profile</Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-md flex-col gap-4">
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="name" value="Update Name" />
                                </div>
                                <TextInput className='text-black' onChange={(e) => setuserName(e.target.value)} id="name" type="text" placeholder={userName}/>
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="email" value="Your email" />
                                </div>
                                <TextInput id="email" type="email" {...register("email")} defaultValue={email} readOnly />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label className="text-white" htmlFor="image" value="image" />
                                </div>
                                <FileInput {...register("image")} id="image" />
                            </div>
                            <Button type="submit">Submit</Button>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button color="gray" onClick={() => setOpenModal(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

export default Profile;