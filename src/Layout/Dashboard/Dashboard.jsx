
import useAxios from "../../hook/useAxios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hook/useAuth";
import Admin from "../../Pages/DashbordItem/Admin/Admin";
import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { Spinner } from "flowbite-react";
import { useState } from "react";
import Trainer from "../../Pages/DashbordItem/Trainer/Trainer";
import Member from '../../Pages/DashbordItem/Member/Member';
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { Navbar } from "flowbite-react";
const Dashboard = () => {
    const { user } = useAuth()
    const axiosSecure = useAxios()
    const [toggle, setToggle] = useState(false)
    const { data: userCheck = [], isPending } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const res = await axiosSecure(`/userCheck/${user?.email}`)
            return res.data;
        }
    })
    if (isPending) {
        return <div className="text-center translate-y-40"><Spinner aria-label="Large spinner example" size="lg" /></div>
    }
    const admin = userCheck?.user === 'admin';
    const trainer = userCheck?.user === "trainer";
    const member = userCheck?.user === 'member'
    return (
        <div className='w-[100%] min-h-screen bg-slate-950'>
            <Helmet>
                <title>FitnessZone-Dashboard</title>
            </Helmet>
            <div className="w-[100%] text-black min-h-screen  flex justify-between">
                <div className="md:hidden">
                    {toggle &&
                        <div className='w-[30%] max-h-screen py-2 absolute top-14 z-50 bg-slate-300   '>
                            <button className='text-center text-black' onClick={() => setToggle(!toggle)}><IoMdClose className='text-4xl ' /></button>
                            <h1 className=" flex items-center gap-1 my-2">
                                <img src={user?.photoURL} alt="" className="w-[20px] rounded-full" />
                                    <h1 className="text-xs ">{user?.displayName}</h1>
                                    {/* <h1 className='text-xs'>{user?.email}</h1> */}
                            </h1>
                            <div className='w-[100%] mt-5  '>
                                {admin && <Admin></Admin>}
                                {trainer && <Trainer></Trainer>}
                                {member && <Member></Member>}
                            </div>
                        </div>
                    }
                </div>
                <div className="bg-slate-300 px-2 hidden md:block">
                    {admin && <Admin></Admin>}
                    {trainer && <Trainer></Trainer>}
                    {member && <Member></Member>}
                </div>

                <div className='w-[100%]  '>
                    <Navbar fluid rounded className="bg-slate-300 mb-1">
                        <Navbar.Brand as={Link} href="https://flowbite-react.com">
                            <button onClick={() => setToggle(!toggle)}><IoMdMenu className='text-4xl text-black md:hidden' /></button>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="">
                            <Navbar.Link href="/" active>
                                Home
                            </Navbar.Link>
                            <Navbar.Link as={Link} href="/alltrainer">
                                All Trainer
                            </Navbar.Link>
                            <Navbar.Link href="/allclasses">All Class</Navbar.Link>
                            <Navbar.Link href="/forums">Forums </Navbar.Link>

                        </Navbar.Collapse>
                    </Navbar>
                    <Outlet></Outlet>

                </div>

            </div>
        </div>
    );
};

export default Dashboard;