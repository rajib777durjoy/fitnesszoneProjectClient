import { Button, FileInput, Label, Textarea, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import useAxios from "../../../hook/useAxios";
import usePublickAxios from "../../../hook/usePublickAxios";

 const image_hosting_api = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_Api_Key}`
const AddClass = () => { 
    const axiospublic= usePublickAxios()
    const axiosSecure=useAxios()
    const { register, handleSubmit } = useForm()
    const onSubmit = async (data) => {
        console.log(data)
        const imagefile = { image:data.image[0] }
        const res = await axiospublic.post(image_hosting_api,imagefile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        console.log(res.data.data.display_url)
        if(res.data.success){
          const classInfo={
            name:data.name,
            details:data.details,
            image:res.data.data.display_url
          }
          const res= await axiosSecure.post('/addClass',classInfo)
          console.log(res.data)
        }
    }
    return (
        <div className="w-[100%] ">
            <h1 className="text-white text-center font-extrabold text-4xl mt-4">Add New Class</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex w-[80%] mt-20 mx-auto flex-col gap-4">
                <div className="flex justify-between gap-2">
                    <div className="w-[50%]">
                        <div className="mb-2 block">
                            <Label className="text-white" htmlFor="name" value="Class name" />
                        </div>
                        <TextInput id="class" {...register("name")} type="text" placeholder="Add Class Name" required />
                    </div>

                    <div className="w-[50%]">
                        <div className="mb-2 block">
                            <Label className="text-white" htmlFor="image" value="image" />
                        </div>
                        <FileInput {...register("image")} id="image" />
                    </div>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label className="text-white" htmlFor="details" value="Class Details" />
                    </div>
                    <Textarea {...register("details")} id="comment" placeholder="Class Details" required rows={4} />
                </div>

                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
};

export default AddClass;