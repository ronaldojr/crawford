import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;


const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
        'Authorization': "Bearer " + localStorage.getItem('access'),
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});

export const axiosFormData = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
        'Authorization': "Bearer " + localStorage.getItem('access'),
        'Content-Type': 'multipart/form-data',
    }
});

export const axiosPublic = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});

export const axiosDownload = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/octet-stream',
    }
})


axiosInstance.interceptors.response.use(
   response => response,
   error => {
       const originalRequest = error.config;

       // Prevent infinite loops
       if (error.response.status === 401 && originalRequest.url === BASE_URL+'/token-refresh/') {
           window.location.href = '/login/';
           return Promise.reject(error);
       }


       if (error.response.data.code === "token_not_valid" &&
           error.response.status === 401 && 
           error.response.statusText === "Unauthorized") 
           {

               const refreshToken = localStorage.getItem('refresh');

               if (refreshToken){
                   const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

                   // exp date in token is expressed in seconds, while now() returns milliseconds:
                   const now = Math.ceil(Date.now() / 1000);

                   if (tokenParts.exp > now) {
                       return axiosInstance
                       .post('/token-refresh/', {refresh: refreshToken})
                       .then((response) => { 
                           localStorage.setItem('access', response.data.access);
           
                           axiosInstance.defaults.headers['Authorization'] = "Bearer " + response.data.access;
                           originalRequest.headers['Authorization'] = "Bearer " + response.data.access;
           
                           return axiosInstance(originalRequest);
                       })
                       .catch(err => {
                           console.log(err)
                       });
                   }else{
                       console.log("Refresh token is expired", tokenParts.exp, now);
                       window.location.href = '/login/';
                   }
               }else{
                   console.log("Refresh token not available.")
                   window.location.href = '/login/';
               }
       }
     
    
     // specific error handling done elsewhere
     return Promise.reject(error);
 }
);


axiosFormData.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;
 
        // Prevent infinite loops
        if (error.response.status === 401 && originalRequest.url === BASE_URL+'/token-refresh/') {
            window.location.href = '/login/';
            return Promise.reject(error);
        }
 
 
        if (error.response.data.code === "token_not_valid" &&
            error.response.status === 401 && 
            error.response.statusText === "Unauthorized") 
            {
 
                const refreshToken = localStorage.getItem('refresh');
 
                if (refreshToken){
                    const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));
 
                    // exp date in token is expressed in seconds, while now() returns milliseconds:
                    const now = Math.ceil(Date.now() / 1000);
 
                    if (tokenParts.exp > now) {
                        return axiosInstance
                        .post('/token-refresh/', {refresh: refreshToken})
                        .then((response) => { 
                            localStorage.setItem('access', response.data.access);
            
                            axiosInstance.defaults.headers['Authorization'] = "Bearer " + response.data.access;
                            originalRequest.headers['Authorization'] = "Bearer " + response.data.access;
            
                            return axiosInstance(originalRequest);
                        })
                        .catch(err => {
                            console.log(err)
                        });
                    }else{
                        console.log("Refresh token is expired", tokenParts.exp, now);
                        window.location.href = '/login/';
                    }
                }else{
                    console.log("Refresh token not available.")
                    window.location.href = '/login/';
                }
        }
      
     
      // specific error handling done elsewhere
      return Promise.reject(error);
  }
 );




export default axiosInstance


























// import axios from 'axios'
// import createAuthRefreshInterceptor from 'axios-auth-refresh';

// const ACCESS_TOKEN = localStorage.getItem('access')
// const REFRESH_TOKEN = localStorage.getItem('refresh')

// axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
// axios.defaults.headers.post['Content-Type'] = 'application/json';

// if (ACCESS_TOKEN) {
//     axios.defaults.headers.common['Authorization'] = `Bearer ${ACCESS_TOKEN}`;    
// } else {
//     axios.defaults.headers.common['Authorization'] = null;
// }


// const refreshAuthMiddleware = failedRequest => { 
//     axios.post('/token/', {"refresh": REFRESH_TOKEN}).then(tokenRefreshResponse => {
//         localStorage.setItem('access', tokenRefreshResponse.data.access);
//         failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.access;
//         return Promise.resolve();
//     })
// };

// createAuthRefreshInterceptor(axios, refreshAuthMiddleware);
// console.log(REFRESH_TOKEN)
// console.log(axios.defaults.headers.common['Authorization'])
// export default axios