import React, {useEffect, useState} from "react"
import Nav from "../nav";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import {JazitalBackendBaseURL} from "../helpers/Constants";

function ProtectedContainer(props) {
    const history = useHistory();
    let userRole, userToken, userID = null;
    userRole = localStorage.getItem("userRole");
    userToken = localStorage.getItem("userToken");
    userID = localStorage.getItem("userID");

    // Redirect to login page if any of the above is not stored in localStorage
    (!(userRole || userToken || userID)) && history.push('/')

    const [signedIn, setSignedIn] = useState(true);

    const BACKEND_BASE_URL = JazitalBackendBaseURL;

    useEffect(() => {
        let stateUpdated = false;
        if (!stateUpdated) {
            !signedIn && history.push('/');
            // verifySignedIn()
        }

        stateUpdated = false;
    }, [])

    async function verifySignedIn() {
        const endpoint = '/auth/verify-login';
        let args = {
            headers: {
                'Authorization': userToken,
            },
        }
        // Making request to backend API
        await axios.get(
            BACKEND_BASE_URL + endpoint,
            args
        ).then((res) => {
            if (res.data.code === "user_signed_in") {
                setSignedIn(true);
            }
            if (res.data.code === "user_not_signed_in") {
                setSignedIn(false);
            }
        }).catch(error => {
            
        })
    }

    return (
        < div className="">
            <div id="main-wrapper" className="show">
                <Nav />
                <div className="content-body">
                    <div className="container-fluid">
                        {props.children}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProtectedContainer
