import axios from 'axios';

//this utility will add the suthorized user's JWT tp the request header
//any protected routes will require the JWT to access

const setAuthToken = (token) => {
    if (token) {
        //set in headers
        axios.defaults.headers.common['Authorization'] = token;
        console.log('HEADERS', axios.defaults.headers.common);
    } else {
        //delete auth, deny access
        delete axios.defaults.headers.common['Authorization'];
    }
};

export default setAuthToken;
