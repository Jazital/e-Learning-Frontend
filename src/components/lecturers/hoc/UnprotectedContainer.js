import React from "react"
import Nav from "../nav";
import {Route, Switch} from "react-router-dom";
import Footer from "../nav/Footer";
import Login from "../Login";
import Registration from "../Registration";

function UnprotectedContainer(props) {
    return (
        <div id="main-wrapper" className="show">
         
          
            <Login />
            <Footer />
        </div>
    )
}

export default UnprotectedContainer
