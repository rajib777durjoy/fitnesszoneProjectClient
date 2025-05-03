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
        <div className='w-[100%]  min-h-[500px] py-10 mt-5 bg-slate-100 '>
            <h1 className='text-4xl text-center font-bold mb-4'>Featured Section</h1>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 w-[90%]  mx-auto py-4 gap-4 '>
                <Card className="" imgSrc={GuidedMeditation} vertical >
                    <h5 className="lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Guided Meditation
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Relax and rejuvenate with expert-led meditation sessions for mental well-being.
                        Icon/Image: A person meditating with a peaceful background
                    </p>
                </Card>
                <Card className="" imgSrc={Cardio} vertical >
                    <h5 className="lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Cardio Workouts
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Boost your heart health with fun and effective cardio exercises like HIIT, running, or cycling.
                    </p>
                </Card>
                <Card  className="" imgSrc={Flexibility} vertical >
                    <h5 className="lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Flexibility and Mobility
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Improve your range of motion and prevent injuries with dedicated stretching routines.
                    </p>
                </Card>
                <Card className="" imgSrc={yoga} vertical >
                    <h5 className="lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Yoga Sessions
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Explore guided yoga classes for flexibility, strength, and mindfulness. Suitable for all levels.
                    </p>
                </Card>
                <Card className="" imgSrc={bodyWeight} vertical >
                    <h5 className="lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
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