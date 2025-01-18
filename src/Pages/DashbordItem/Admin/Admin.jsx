
import { Helmet } from "react-helmet-async";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";

const Admin = () => {
    return (
        <div>
            <Helmet>
                <title>FitnessZone-Dashboard|Admin</title>
            </Helmet>
            <Sidebar.ItemGroup>
                <Sidebar.Item href="#" icon={HiChartPie}>
                    All Newsletter subscribers
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiViewBoards}>
                    All Trainers
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiInbox}>
                    Applied Trainer
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiUser}>
                    Add new Class
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiUser}>
                    Balance
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </div>
    );
};

export default Admin;