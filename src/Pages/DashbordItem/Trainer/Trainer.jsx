import { Sidebar } from 'flowbite-react';
import { Helmet } from 'react-helmet-async';
import { HiUser } from "react-icons/hi";
const Trainer = () => {
    return (
        <div>
            <Helmet>
                <title>FitnessZone-Dashboard|Trainer</title>
            </Helmet>
            <Sidebar.ItemGroup>
                <Sidebar.Item href="#" icon={HiUser}>
                    Manage Slots
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiUser}>
                    Add New slot
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiUser}>
                    Add new Forum
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiUser}>
                    Users
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiUser}>
                    Products
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiUser}>
                    Sign In
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiUser}>
                    Sign Up
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </div>
    );
};

export default Trainer;