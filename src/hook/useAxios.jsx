
import axios from 'axios';
import React from 'react';

const useAxios = () => {
    const instance = axios.create({
        baseURL:`http://localhost:9000`
    })
    return instance
};

export default useAxios;