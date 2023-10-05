import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.PROD ?
        '' : 'http://localhost:4000' 
})


// 요청이 보내지기 전에 어떠한 것을 하고싶을 때 여기서 설정
axiosInstance.interceptors.request.use(function(config) {
    // ✨'Bearer ' + localStorage.getItem('accessToken')를 Request Headers에 전달함으로서 요청을 보낼때 토큰도 같이 보내지도록 함!
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('accessToken');
    return config;
}, function(error) {    // 요청에 에러가 있을 경우, 여기서 처리해줌.
    return Promise.reject(error);
})

axiosInstance.interceptors.response.use(function(response) {
    return response;
}, function(error) {    
    if(error.response.data === 'jwt expired') {
        window.location.reload();   // reload를 통해 페이지 refresh 시켜줌.
    }

    return Promise.reject(error);
})

export default axiosInstance