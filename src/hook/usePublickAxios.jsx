import axios from 'axios';


const usePublickAxios = () => {
    const instance = axios.create({
        baseURL:`https://fitness-zone-server-xi.vercel.app`
    })
    return instance
};

export default usePublickAxios;