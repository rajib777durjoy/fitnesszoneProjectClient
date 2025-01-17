import { Card } from 'flowbite-react';
import React from 'react';
import BeATrainer from './BeATrainer/BeATrainer';

const AllTrainer = () => {
    return (
        <div className='w-[100%] min-h-screen '>
            <div className='w-[90%] mx-auto translate-y-20'>
                <div>
                    <Card className="max-w-sm" imgSrc="/images/blog/image-4.jpg" horizontal>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Noteworthy technology acquisitions 2021
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                        </p>
                    </Card>
                </div>
                <div>
                    <BeATrainer></BeATrainer>
                </div>
            </div>

        </div>
    );
};

export default AllTrainer;