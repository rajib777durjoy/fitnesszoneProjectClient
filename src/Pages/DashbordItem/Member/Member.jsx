import { Sidebar } from 'flowbite-react';
import { Helmet } from 'react-helmet-async';
import { HiInbox, } from "react-icons/hi";
const Member = () => {
    return (
        <div>
            <Helmet>
                <title>FitnessZone-Dashboard|Member</title>
            </Helmet>
            <Sidebar.ItemGroup>
                <Sidebar.Item href="#" icon={HiInbox}>
                    Activity Log page
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiInbox}>
                    Profile Page
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiInbox}>
                    Booked Trainer
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </div>
    );
};

export default Member;