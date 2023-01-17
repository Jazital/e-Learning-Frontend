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

    render() {
        return (
            <div className="mm-wrapper">
                <ul className="" ref={(el) => (this.el = el)}>
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

        // var aaa = document.querySelector(".course-link");
        //
        // function navSelection(e) {
        //
        // }

        return (
            <div className="deznav">
                <PerfectScrollbar className="deznav-scroll">
                    <MM className="" id="menu">
                        <li
                            className={`${
                                (currentUrlPath == "dashboard-staff") ? "mm-active" : ""
                            }`}
                        >
                            <Link
                                className="ai-icon"
                                to="/dashboard-staff"
                            >
                                <i className="flaticon-381-networking"></i>
                                <span className="nav-text">Dashboard (Lecturer)</span>
                            </Link>
                        </li>
                        <li className={`${
                            (currentUrlPath == ("courses-staff" || "enrolled-courses-staff" || "assignment-list-staff" || "course-materials-staff" || "continuous-assessment-staff" || "course-registration-staff")) ? "mm-active" : ""
                        }`}
                        >
                            <Link
                                className="ai-icon"
                                to="/courses-staff"
                            >
                                <span className="nav-text">Courses (Lecturer)</span>
                            </Link>
                            <ul>
                                <li>
                                    <Link
                                        to="/enrolled-courses-staff">Assigned Courses</Link>
                                </li>
                                <li>
                                    <Link
                                        to="/assignment-list-staff">Assignments</Link>
                                </li>
                                <li>
                                    <Link
                                        to="/course-materials-staff">Course Materials</Link>
                                </li>
                                <li>
                                    <Link
                                        to="/continuous-assessment-staff">Continuous Assessment</Link>
                                </li>
                            </ul>
                        </li>

                        <li
                            className={`${
                                (currentUrlPath == "virtual-classroom-staff") ? "mm-active" : ""
                            }`}
                        >
                            <Link
                                className="ai-icon"
                                to="/virtual-classroom-staff"
                            >
                                <i className="flaticon-381-video-player-1"></i>
                                <span className="nav-text">Virtual Classroom</span>
                            </Link>
                        </li>
                        <li
                            className={`${
                                (currentUrlPath == "discussion-board-staff") ? "mm-active" : ""
                            }`}
                        >
                            <Link
                                className="ai-icon single-nav-wrapper"
                                to="/discussion-board"
                            >
                                <i className="flaticon-381-earth-globe-1"></i>
                                <span className="nav-text">Discussion Board</span>
                            </Link>
                        </li>
                        <li
                            className={` ${
                                (currentUrlPath == "timetable-staff") ? "mm-active" : ""
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
                        <li className="single-nav-wrapper">
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
