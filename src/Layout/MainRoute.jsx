
import React from 'react';
import HeaderNav from '../Component/Navbar/HeaderNav';
import { Outlet } from 'react-router-dom';
import FooterSection from '../Component/Footer/FooterSection';

const MainRoute = () => {
    return (
        <div className='w-[100%] min-h-screen '>
            <HeaderNav></HeaderNav>
             <div className=' '>
             <Outlet></Outlet>
             </div>
            <div className='w-[100%] h-[100px]'></div>
            <FooterSection></FooterSection>
        </div>
    );
};

export default MainRoute;