

import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../../hook/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Button, Card } from "flowbite-react";
import { Helmet } from "react-helmet-async";
import useAuth from "../../hook/useAuth";
import { useState } from "react";
import Swal from "sweetalert2";

const Bookpage = () => {
    const { user } = useAuth()
    const navigateToPayment=useNavigate()
    // console.log(user?.email)
    // console.log('userInfo', user)
    const [SelectPackage, setSelectPackage] = useState('')
    const [activepackege,setActivepackage]=useState('')
    const { id } = useParams()

    const axiosSecure = useAxios();
    const { data = [] } = useQuery({
        queryKey: ['slot', id],
        queryFn: async () => {
            const res = await axiosSecure(`/bookedData/${id}`)
            return res.data;
        }
    })
    // console.log(SelectPackage)
     
    const handelClick=(id)=>{
         const packageName=SelectPackage.split(' ')[0]
         const price=SelectPackage.split(' ')[1]
        console.log('booked id',packageName,parseInt(price))
        const packageInfo={
            package:packageName,
            price:price,
            TrainerId:id,
            TrainerName:name,
            slot:slot,
            Classes:Classes,
            CustomerName:user?.displayName,
            CustomerEmail:user?.email,
        }
        axiosSecure.post('/packageDetails',packageInfo)
        .then(res=>{
            console.log(res.data)
            if(res.data.insertedId){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Package Book done",
                    showConfirmButton: false,
                    timer: 1500
                  });
              setSelectPackage('')
              setActivepackage('')
              navigateToPayment(`/paymentpage/${res?.data?.insertedId}`) 
            }
        })

    }
   
    const { _id, name, slot, Classes } = data || {}
    return (
        <div className="w-[100%] min-h-screen">
            <Helmet>
                <title>FitnessZone-Bookpage</title>
            </Helmet>
            <div className='w-[100%] h-[70px]'></div>
            <div className="w-[90%] mx-auto mt-20 border bg-slate-600 rounded-lg py-40">
                <div className="w-[80%] mx-auto h-[50px] grid md:grid-cols-3">
                    <h1 className="text-white text-center text-2xl font-medium capitalize">Trainer name: {name}</h1>
                    <h1 className="text-white text-center text-2xl font-medium capitalize">Selected slot: {slot}</h1>
                    <h1 className="text-white text-center text-2xl font-medium capitalize">Classes: {Classes}</h1>
                </div>
                <h1 className="text-center w-[10%] mx-auto text-white text-2xl font-medium my-2 border-b-2 -translate-x-8">Packages</h1>
               
                <div className="w-[70%] mx-auto gap-2 grid md:grid-cols-9">
                    {/* card 1 */}
                    <button className="col-span-3 " onClick={() => {
                        setActivepackage('Basic')
                        setSelectPackage('Basic 10')
                        }}>
                        <Card href="#" className={`w-[250px] h-[100px] ${activepackege==='Basic'?'bg-teal-400':''}`}>
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Basic Membership
                            </h5>
                            
                            <h1>Price:$10</h1>
                        </Card>
                    </button>
                    {/* card 2 */}
                    <button className="col-span-3" onClick={() => {
                        setActivepackage('Standard')
                        setSelectPackage('Standard 50')
                        }}>
                        <Card href="#"  className={`w-[250px] h-[100px] ${activepackege==='Standard'?'bg-teal-400':''}`}>
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Standard Membership
                            </h5>
                            
                            <h1>Price:$50</h1>
                        </Card>
                    </button>
                    {/* card 3 */}
                    <button className="col-span-3" onClick={() =>{ 
                        setActivepackage('Premium')
                        setSelectPackage('Premium 100')
                        }}>
                        <Card href="#" className={`w-[250px] h-[100px] ${activepackege==='Premium'?'bg-teal-400':''}`}>
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Premium Membership
                            </h5>
                           
                            <h1>Price:$100</h1>
                        </Card>
                    </button>
                </div>
                <div onClick={()=>handelClick(_id)} className="w-[10%] mx-auto my-4"><Button>Join Now</Button></div>
            </div>
            
        </div>
    );
};

export default Bookpage;