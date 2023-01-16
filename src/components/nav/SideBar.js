import React, {Component} from "react";

/// Link
import {Link} from "react-router-dom";

/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";

/// Menu
import MetisMenu from "metismenujs";

class MM extends Component {
    componentDidMount() {
        this.$el = this.el;
        this.mm = new MetisMenu(this.$el);
    }

    // componentWillUnmount() {
    //     this.mm("dispose");
    // }

    render() {
        return (
            <div className="mm-wrapper">
                <ul className="metismenu" ref={(el) => (this.el = el)}>
                    {this.props.children}
                </ul>
            </div>
        );
    }
}

class SideBar extends Component {
    /// Open menu
    componentDidMount() {
        // sidebar open/close
        var btn = document.querySelector(".nav-control");
        var aaa = document.querySelector("#main-wrapper");

        function toggleFunc() {
            return aaa.classList.toggle("menu-toggle");
        }

        btn.addEventListener("click", toggleFunc);
    }

    render() {
        /// Get the URL path
        const path = window.location.pathname;
        const currentUrlPath = path.slice(1);

        return (
            <div className="deznav">
                <PerfectScrollbar className="deznav-scroll">
                    <MM className="metismenu" id="menu">
                        <li
                            className={`${
                                (currentUrlPath == "dashboard") ? "mm-active" : ""
                            }`}
                        >
                            <Link
                                className="ai-icon"
                                to="/dashboard"
                            >
                                <i className="flaticon-381-networking"></i>
                                <span className="nav-text">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="has-arrow ai-icon"
                                to="/courses"
                            >
                                <span className="nav-text">Courses</span>
                            </Link>
                            <ul>
                                <li>
                                    <Link to="/enrolled-courses">Enrolled Courses</Link>
                                </li>
                                <li>
                                    <Link to="/assignment-list">Assignments</Link>
                                </li>
                                <li>
                                    <Link to="/course-materials">Course Materials</Link>
                                </li>
                                <li>
                                    <Link to="/continuous-assessment">Continuous Assessment</Link>
                                </li>
                            </ul>
                        </li>

                        <li
                        className={`${
                            (currentUrlPath == "virtual-classroom") ? "mm-active" : ""
                        }`}
                        >
                            <Link
                                className="ai-icon"
                                to="/virtual-classroom"
                            >
                                <i className="flaticon-381-video-player-1"></i>
                                <span className="nav-text">Virtual Classroom</span>
                            </Link>
                        </li>
                        <li
                        className={`${
                            (currentUrlPath == "discussion-board") ? "mm-active" : ""
                        }`}
                        >
                            <Link
                                className="ai-icon"
                                to="/discussion-board"
                            >
                                <i className="flaticon-381-earth-globe-1"></i>
                                <span className="nav-text">Discussion Board</span>
                            </Link>
                        </li>
                        <li
                        className={`${
                            (currentUrlPath == "timetable") ? "mm-active" : ""
                        }`}
                        >
                            <Link
                                className="ai-icon"
                                to="/timetable"
                            >
                                <i className="flaticon-381-list"></i>
                                <span className="nav-text">Timetable</span>
                            </Link>
                        </li>
                        {/*<li*/}
                        {/*className={`${*/}
                        {/*    (currentUrlPath == "help") ? "mm-active" : ""*/}
                        {/*}`}*/}
                        {/*>*/}
                        {/*    <Link*/}
                        {/*        className=" ai-icon"*/}
                        {/*        to="/help"*/}
                        {/*    >*/}
                        {/*        <i className="flaticon-381-help-1"></i>*/}
                        {/*        <span className="nav-text">Help</span>*/}
                        {/*    </Link>*/}
                        {/*</li>*/}
                        <li>
                            <Link
                                className=" ai-icon"
                                to="/logout"
                            >
                                <i className="flaticon-381-exit-2"></i>
                                <span className="nav-text">Logout</span>
                            </Link>
                        </li>
                    </MM>

                </PerfectScrollbar>
            </div>
        );
    }
}

export default SideBar;
