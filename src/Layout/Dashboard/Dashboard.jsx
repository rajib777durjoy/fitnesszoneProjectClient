import { Sidebar } from "flowbite-react";
import { BiBuoy } from "react-icons/bi";
import { HiChartPie, HiViewBoards } from "react-icons/hi";
import useAxios from "../../hook/useAxios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hook/useAuth";
import Admin from "../../Pages/DashbordItem/Admin/Admin";
import Member from "../../Pages/DashbordItem/Member/Member";
import { Helmet } from "react-helmet-async";
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

    const admin = userCheck === 'admin';
    const member = userCheck === 'member';
    const trainer = userCheck === 'trainer';
    console.log(admin)
    return (
        <div className='w-[100%] min-h-screen flex justify-between'>
            <Helmet>
                <title>FitnessZone-Dashboard</title>
            </Helmet>
            <div className='w-[20%] border border-red-300'>
                <div className='w-[80%] h-[100%] mx-auto mt-5'>
                    <Sidebar aria-label="Sidebar with content separator example">
                        <Sidebar.Items>
                            {admin && <Admin></Admin>}
                            {trainer && <h1>this is trainer page</h1>}
                            {member && <Member></Member>}


                            <Sidebar.ItemGroup>
                                <Sidebar.Item href="#" icon={HiChartPie}>
                                    Upgrade to Pro
                                </Sidebar.Item>
                                <Sidebar.Item href="#" icon={HiViewBoards}>
                                    Documentation
                                </Sidebar.Item>
                                <Sidebar.Item href="#" icon={BiBuoy}>
                                    Help
                                </Sidebar.Item>
                            </Sidebar.ItemGroup>
                        </Sidebar.Items>
                    </Sidebar>
                </div>
            </div>
            <div className='w-[80%] border border-green-400'>
                main part
            </div>
        </div>
    );
};

export default Dashboard;