
import { Sidebar } from 'flowbite-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
const Member = () => {
    return (
        <div>
            <Helmet>
                <title>FitnessZone-Dashboard|Member</title>
            </Helmet>
            
            <div className="w-[100%]">
                <Link to='activity'><li className="text-white border border-transparent hover:bg-slate-400 ps-4 py-4 list-none font-medium text-xl my-5">Activity Log page</li></Link>
                <Link to='profile'><li className="text-white border border-transparent hover:bg-slate-400 ps-4 py-4 list-none font-medium text-xl my-5">Profile Page</li></Link>
                <Link to='bookedtrainer'><li className="text-white border border-transparent hover:bg-slate-400 ps-4 py-4 list-none font-medium text-xl my-5">Booked Trainer</li></Link>
            </div>
            
        </div>
    );
};

export default Member;