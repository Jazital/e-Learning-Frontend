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

    useEffect(() => {
        !signedIn && history.push('/');
        verifySignedIn()
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
            // console.log(res.data.code)
            if (res.data.code == "user_signed_in") {
                setSignedIn(true);
            }
            else {
                setSignedIn(false);
            }
        }).catch(error => {
            console.log(error.response.data.code)
            if (error.response.data.code && (error.response.data.code === "user_signed_in")) {
                setSignedIn(true);
            }
            else {
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
