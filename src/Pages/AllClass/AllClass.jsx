import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hook/useAxios";
import { Card} from "flowbite-react";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

const AllClass = () => {
   const Data=useLoaderData()
   const [itemsPerPage,setitemsPerPage]=useState(6)
   const [Selectbtn,setSelectbtn]=useState(0)
   const [count,setcount]=useState(Data?.totalPage)
   const [classData,setclassData]=useState([])
   const [search,setsearch]=useState('');
   const numberOffPages= Math.ceil(count / itemsPerPage)
   const pages=[...Array(numberOffPages).keys()]
   const axiosSecure=useAxios()
 
 useEffect(()=>{
    axiosSecure.get(`/allClass?page=${Selectbtn}&size=${itemsPerPage}`)
    .then(data=>{
        setclassData(data.data)
    })

    axiosSecure.get('/classbyTrainer')
    .then(res=>{
      console.log('classbytrainer',res.data)
    })
 },[Selectbtn,search])

 if(search){
    axiosSecure.get(`/searchClass?search=${search}`)
    .then(value=>{
        setclassData(value.data)
    })
 }
 else{
  
 }
 
   const {_id,name,image,details}=classData || {};
   
    return (
        <div>
            <div className='w-[100%] h-[70px] '></div>
            <div className="w-[50%] mx-auto my-5">
                <input onChange={(e)=>setsearch(e.target.value)} className="w-[100%] text-center bg-slate-300 rounded-md border outline-none" type="search" placeholder="Search by ClassName" name="search" id="" />
            </div>
            <div className="w-[100%] grid md:grid-cols-3 gap-4 lg:grid-cols-4">
            {
                classData?.map(item=><Card className="max-w-sm">
                    <div className="flex justify-center px-4 pt-4">
                      <img src={item?.image} className="w-[100px] h-[100px]" alt="" />
                    </div>
                    <div className="flex flex-col items-center pb-10">
                      
                      <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green:{item?.name}</h5>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Visual Designer:{item?.details}</span>
                      <div className="mt-4 flex space-x-3 lg:mt-6">
                        
                      </div>
                    </div>
                  </Card>)
            }
            </div>
            <div className=" w-[50%] mx-auto translate-x-48 mt-4">
                <button className="text-white border px-4 py-2 rounded-lg hover:bg-teal-500" onClick={()=>setSelectbtn(Selectbtn>0?Selectbtn-1:Selectbtn)}>Previous</button>
                {
                    pages.map(page=><button onClick={()=>setSelectbtn(page)} className={`text-white border px-4 py-2 mx-2 my-4 rounded-lg ${Selectbtn === page && 'bg-teal-500' || ''}`}>{page}</button>)
                }
                <button className="text-white border px-4 py-2 rounded-lg hover:bg-teal-500" onClick={()=>setSelectbtn(Selectbtn<pages.length-1?Selectbtn+1:Selectbtn)}>Next</button>
            </div>
        </div>
    );
};

export default AllClass;