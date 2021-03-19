import axios from 'axios';

const Mongo_port = 3101; // if change, also need to change in ../backend/server.js's app.listen(3100);
const instance = axios.create({
    baseURL: `http://localhost:${Mongo_port}/`,
    withCredentials: false,
});

export default instance;