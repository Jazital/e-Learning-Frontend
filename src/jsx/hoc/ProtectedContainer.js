import React from "react"
import Nav from "../layouts/nav";
import {Route, Switch} from "react-router-dom";
import Footer from "../layouts/Footer";

function ProtectedContainer(props) {
    return (
        <div id="main-wrapper" className="show">
            <Nav />
            <div className="content-body">
                <div className="container-fluid">
                    {props.children}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ProtectedContainer
