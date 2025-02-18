
import { Link } from 'react-router-dom';
import bannerBg from '../../../assets/valery-sysoev-LDAirERNzew-unsplash.jpg'
import { Button } from 'flowbite-react';
const Banner = () => {
    return (
        <div className='text-white  w-[100%] min-h-[500px]' style={{
            backgroundImage: `url('${bannerBg}')`,
            backgroundSize:'cover',
          }}>
            <div className='w-[100%] h-[70px] md:h-0'></div>
            <div className='w-[90%] md:w-[50%] mx-auto min-h-[400px] md:translate-y-56 md:my-5'>
               <h1 className='text-center text-slate-400 md:my-3 font-extrabold text-4xl'>Welcome to FitnessZone - Your Journey to Health Starts Here!</h1>
                <p className='md:text-center w-[100%] '>
                At FitnessZone, we are dedicated to helping you achieve your fitness goals and live a healthier, happier life. Whether you're a beginner starting your fitness journey or an athlete looking to take it to the next level, we provide expert guidance, actionable tips, and the motivation you need. 
                </p>
                <div className='w-[20%] mx-auto my-2'><Link to='/allclasses'><Button>Show Classes</Button></Link></div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#1d2645" fill-opacity="1" d="M0,288L60,282.7C120,277,240,267,360,250.7C480,235,600,213,720,208C840,203,960,213,1080,197.3C1200,181,1320,139,1380,117.3L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
        </div>
    );
};

export default Banner;