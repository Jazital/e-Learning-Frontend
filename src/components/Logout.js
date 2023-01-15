import React, {useState, useEffect} from "react";
// import {useHistory, useNavigate} from "react-router-dom";

const Logout = () => {
    // const history = useHistory();

    localStorage.removeItem('username')
    localStorage.removeItem('user_role')

    // history.push('/login')

    // const navigate = useNavigate();
    // navigate("/login");

};

export default Logout;
