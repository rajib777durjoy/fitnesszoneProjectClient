import { Button, Card } from 'flowbite-react';
import React from 'react';
import useAuth from '../../../hook/useAuth';
import useAxios from '../../../hook/useAxios';
import Swal from 'sweetalert2';

const Newsletter = () => {
    const {user}=useAuth()
    const axiosSequre=useAxios()
    const userSubmit=async ()=>{
        const userInfo={
            name:user?.displayName,
            email:user?.email,
            date:new Date(),
            role:'member'
        }
       const res= await axiosSequre.post(`/user`,userInfo);
       console.log(res.data)
       if(res.data.message){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You already store your info",
            footer: ''
          });
       }
       if(res.data.insertedId){
        Swal.fire({
            position: "top-center",
            icon: "success",
            title: "user set database",
            showConfirmButton: false,
            timer: 1500
          });
       }
    }
    return (
        <div className='w-[100%] my-4'>
            <h1 className='text-white text-center  my-3 text-4xl'> NewsLetter section</h1>
            <Card className="md:w-[50%] w-[90%] mx-auto h-[300px]">
                <h5 className="text-2xl font-bold text-center tracking-tight text-gray-900 dark:text-white">
                    {user?.displayName}
                </h5>
                <p className="font-normal text-gray-700 text-center dark:text-gray-400">
                   {user?.email}
                </p>
                <Button onClick={userSubmit}>
                   Subcribe
                    <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </Button>
            </Card>
        </div>
    );
};

export default Newsletter;