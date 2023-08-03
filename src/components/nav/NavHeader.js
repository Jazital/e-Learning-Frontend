import React, {useEffect, useState} from "react";

/// React router dom
import {Link, useHistory} from "react-router-dom";

/// image
import logo from "../images/ospolylogo.png";
import axios from "axios";
import {JazitalBackendBaseURL} from "../helpers/Constants";

const NavHader = () => {
    const [toggle, setToggle] = useState(false);
    const history = useHistory();

    const BACKEND_BASE_URL = JazitalBackendBaseURL;
    let endpoint = "/courses/all";

    let userToken = localStorage.getItem('userToken') || '';
    let args = {
        headers: {
            'Authorization': userToken,
        },
    }

    useEffect(() => {
        verifySignedIn();
    }, [])

    // Verifies whether the user is signed in or not and redirect to the sign in page
    const verifySignedIn = async () => {

        await axios.get(
            BACKEND_BASE_URL + endpoint,
            args
        ).then(response => {
            if (response.data.code === 'user_not_signed_in') {
                setTimeout(() => {
                    history.push('/')
                }, 1000)
            }
        }).catch(error => {
        })
    }

    return (
        <div className="nav-header">
            <Link to="/dashboard" className="brand-logo text-yellow flex-column pt-lg-4">
                <div>
                    <img className="logo-abbr" src={logo} alt="" />
                </div>
                <div className="ml-4 header-brand-name d-none d-lg-block">Osun State Polytechnic, Iree</div>
            </Link>

            <div className="nav-control" onClick={() => setToggle(!toggle)}>
                <div className={`hamburger ${toggle ? "is-active" : ""}`}>
                    <span className="line"></span>
                    <span className="line"></span>
                    <span className="line"></span>
                </div>
            </div>
        </div>
    );
};

export default NavHader;
