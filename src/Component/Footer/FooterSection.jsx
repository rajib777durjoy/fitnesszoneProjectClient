import { Button } from 'flowbite-react';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const FooterSection = () => {
    return (
        <div className='w-[100%] min-h-[350px] bg-slate-600 py-4 '> 
          <div className='flex flex-col-reverse gap-2 items-center m-4'>
             <h1 className='text-white text-3xl'>Name:<span className='font-semibold ms-1'>FitnessZone</span></h1>
              <img src="/fitnessLogo.jpg" alt="" className='w-[70px] h-[70px] rounded-full' />
          </div>
            <div className='w-[100%] grid lg:grid-cols-2 '>
                <div className=' w-[100%]  gap-2 grid lg:grid-cols-2  text-white'>
                    <div className='ms-10 lg:ms-0'>
                    <li>Phone: 01733757561</li>
                    <li>Email: durjoy2001@gmail.com</li>
                     <div className='flex gap-2 lg:justify-center my-2'>
                     <li className='list-none'><Link to='https://www.facebook.com'>Facebook</Link></li>
                     <li className='list-none'><Link to='https://x.com'>Twitter</Link></li>
                     <li className='list-none'><Link to='https://www.linkedin.com'>Linkedin</Link></li>
                     </div>
                    </div>
                    <div className='ms-10 lg:ms-0'>
                    <h1>Address</h1>
                    <address>
                        <li>Village:BaniyaChong</li>
                        <li>Zilla:Hobigonj</li>
                        <li>Board:Sylhet</li>
                        <li>Country:Bangladesh</li>
                    </address>
                    </div>
                </div>
                <div className='w-[100%] flex flex-col justify-center items-center md:w-[50%] mx-auto  '>
                    <h1 className='text-white text-start text-2xl'>Send Your Contact Information</h1>
                    <form className='w-[100%] flex flex-col'>
                     <input className='w-[80%] mx-auto my-2 rounded-md' type="text"  placeholder='Enter Your Name'/>
                     <input className='w-[80%] mx-auto my-2 rounded-md' type="email" placeholder='Enter Your Email' />
                      <Button type='btn' className='w-[80%] lg:w-[100px] mx-auto my-2'>Send</Button>
                    </form>
                </div>
            </div>
            <hr />
            <p className='text-center text-slate-300 my-2'>Copyright @2025</p>
        </div>
    );
};

export default FooterSection;