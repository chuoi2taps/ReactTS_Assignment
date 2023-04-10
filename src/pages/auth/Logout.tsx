import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const Logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userInfo');
    
    return <Navigate to= "/" />   
    
};

export default Logout;
