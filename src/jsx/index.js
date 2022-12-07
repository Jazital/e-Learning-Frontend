import React from "react";

/// React router dom
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

/// Css
import "./index.css";
import "./chart.css";

/// Layout
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";

/// Pages
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import LockScreen from "./pages/LockScreen";
import Error400 from "./pages/Error400";
import ForgotPassword from "./pages/ForgotPassword";
/// Widget
import Widget from "./pages/Widget";

/// Deshboard
import Home from "./components/Dashboard/Home/Home";
import Analytics from "./components/Dashboard/Analytics/Analytics";
import ProtectedContainer from "./hoc/ProtectedContainer";

const Markup = () => {
    const routes = [
        /// Deshborad
        {url: "analytics", component: Analytics, routeProtected: true},
        /// pages
        {url: "widget-basic", component: Widget, routeProtected: true},
        {url: "page-register", component: Registration, routeProtected: false},
        {url: "page-lock-screen", component: LockScreen, routeProtected: false},
        {url: "page-error-400", component: Error400, routeProtected: false},
        {url: "page-forgot-password", component: ForgotPassword, routeProtected: false},
    ];

    return (
        <Router basename="/">
            <Switch>
                {/*Unprotected Routes*/}
                <Route
                    exact
                    path={`/forgot-password`}
                    component={ForgotPassword}
                />

                {/*Protected Routes*/}
                <ProtectedContainer>
                    <Route
                        exact
                        path={`/dashboard`}
                        component={Home}
                    />


                </ProtectedContainer>





            </Switch>
        </Router>
    );
};

export default Markup;




