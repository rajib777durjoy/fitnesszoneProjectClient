import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainRoute from '../Layout/MainRoute';
import Home from '../Pages/Home/Home';
import Login from '../Auth/Login/Login';
import Register from '../Auth/Register/Register';
import Dashboard from '../Layout/Dashboard/Dashboard';
import AllTrainer from '../Pages/Alltrainer/allTrainer';
import BecomeTrainer from '../Pages/Alltrainer/BecomeTrainer/BecomeTrainer';
import TrainerDetails from '../Pages/Alltrainer/Details/TrainerDetails';
import Bookpage from '../Pages/BookPage/Bookpage';
import AllNewsLetter from '../Pages/DashbordItem/Admin/AllNewsLetter';
import AppliedTrainer from '../Pages/DashbordItem/Admin/AppliedTrainer';
import Details from '../Pages/DashbordItem/Admin/Details';
import AddClass from '../Pages/DashbordItem/Admin/AddClass';
import AllClass from '../Pages/AllClass/AllClass';
import Paymentpage from '../Pages/Payment/Paymentpage';
import Balance from '../Pages/DashbordItem/Admin/Balance';
import Forum from '../Pages/DashbordItem/Admin/Forum';
import ForumPage from '../Pages/Forum/ForumPage';
import AllTrainerList from '../Pages/DashbordItem/Admin/AllTrainerList';
import Activity from '../Pages/DashbordItem/Member/pages/Activity';
import Profile from '../Pages/DashbordItem/Member/pages/Profile';
import BookedTrainer from '../Pages/DashbordItem/Member/pages/BookedTrainer';
import Manage from '../Pages/DashbordItem/Trainer/Manage';
import AddSlot from '../Pages/DashbordItem/Trainer/AddSlot';



const router =createBrowserRouter([
    {
        path:'/',
        element:<MainRoute></MainRoute>,
        errorElement:<h1>404 page</h1>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
             path:'/alltrainer',
             element:<AllTrainer></AllTrainer>
            },
            {
              path:'/allclasses',
              element:<AllClass></AllClass>,
              loader:()=>fetch(`http://localhost:9000/totalclass`)
            },
            {
                path:'/tainerDetails/:id',
                element:<TrainerDetails></TrainerDetails>
            },
            {
                path:'/becometrainer',
                element:<BecomeTrainer></BecomeTrainer>
            },
            {
                path:'/paymentpage/:id',
                element:<Paymentpage></Paymentpage>
            },
            {
                path:'/forums',
                element:<ForumPage></ForumPage>,
                loader:()=>fetch(`http://localhost:9000/totalforum`)
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/register',
                element:<Register></Register>
            },
            {
                path:'/trainerBookPage/:id',
                element:<Bookpage></Bookpage>
            },
           

        ]
    },
    {
        path:'/dashboard',
        element:<Dashboard></Dashboard>,
        children:[
            {
                path:'allnewsletter',
                element:<AllNewsLetter></AllNewsLetter>
            },
            {
                path:'allTrainerList',
                element:<AllTrainerList></AllTrainerList>
            },
            {
                path:'appliedTrainer',
                element:<AppliedTrainer></AppliedTrainer>
            },
            {
             path:'details/:id',
             element:<Details></Details>
            },
            {
              path:'addClass',
              element:<AddClass></AddClass>
            },
            {
                path:"balance",
                element:<Balance></Balance>
            },
            {
                path:'addforum',
                element:<Forum></Forum>
            },
            {
                path:'activity',
                element:<Activity></Activity>
            },
            {
                path:'profile',
                element:<Profile></Profile>
            },
            {
                path:'bookedtrainer',
                element:<BookedTrainer></BookedTrainer>
            },
            {
                path:'Manage',
                element:<Manage></Manage>
            },
            {
                path:'AddnewSlot',
                element:<AddSlot></AddSlot>
            },
        ]
    }
])

export default router;