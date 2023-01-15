import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {Navigate} from "react-router-dom";

const Logout = () => {
    // const history = useHistory();
    localStorage.removeItem('username')
    localStorage.removeItem('user_role')

    return (<Navigate to="/" />)
};

export default Logout;
