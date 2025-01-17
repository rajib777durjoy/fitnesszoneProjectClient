import React from 'react';
import Trainer from '../../../assets/trainerImg.jpg'
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
const BeATrainer = () => {
    return (
        <div className='w-[90%] mx-auto h-[400px] my-2' style={{
            backgroundImage:`url('${Trainer}')`,
        }}>
           <h1 className='w-[20%] mx-auto translate-y-56  '>
            <Link to='/becometrainer'><Button className='w-[100%] '>Become a Trainer</Button></Link>
           </h1>
        </div>
    );
};

export default BeATrainer;