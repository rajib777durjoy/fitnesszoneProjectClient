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
   const [Trainer,setTrainer]=useState([])
   const numberOffPages= Math.ceil(count / itemsPerPage)
   const pages=[...Array(numberOffPages).keys()]
   const axiosSecure=useAxios()
 
 useEffect(()=>{
    axiosSecure.get(`/allClass?page=${Selectbtn}&size=${itemsPerPage}`)
    .then(data=>{
        setclassData(data.data)
    })

  // axiosSecure(`/classByTrainer`)
  // .then(res=>{
  //   setTrainer(res.data)
  // })
 },[Selectbtn,search])

 if(search){
    axiosSecure.get(`/searchClass?search=${search}`)
    .then(value=>{
        setclassData(value.data)
    })
 }

  const {_id,name,image,details}=classData || {};
   
    return (
        <div className="bg-slate-200">
            <div className='w-[100%] h-[70px] '></div>
            <div className="w-[90%] md:w-[50%] mx-auto my-5">
                <input onChange={(e)=>setsearch(e.target.value)} className="w-[100%] text-center bg-slate-300 rounded-md border outline-none" type="search" placeholder="Search by ClassName" name="search" id="" />
            </div>
            <div className="w-[90%] mx-auto grid md:grid-cols-2 gap-4 ">
            {
                classData?.map(item=><div className=" rounded-md shadow-md shadow-slate-400  py-4">
                    <div>
                        <img className="w-[90%] mx-auto h-[250px] rounded-md" src={item?.image} alt="" />
                    </div>
                    <div className="w-[90%] mx-auto">
                         <h1 className="text-xl font-medium ">Class Name:{item?.name}</h1>
                        <p className="text-xs">{item?.details}</p>
                    </div>
                </div>)
            }
            </div>
            <div className="w-[90%] md:w-[50%] mx-auto lg:translate-x-48 mt-4">
                <button className="text-white font-medium border px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-400" onClick={()=>setSelectbtn(Selectbtn>0?Selectbtn-1:Selectbtn)}>Previous</button>
                {
                    pages.map(page=><button onClick={()=>setSelectbtn(page)} className={`text-black  border px-4 py-2 mx-2 my-4 rounded-lg ${Selectbtn === page && 'bg-teal-600' || 'bg-slate-300'}`}>{page}</button>)
                }
                <button className="text-white font-medium border px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-400" onClick={()=>setSelectbtn(Selectbtn<pages.length-1?Selectbtn+1:Selectbtn)}>Next</button>
            </div>
        </div>
    );
};

export default AllClass;