import React from 'react';
import CountUp from 'react-countup';

const Success = () => {
    return (
        <div className='w-[100%] min-h-[200px] py-6 my-4 '>
            <div className='w-[90%] mx-auto grid md:grid-cols-3 gap-4  h-[100%] my-auto '>
            <div className='rounded-md text-center bg-slate-200 shadow-md shadow-slate-400'>
                <h1 className='mt-10'>Total User</h1>
                <CountUp start={0} end={20} delay={5}>
                </CountUp>
            </div>
            <div className='rounded-md text-center bg-slate-200 shadow-md shadow-slate-400 py-2'>
                <h1 className='mt-10'>Total Trainer</h1>
                <CountUp start={0} end={30} delay={5}>
                </CountUp>
            </div>
            <div className='rounded-md text-center bg-slate-200 shadow-md shadow-slate-400'>
                <h1 className='mt-10'>Total Class</h1>
                <CountUp start={0} end={80} delay={5}>
                </CountUp>
            </div>
            </div>
        </div>
    );
};

export default Success;