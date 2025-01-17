
import React from 'react';
import HeaderNav from '../Component/Navbar/HeaderNav';
import { Outlet } from 'react-router-dom';
import FooterSection from '../Component/Footer/FooterSection';

const MainRoute = () => {
    return (
        <div className='bg-black w-[100%]'>
            <HeaderNav></HeaderNav>
            this is main page
            <Outlet></Outlet>
            <FooterSection></FooterSection>
        </div>
    );
};

export default MainRoute;