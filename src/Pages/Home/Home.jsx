import React from 'react';
import Banner from './Banner/Banner';
import useAuth from '../../hook/useAuth';
import { Helmet } from 'react-helmet-async';
import Features from './Features/Features';
import FeatureClass from './FeaturesClass/FeatureClass';
import Testimonials from './Testimonials/Testimonials';
import Newsletter from './News/Newsletter';
import About from './About/About';
import TeamSection from './TeamSection/TeamSection';
import Forum from '../DashbordItem/Admin/Forum';
import ForumPost from './ForumPost/ForumPost';
import Success from '../../Success/Success';

const Home = () => {
    const {name}=useAuth()
    return (
        <div className='w-[100%] '>
            <Helmet>
                <title>FitnessZone-Home</title>
            </Helmet>
            <Banner></Banner>
            <Success></Success>
            <Features></Features>
            <About></About>
            <FeatureClass></FeatureClass>
            <Testimonials></Testimonials>
            <TeamSection></TeamSection>
            <ForumPost></ForumPost>
            <Newsletter></Newsletter>
        </div>
    );
}; 
export default Home;