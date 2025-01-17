import React from 'react';

const Dashboard = () => {
    return (
        <div className='w-[100%] min-h-screen flex justify-between'>
            <div className='w-[20%] border border-red-300'>
                <div className='w-[80%] mx-auto mt-5'>
                    <h1>side bar</h1>
                    <h1>side bar</h1>
                    <h1>side bar</h1>
                    <h1>side bar</h1>
                    <h1>side bar</h1>
                    <h1>side bar</h1>
                    <h1>side bar</h1>
                </div>
            </div>
            <div className='w-[80%] border border-green-400'>
                main part
            </div>
        </div>
    );
};

export default Dashboard;