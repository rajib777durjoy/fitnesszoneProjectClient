

import { useParams } from "react-router-dom";
import useAxios from "../../hook/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Card } from "flowbite-react";
import { Helmet } from "react-helmet-async";

const Bookpage = () => {
    const { id } = useParams()
    console.log(id)

    const axiosSecure = useAxios();
    const { data = [] } = useQuery({
        queryKey: ['slot', id],
        queryFn: async () => {
            const res = await axiosSecure(`/bookedData/${id}`)
            return res.data;
        }
    })
    console.log(data)
    const { _id, name, slot, Classes } = data || {}
    return (
        <div>
            <Helmet>
                <title>FitnessZone-Bookpage</title>
            </Helmet>
            <div className='w-[100%] h-[70px]'></div>
            <h1 className='text-white'>name:{name}</h1>
            <p className="text-white">slot:{slot}</p>
            <p className="text-white flex gap-4">Classes:{Classes.map(item => <h1 className="text-white">{item}</h1>)}</p>
            <div className="grid md:grid-cols-3 gap-2 w-[90%] mx-auto">
                <Card href="#" className="max-w-sm">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Basic Membership
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                    </p>
                </Card>
                <Card href="#" className="max-w-sm">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Standard Membership
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                    </p>
                </Card>
                <Card href="#" className="max-w-sm">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Premium Membership
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">

                    </p>
                </Card>
            </div>
        </div>
    );
};

export default Bookpage;