import React, {useEffect, useState} from "react"
import Nav from "../nav";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";

function ProtectedContainer(props) {
    const history = useHistory();
    let userRole, userToken, userID = null;
    userRole = localStorage.getItem("userRole");
    userToken = localStorage.getItem("userToken");
    userID = localStorage.getItem("userID");

    // Redirect to login page if any of the above is not stored in localStorage
    (!(userRole || userToken || userID)) && history.push('/')

    const [signedIn, setSignedIn] = useState(true);

    const BACKEND_BASE_URL = "http://elearning-backend.local/api/v1";
    // const BACKEND_BASE_URL = "https://pandagiantltd.com/e-learning-backend-api/api/v1";

    useEffect(() => {
        let stateUpdated = false;
        if (!stateUpdated) {
            !signedIn && history.push('/');
            verifySignedIn()
        }

        stateUpdated = false;
    }, [])

    async function verifySignedIn() {
        const endpoint = '/auth/verify-login';
        let args = {
            headers: {
                'Token': userToken,
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
        }, (failure) => {}).catch(error => {
            if (error.response.data.code === "user_signed_in") {
                setSignedIn(true);
            }
            if (error.response.data.code === "user_not_signed_in") {
                setSignedIn(false);
            }
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
