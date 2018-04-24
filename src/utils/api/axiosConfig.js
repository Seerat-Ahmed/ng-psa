import axios from 'axios';

const instance = axios.create({
    baseURL : 'http://188.226.149.166:5001/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// intercept requests
// instance
//   .interceptors
//   .request
//   .use((config) => {
//     // change config
//     return config;
//   });

export default instance;
