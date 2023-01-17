import React from "react"
import Nav from "../nav/indexs";
import {Route, Switch} from "react-router-dom";
import Footer from "../nav/Footers";


function ProtectedContainers(props) {
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

export default ProtectedContainers
