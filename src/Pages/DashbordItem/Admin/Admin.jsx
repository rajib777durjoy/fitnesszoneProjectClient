
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Admin = () => {
    return (
        <div className="w-[100%]">
            <Helmet>
                <title>FitnessZone-Dashboard|Admin</title>
            </Helmet>
            <div className="w-[100%]">
                <Link to='allnewsletter'><li className="text-white border border-transparent hover:bg-slate-400 ps-4 py-4 list-none font-medium text-xl my-5">All Newsletter subscribers</li></Link>
                <Link to=''><li className="text-white border border-transparent hover:bg-slate-400 ps-4 py-4 list-none font-medium text-xl my-5">All Trainers</li></Link>
                <Link to='appliedTrainer'><li className="text-white border border-transparent hover:bg-slate-400 ps-4 py-4 list-none font-medium text-xl my-5">Applied Trainer</li></Link>
                <Link to='balance'><li className="text-white border border-transparent hover:bg-slate-400 ps-4 py-4 list-none font-medium text-xl my-5">Balance</li></Link>
                <Link to='addClass'><li className="text-white border border-transparent hover:bg-slate-400 ps-4 py-4 list-none font-medium text-xl my-5">Add new Class</li></Link>
                <Link to='addforum'><li className="text-white border border-transparent hover:bg-slate-400 ps-4 py-4 list-none font-medium text-xl my-5">Add new Forum</li></Link>
            </div>
        </div>
    );
};

export default Admin;