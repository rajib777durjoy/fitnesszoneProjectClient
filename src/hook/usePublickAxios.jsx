import axios from 'axios';


const usePublickAxios = () => {
    const instance = axios.create({
        baseURL:`http://localhost:9000`
    })
    return instance
};

export default usePublickAxios;