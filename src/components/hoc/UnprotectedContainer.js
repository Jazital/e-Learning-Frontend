import React from "react"
import Footer from "../nav/Footer";
import Login from "../Login";

function UnprotectedContainer(props) {
    return (
        <div id="main-wrapper" className="show">
            <Login />
            <Footer />
        </div>
    )
}

export default UnprotectedContainer
