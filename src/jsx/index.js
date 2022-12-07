import React from "react";

/// React router dom
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

/// Css
import "./index.css";
import "./chart.css";

import Login from "../components/Login";
import ForgotPassword from "../components/ForgotPassword";

/// Deshboard
import Home from "../components/Home";
import ProtectedContainer from "../components/hoc/ProtectedContainer";
import Error404 from "../components/Error404";

const Markup = () => {

    return (
        <Router basename="/">
            <Switch>
                {/*Protected Routes*/}
                <ProtectedContainer>
                    <Route
                        exact
                        path={`/dashboard`}
                        component={Home}
                    />
                </ProtectedContainer>


                {/*Unprotected Routes*/}
                <Route
                    exact
                    path={`/login`}
                    component={Login}
                />
                <Route
                    exact
                    path={`/forgot-password`}
                    component={ForgotPassword}
                />

                <Route
                    path="*"
                    component={Error404}
                />

            </Switch>
        </Router>
    );
};

export default Markup;




