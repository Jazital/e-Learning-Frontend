import React from "react";
import {useHistory} from "react-router-dom";

const Logout = () => {
    const history = useHistory();
    localStorage.removeItem('userRole');
    localStorage.removeItem('userToken')
    localStorage.removeItem('userID')
    localStorage.removeItem('firstName')
    localStorage.removeItem('lastName')
    localStorage.removeItem('otherName')
    localStorage.removeItem('email')
    localStorage.removeItem('userID')
    localStorage.removeItem('matricNumber')
    localStorage.removeItem('phoneNumber')
    localStorage.removeItem('page_title')


    return (<>
        {history.push('/')}
    </>)
};

export default Logout;
