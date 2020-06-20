import axios from 'axios';
import { HOST } from './routes';

const instance = axios.create({
    baseURL: HOST,
    // timeout: 10000,
});

export default instance;

