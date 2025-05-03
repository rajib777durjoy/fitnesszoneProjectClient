
import React from 'react';
import aboutImg from '../../../assets/john-fornander-TAZoUmDqzXk-unsplash.jpg';

const About = () => {
    return (
        <div className='w-[100%] min-h-[500px] bg-slate-50 py-10'>
            <h1 className='text-center font-bold text-4xl'>About Me</h1>
            <div className='w-[90%] mx-auto md:flex items-center justify-between  py-3 rounded-md my-4'>
                <div className='md:w-[35%] w-[100%]'>
                    <img src={aboutImg} alt="" className='w-[100%] md:h-[350px] h-[220px] rounded-md' />
                </div>
                <div className='md:w-[60%] w-[100%] ms-2'>
                    <p className='lg:text-xl lg:font-semibold'>Our fitness tracker is a cutting-edge device designed to help you take charge of your health and wellness. Whether you're a beginner or a fitness enthusiast, it empowers you to track, analyze, and improve your fitness journey effortlessly. Key features include</p>
                    <li className='text-md font-medium list-decimal'>Activity Tracking: Monitor steps, distance, and calories burned daily</li>
                    <li className='text-md font-medium list-decimal'>Heart Rate Monitoring: Keep tabs on your heart rate throughout the day and during workouts.</li>
                    <li className='text-md font-medium list-decimal'>Sleep Analysis: Get insights into your sleep quality and patterns for better rest and recovery</li>
                    <li className='text-md font-medium list-decimal'>Workout Modes: Choose from multiple sports modes to accurately record your exercises</li>
                    <li className='text-md font-medium list-decimal'>Health Insights: Track your progress with user-friendly dashboards and personalized recommendations.</li>
                </div>
            </div>
        </div>
    );
};

export default About;