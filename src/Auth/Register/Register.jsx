
import { Button, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form"
import useAuth from "../../hook/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import usePublickAxios from "../../hook/usePublickAxios";
const Register = () => {
    const { createUser } = useAuth()
    const navigateHome = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const axiospublic=usePublickAxios()
    const onSubmit = (data) => {
        console.log(data)
        const name = data.name;
        const email = data.email;
        const photoUrl = data.photoUrl;
        const password = data.password;
        createUser(email, password).then(res => {
            // console.log('hfsdfjsfjsd',res.user)
            if (res.user) {
                updateProfile(auth.currentUser, {
                    displayName: name,
                    photoURL: photoUrl
                }).then(()=>{
                    console.log('hdlkfjdofjds',res.user.photoURL,res.user.metadata.lastSignInTime)
                    const userInfo={
                        name:res.user.displayName,
                        email:res.user.email,
                        image:res.user.photoURL,
                        role:"member",
                        lastLogin:res.user.metadata.lastSignInTime
                    }
                    console.log('userInfo',userInfo)
                    axiospublic.post('/user',userInfo)
                    .then(response=>{
                        // console.log(response.data)
                        if(response.data?.insertedId){
                            
                            navigateHome('/')
                            Swal.fire({
                                position:"top-end",
                                icon: "success",
                                title: "register successful",
                                showConfirmButton: false,
                                timer: 1500
                              });
                              
                        }
                    })
                })
            }
        })
    }
    return (
        <div className="w-[100%] min-h-screen mt-20 ">
            <Helmet>
                <title>FitnessZone-Register Page</title>
            </Helmet>
            <div className="w-[40%] mx-auto min-h-[500px] border shadow-md shadow-slate-300 rounded-lg bg-slate-700 py-10">
                <form onSubmit={handleSubmit(onSubmit)} className="flex w-[80%] mx-auto flex-col gap-4 ">
                    <div>
                        <div className="mb-2 block ">
                            <Label className="text-white" value="Your Name" />
                        </div>
                        <TextInput {...register("name")} id="name" type="text" placeholder="Enter your Name" required />
                        {errors.name && <span className="text-white">This field is required</span>}
                    </div>
                    <div>
                        <div className="mb-2 block ">
                            <Label className="text-white" value="Your email" />
                        </div>
                        <TextInput {...register("email")} id="email1" type="email" placeholder="Enter your email" required />
                        {errors.email && <span className="text-white">This field is required</span>}
                    </div>
                    <div>
                        <div className="mb-2 block ">
                            <Label className="text-white" value="Your photoUrl" />
                        </div>
                        <TextInput {...register("photoUrl")} id="photo" type="url" placeholder="Enter your Photo url" required />
                        {errors.photoUrl && <span className="text-white">This field is required</span>}
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label className="text-white" value="Your password" />
                        </div>
                        <TextInput {...register("password")} id="password1" type="password" required />
                        {errors.password && <span className="text-white">This field is required</span>}
                    </div>
                    <Button type="submit">Register</Button>
                </form>
                <hr className="w-[90%] mx-auto mt-4" />
                <p className="text-white text-center mt-4">Already have an Account ? <Link to='/login'>
                    <span className="text-blue-400 font-medium text-xl">Login</span></Link></p>
            </div>

        </div>
    );
};

export default Register;