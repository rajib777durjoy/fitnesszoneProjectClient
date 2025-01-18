
import React from 'react';
import aboutImg from '../../../assets/john-fornander-TAZoUmDqzXk-unsplash.jpg';

const About = () => {
    return (
        <div className='w-[100%] min-h-[500px]'>
            
            <h1 className='text-center text-white font-bold text-4xl mt-4'>About Section</h1>
            <div className='w-[80%] mx-auto flex items-center justify-between bg-slate-400 p-3 rounded-md my-4'>
                <div className='w-[35%]'>
                    <img src={aboutImg} alt="" className='w-[100%] h-[300px] rounded-md' />
                </div>
                <div className='w-[60%] ms-2'>
                    <p className='text-white'>Our fitness tracker is a cutting-edge device designed to help you take charge of your health and wellness. Whether you're a beginner or a fitness enthusiast, it empowers you to track, analyze, and improve your fitness journey effortlessly. Key features include</p>
                    <li className='text-white list-decimal'>Activity Tracking: Monitor steps, distance, and calories burned daily</li>
                    <li className='text-white list-decimal'>Heart Rate Monitoring: Keep tabs on your heart rate throughout the day and during workouts.</li>
                    <li className='text-white list-decimal'>Sleep Analysis: Get insights into your sleep quality and patterns for better rest and recovery</li>
                    <li className='text-white list-decimal'>Workout Modes: Choose from multiple sports modes to accurately record your exercises</li>
                    <li className='text-white list-decimal'>Health Insights: Track your progress with user-friendly dashboards and personalized recommendations.</li>
                </div>
            </div>
        </div>
    );
};

export default About;