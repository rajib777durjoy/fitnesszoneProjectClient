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
            }
        ]
    }
])

export default router;