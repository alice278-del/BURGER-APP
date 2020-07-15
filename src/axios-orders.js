import axios from 'axios';



const instance = axios.create({
    baseURL:'https://react-my-burger-80406.firebaseio.com/'
});

export default instance;