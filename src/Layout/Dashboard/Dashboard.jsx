
import useAxios from "../../hook/useAxios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hook/useAuth";
import Admin from "../../Pages/DashbordItem/Admin/Admin";
import Member from "../../Pages/DashbordItem/Member/Member";
import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import { Link} from "react-router-dom";
import AdminPrivate from "../../Private/AdminPrivate/AdminPrivate";
const Dashboard = () => {
    const { user } = useAuth()
    const axiosSecure = useAxios()
    const { data: userCheck = [] } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const res = await axiosSecure(`/userCheck/${user?.email}`)
            return res.data;
        }
    })

    const admin = userCheck?.user === 'admin';
    const trainer= userCheck?.user === "trainer";
    
    console.log()
    return (
        <div className='w-[100%] min-h-screen flex justify-between bg-slate-700'>
            <Helmet>
                <title>FitnessZone-Dashboard</title>
            </Helmet>
            <div className='w-[20%] border border-red-300'>
                <h1 className="text-white flex items-center gap-1 my-2">
                    <img src={user?.photoURL} alt="" className="hidden lg:block w-[50px] rounded-full" />
                    <div className="">
                        <h1>{user?.displayName}</h1>
                        <h1>{user?.email}</h1>
                    </div>
                </h1>
                <div className='w-[100%] h-auto  mt-5 '>    
                            {admin && <AdminPrivate><Admin></Admin></AdminPrivate>}
                            
                </div>
                <Link to='/' ><div className='text-white text-xl ms-5 w-[90%] '>Home</div></Link>
            </div>
            <div className='w-[80%] border border-green-400'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;