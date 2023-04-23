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

class SideBarDepartmentAdmin extends Component {
    /// Open menu
    componentDidMount() {
        // sidebar open/close
        var btn = document.querySelector(".nav-control");
        var aaa = document.querySelector("#main-wrapper");
        var mainContainer = document.querySelector(".container-fluid");
        mainContainer.addEventListener("click", hideSidebar);

        // Hide the sidebar when any other container is clicked outside the sidebar
        function hideSidebar() {
            return aaa.classList.remove("menu-toggle");
        }

        // Toggle the sidebar when the hamburger is clicked
        function toggleFunc() {
            return aaa.classList.toggle("menu-toggle");
        }

        btn.addEventListener("click", toggleFunc);

        ////////////////////////////////--------------------------------////////////////////////////////
        var dashboardLi = document.querySelector("#dashboard-li");
        var departentLecturersLi = document.querySelector("#department-lecturer-li");
        var timetableLi = document.querySelector("#timetable-li");

        function dashboardClicked() {
            departentLecturersLi.classList.remove("mm-active");
            return timetableLi.classList.remove("mm-active");
        }

        // Remove active class if another nav item is clicked
        dashboardLi.addEventListener("click", dashboardClicked);


        function discussionClassroomClicked() {
            dashboardLi.classList.remove("mm-active");
            return timetableLi.classList.remove("mm-active");
        }

        // Remove active class if another nav item is clicked
        departentLecturersLi.addEventListener("click", discussionClassroomClicked);

        function timetableClassroomClicked() {
            dashboardLi.classList.remove("mm-active");
            return departentLecturersLi.classList.remove("mm-active");
        }

        // Remove active class if another nav item is clicked
        timetableLi.addEventListener("click", timetableClassroomClicked);
    }

    render() {
        /// Get the URL path
        const path = window.location.pathname;
        const currentUrlPath = path.slice(1);

        return (
            <div className="deznav">
                <PerfectScrollbar className="deznav-scroll">

                    <MM className="" id="menu">
                        <li
                            id="dashboard-li"
                            className={`${
                                (currentUrlPath == "dashboard") ? "mm-active" : ""
                            } non-course-link`}
                        >
                            <Link
                                className="ai-icon"
                                to="/dashboard"
                            >
                                <i className="flaticon-381-networking"></i>
                                <span className="nav-text">Dashboard</span>
                            </Link>
                        </li>

                        <li id="department-lecturer-li"
                            className={`${
                                (currentUrlPath == "assign-courses") ? "mm-active" : ""
                            }`}
                        >
                            <Link
                                className="ai-icon single-nav-wrapper"
                                to="/assign-courses"
                            >
                                <i className="flaticon-381-background-1"></i>
                                <span className="nav-text">Assign Courses</span>
                            </Link>
                        </li>

                        <li id="department-lecturer-li"
                            className={`${
                                ((currentUrlPath == "assign-courses") || (currentUrlPath=="department-lecturers")) ? "mm-active" : ""
                            }`}
                        >
                            <Link
                                className="ai-icon single-nav-wrapper"
                                to="/department-lecturers"
                            >
                                <i className="flaticon-381-user-9"></i>
                                <span className="nav-text">Manage Lecturers</span>
                            </Link>
                        </li>
                        <li id="timetable-li"
                            className={`single-nav-wrapper ${
                                (currentUrlPath == "timetable") ? "mm-active" : ""
                            } non-course-link`}
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

export default SideBarDepartmentAdmin;
