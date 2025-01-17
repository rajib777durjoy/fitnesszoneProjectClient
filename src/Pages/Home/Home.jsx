import React from 'react';
import Banner from './Banner/Banner';
import useAuth from '../../hook/useAuth';
import { Helmet } from 'react-helmet-async';
import Features from './Features/Features';
import FeatureClass from './FeaturesClass/FeatureClass';
import Testimonials from './Testimonials/Testimonials';
import Forum from './Forum/Forum';
import Newsletter from './News/Newsletter';

const Home = () => {
    const {name}=useAuth()
    return (
        <div>
            <Helmet>
                <title>FitnessZone-Home</title>
            </Helmet>
            <Banner></Banner>
            <Features></Features> 
            <FeatureClass></FeatureClass>
            <Testimonials></Testimonials>
            <Forum></Forum>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;