
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
const BeATrainer = () => {
    return (
        <div className='w-[60%] mx-auto h-[200px] my-2 rounded-lg border bg-slate-400'>
           <h1 className='w-[20%] mx-auto translate-y-20'>
            <Link to='/becometrainer'><Button className='w-[100%] '>Become a Trainer</Button></Link>
           </h1>
        </div>
    );
};

export default BeATrainer;