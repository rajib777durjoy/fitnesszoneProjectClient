import React from 'react';
import { useEffect, useState } from "react";
const ForumPage = () => {
    // const [count,setcount]=useState(Data?.totalPage)
    const [itemsPerPage, setitemsPerPage] = useState(6)
    const [Selectbtn, setSelectbtn] = useState(0)
    const numberOffPages= Math.ceil(count / itemsPerPage)
   const pages=[...Array(numberOffPages).keys()]
    return (
        <div>

            <div className=" w-[50%] mx-auto translate-x-48 mt-4">
                <button className="text-white border px-4 py-2 rounded-lg hover:bg-teal-500" onClick={() => setSelectbtn(Selectbtn > 0 ? Selectbtn - 1 : Selectbtn)}>Previous</button>
                {
                    pages.map(page => <button onClick={() => setSelectbtn(page)} className={`text-white border px-4 py-2 mx-2 my-4 rounded-lg ${Selectbtn === page && 'bg-teal-500' || ''}`}>{page}</button>)
                }
                <button className="text-white border px-4 py-2 rounded-lg hover:bg-teal-500" onClick={() => setSelectbtn(Selectbtn < pages.length - 1 ? Selectbtn + 1 : Selectbtn)}>Next</button>
            </div>
        </div>
    );
};

export default ForumPage;