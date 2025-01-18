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
                path:'/tainerDetails/:id',
                element:<TrainerDetails></TrainerDetails>
            },
            {
                path:'/becometrainer',
                element:<BecomeTrainer></BecomeTrainer>
            }
            ,
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
        element:<Dashboard></Dashboard>
    }
])

export default router;