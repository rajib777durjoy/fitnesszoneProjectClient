import React from 'react';
import { Button, Checkbox, Label, Textarea, TextInput } from "flowbite-react";
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxios from '../../../hook/useAxios';
import usePublickAxios from '../../../hook/usePublickAxios';
import useAuth from '../../../hook/useAuth';

const image_hosting_api = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_Api_Key}`
const Forum = () => {
    const {user}= useAuth()
    console.log(user?.email)
    const {
        register,
        handleSubmit,
    } = useForm()
 const axiosSecure =useAxios()
 const axiospublic=usePublickAxios()
    const onSubmit = async (data) => {
        // console.log(data)
        const imagefile = { image: data.image[0] }
        const res = await axiospublic.post(image_hosting_api, imagefile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
            const froumInfo = {
                title: data.title,
                details: data.details,
                image: res.data.data.display_url,
                CreatorEmail:user?.email,
            }
            console.log('forumData',froumInfo)
            const forumData = await axiosSecure.post('/addFroum', froumInfo)
            // console.log(forumData.data.insertedId)
            if (forumData.data.insertedId) {
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Add Froum Successful",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex w-[80%] mx-auto flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                        <Label className='text-white' htmlFor="Froum Title" value="Title" />
                    </div>
                    <TextInput {...register("title")} id="FroumTitle" type="text" placeholder="Froum Title" required />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label className='text-white' htmlFor="photo" value="Image" />
                    </div>
                    <TextInput {...register("image")} id="photo" type='file' required />
                </div>
                <div className="mb-2 block">
                    <Label className='text-white' htmlFor="comment" value="Your message" />
                </div>
                <Textarea {...register("details")} id="comment" placeholder="Details" required rows={4} />
                <Button type="submit">Post</Button>
            </form>
        </div>
    );
};

export default Forum;