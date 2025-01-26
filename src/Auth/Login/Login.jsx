import { Button, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form"
import useAuth from '../../hook/useAuth';
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const Login = () => {
    const { userlogin, SocialLogin } = useAuth()

    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        userlogin(email, password).then(res => {
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "login successful",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/')
        }).catch(err => {
            Swal.fire({
                icon: "error",
                title: `${err.message}`,
                footer: '',
            });
        })
    }
    const handelGooglelogin = () => {

        SocialLogin().then(res => {
            console.log('google', res)
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Google login successful",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/')
        }).catch(err => {
            console.log(err)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        })
    }
    return (
        <div className="w-[100%] min-h-screen mt-20">
            <Helmet>
                <title>FitnessZone-Login Page</title>
            </Helmet>
            <div className="w-[40%] mx-auto h-[500px] border shadow-md shadow-slate-300 rounded-lg bg-slate-700 py-10">
                <form onSubmit={handleSubmit(onSubmit)} className="flex w-[80%] mx-auto flex-col gap-4 ">
                    <div>
                        <div className="mb-2 block ">
                            <Label className="text-white" value="Your email" />
                        </div>
                        <TextInput {...register("email")} id="email1" type="email" placeholder="Enter your email" required />
                        {errors.email && <span className="text-white">This field is required</span>}
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label className="text-white" value="Your password" />
                        </div>
                        <TextInput {...register("password")} placeholder='Enter your Password' id="password1" type="password" required />
                        {errors.password && <span className="text-white">This field is required</span>}
                    </div>
                    <Button type="submit">Login</Button>
                </form>
                <div className="w-[80%]  rounded-md my-4 mx-auto">
                    <Button onClick={handelGooglelogin} className="w-[100%]" type="btn">Google</Button>
                </div>
                <hr className="w-[90%] mx-auto" />
                <p className="text-white text-center mt-4">Don't have an Account ? <Link to='/register'>
                    <span className="text-blue-400 font-medium text-xl">Register</span></Link></p>
            </div>


        </div>
    );
};

export default Login;