import { Button } from 'flowbite-react';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaFacebook } from 'react-icons/fa';
import { FaSquareInstagram, FaSquareXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const FooterSection = () => {
    return (
        <div className='w-[100%] min-h-[100px] bg-slate-600 py-2'> 
          <div className='w-[90%]  mx-auto flex flex-row-reverse gap-2 items-center justify-center '>
             <h1 className='text-white text-3xl'><span className='font-semibold ms-1'>FitnessZone</span></h1>
              <img src="/fitnessLogo.jpg" alt="" className='w-[50px] h-[50px] rounded-full' />
          </div>
         <div className='flex justify-between  w-[8%] mx-auto mb-4'>
            <Link className='text-2xl text-white '><FaFacebook /></Link>
            <Link className='text-2xl text-white '><FaSquareXTwitter /></Link>
            <Link className='text-2xl text-white '><FaSquareInstagram /></Link>
         </div>    
            <hr />
            <p className='text-center text-slate-300 my-2'>Copyright @2025</p>
        </div>
    );
};

export default FooterSection;