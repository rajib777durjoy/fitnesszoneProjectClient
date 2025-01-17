import { Button, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form"
import useAuth from '../../hook/useAuth';
import { Link } from "react-router-dom";
const Login = () => {
    const {userlogin,SocialLogin} = useAuth()
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()  
      
      const onSubmit = (data) =>{
       const email=data.email;
       const password=data.password;
       userlogin(email,password).then(res=>{
        console.log('userlogin',res.user)
       })
      }
      const handelFacebooklogin=()=>{
        console.log('clicked')
        SocialLogin().then(res=>{
            console.log('Facebook',res)
        })
      }
    return (
        <div className="w-[100%] min-h-screen mt-20">
            <div className="w-[40%] mx-auto h-[500px] border shadow-md shadow-slate-300 rounded-lg bg-slate-700 py-10">
                <form onSubmit={handleSubmit(onSubmit)} className="flex w-[80%] mx-auto flex-col gap-4 ">
                    <div>
                        <div className="mb-2 block ">
                            <Label className="text-white"  value="Your email" />
                        </div>
                        <TextInput {...register("email")} id="email1" type="email" placeholder="Enter your email" required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label className="text-white" value="Your password"/>
                        </div>
                        <TextInput {...register("password")} placeholder='Enter your Password' id="password1" type="password" required />
                        {errors.password && <span className="text-white">This field is required</span>}
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
               <div className="w-[80%]  rounded-md my-4 mx-auto">
                  <Button onClick={handelFacebooklogin} className="w-[100%]" type="btn">Facebook</Button>
               </div>
               <hr className="w-[90%] mx-auto" />
                <p className="text-white text-center mt-4">Don't have an Account ? <Link to='/register'>
                <span className="text-blue-400 font-medium text-xl">Register</span></Link></p>
            </div>


        </div>
    );
};

export default Login;