import axios from 'axios'

export const axiosClient=axios.create({
    baseURL:process.env.BACKEND_ADDRESS,
    withCredentials:true
});

axiosClient.interceptors.request.use(
    (request)=>{
        const accessToken=localStorage.getItem("KEY_ACCESS_TOKEN");
        request.headers['Authorization ']=`Bearer ${accessToken}`
        return request;
    }
)

axiosClient.interceptors.response.use(
    async(response)=>{
        const data=response.data;
        if(data.status==="ok"){
            return response;
        }
        const originalRequest=response.config;
        const statusCode=data.statusCode;
        const error=data.message;
        window.location.replace('/login','_self');
        return Promise.reject(error);
    }
)
