import React from "react"
import Nav from "../nav";
import {Link, useHistory} from "react-router-dom";


function ProtectedContainer(props) {
    const history = useHistory();
    let userRole, userToken, userID = null;
    userRole = localStorage.getItem("userRole");
    userToken = localStorage.getItem("userToken");
    userID = localStorage.getItem("userID");

    // Redirect to login page if any of the above is not stored in localStorage
    (!(userRole || userToken || userID)) && history.push('/')

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
            {/*<Footer />*/}
        </div>
    )
}

export default ProtectedContainer
