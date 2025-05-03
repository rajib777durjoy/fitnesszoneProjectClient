
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
const Trainer = () => {
    return (
        <div>
            <Helmet>
                <title>FitnessZone-Dashboard|Trainer</title>
            </Helmet>
            <Link to='Manage'><li className=" border border-transparent hover:bg-slate-50 ps-4 py-4 list-none font-medium text-lg lg:text-xl my-5">Manage Slots</li></Link>
            <Link to='AddnewSlot'><li className=" border border-transparent hover:bg-slate-50 ps-4 py-4 list-none font-medium text-lg lg:text-xl my-5">Add New slot</li></Link>
            <Link to='addforum'><li className=" border border-transparent hover:bg-slate-50 ps-4 py-4 list-none font-medium text-lg lg:text-xl my-5">Add new Forum</li></Link>
        </div>
    );
};

export default Trainer;