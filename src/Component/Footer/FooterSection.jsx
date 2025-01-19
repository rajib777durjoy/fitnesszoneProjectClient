import { Button } from 'flowbite-react';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const FooterSection = () => {
    return (
        <div className='w-[100%] min-h-[350px]'>
          <div className='flex flex-col-reverse gap-2 items-center m-4'>
             <h1 className='text-white text-3xl'>Name:<span className='font-semibold ms-1'>FitnessZone</span></h1>
              <img src="/fitnessLogo.jpg" alt="" className='w-[70px] h-[70px] rounded-full' />
          </div>
            <div className='w-[100%] flex '>
                <div className='w-[50%] mx-auto flex justify-around text-white'>
                    <div>
                    <li>Phone: 01733757561</li>
                    <li>Email: durjoy2001@gmail.com</li>
                     <div className='flex gap-2 justify-center'>
                     <li className='list-none'><Link to='https://www.facebook.com'>Facebook</Link></li>
                     <li className='list-none'><Link to='https://x.com'>Twitter</Link></li>
                     <li className='list-none'><Link to='https://www.linkedin.com'>Linkedin</Link></li>
                     </div>
                    </div>
                    <div>
                    <h1>Address</h1>
                    <address>
                        <li>Village:BaniyaChong</li>
                        <li>Zilla:Hobigonj</li>
                        <li>Board:Sylhet</li>
                        <li>Country:Bangladesh</li>
                    </address>
                    </div>
                </div>
                <div className='w-[50%] mx-auto '>
                    <h1 className='text-white text-start text-2xl'>Send Your Contact Information</h1>
                    <form className='w-[100%]'>
                     <input className='w-[80%] mx-auto my-2 rounded-md' type="text"  placeholder='Enter Your Name'/>
                     <input className='w-[80%] mx-auto my-2 rounded-md' type="email" placeholder='Enter Your Email' />
                      <Button type='btn' className='w-[100px]'>Send</Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FooterSection;