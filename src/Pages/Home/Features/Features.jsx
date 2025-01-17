import { Card } from 'flowbite-react';
import React from 'react';
import stritchingImg from '../../../assets/stretchingGuideImg.jpg'
import GuidedMeditation from '../../../assets/Guided-Meditation.jpg'
import Cardio from '../../../assets/CardioworkoutImg.jpg'
import Flexibility from '../../../assets/Flexibilityimg.jpg'
import yoga from '../../../assets/Yoga.jpg'
import bodyWeight from '../../../assets/Bodyweight.jpg'
const Features = () => {
    return (
        <div className='w-[100%]'>
            <h1 className='text-white text-4xl text-center font-bold my-5'>Featured Section</h1>
            <div className='grid grid-cols-3 w-[90%] mx-auto py-4 gap-2 '>
                <Card className="max-w-sm" imgSrc={stritchingImg} horizontal>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Stretching Guide
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        A simple guide with step-by-step instructions and animations for basic stretches to improve flexibility and reduce injury risk.
                    </p>
                </Card>
                <Card className="max-w-sm" imgSrc={GuidedMeditation} horizontal>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Guided Meditation
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Relax and rejuvenate with expert-led meditation sessions for mental well-being.
                        Icon/Image: A person meditating with a peaceful background
                    </p>
                </Card>
                <Card className="max-w-sm" imgSrc={Cardio} horizontal>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Cardio Workouts
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Boost your heart health with fun and effective cardio exercises like HIIT, running, or cycling.
                    </p>
                </Card>
                <Card className="max-w-sm" imgSrc={Flexibility} horizontal>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Flexibility and Mobility
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Improve your range of motion and prevent injuries with dedicated stretching routines.
                    </p>
                </Card>
                <Card className="max-w-sm" imgSrc={yoga} horizontal>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Yoga Sessions
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Explore guided yoga classes for flexibility, strength, and mindfulness. Suitable for all levels.
                    </p>
                </Card>
                <Card className="max-w-sm" imgSrc={bodyWeight} horizontal>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Bodyweight Exercises
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        No equipment? No problem! Access easy-to-follow exercises that use your body weight for strength.
                    </p>
                </Card>
            </div>
        </div>

    );
};

export default Features;