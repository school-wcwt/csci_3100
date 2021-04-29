import axios from 'axios';

const backendPort = process.env.REACT_APP_BACKEND_PORT; // if change, also need to change in ../backend/server.js's app.listen(3100);
/**
 * - Backend connection with Mongo DB
 * - Put your route and contect here
 */
const instance = axios.create({
    baseURL: `http://localhost:${backendPort}/`,
    withCredentials: true,
});

export default instance;