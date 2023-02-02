import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";

const Logout = () => {
    const history = useHistory();
    localStorage.removeItem('userToken')
    localStorage.removeItem('userRole')
    localStorage.removeItem('firstName')
    localStorage.removeItem('lastName')
    localStorage.removeItem('userID')
    localStorage.removeItem('page_title')


    return (<>
        {history.push('/')}
    </>)
};

export default Logout;
