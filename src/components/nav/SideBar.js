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
        var mainContainer = document.querySelector(".container-fluid");
        mainContainer.addEventListener("click", hideSidebar);

        // Hide the sidebar when any other container is clicked outside the sidebar
        function hideSidebar(){
            return aaa.classList.remove("menu-toggle");
        }

        // Toggle the sidebar when the hamburger is clicked
        function toggleFunc() {
            return aaa.classList.toggle("menu-toggle");
        }

        btn.addEventListener("click", toggleFunc);

        ////////////////////////////////--------------------------------////////////////////////////////
        var dashboardLi = document.querySelector("#dashboard-li");
        var coursesLi = document.querySelector("#courses-li");
        var virtualLi = document.querySelector("#virtual-li");
        var discussionLi = document.querySelector("#discussion-li");
        var timetableLi = document.querySelector("#timetable-li");

        function dashboardClicked() {
            coursesLi.classList.remove("mm-active");
            virtualLi.classList.remove("mm-active");
            discussionLi.classList.remove("mm-active");
            return timetableLi.classList.remove("mm-active");
        }

        // Remove active class if another nav item is clicked
        dashboardLi.addEventListener("click", dashboardClicked);

        function coursesClicked() {
            dashboardLi.classList.remove("mm-active");
            virtualLi.classList.remove("mm-active");
            discussionLi.classList.remove("mm-active");
            return timetableLi.classList.remove("mm-active");
        }

        // Remove active class if another nav item is clicked
        coursesLi.addEventListener("click", coursesClicked);

        function virtualClassroomClicked() {
            dashboardLi.classList.remove("mm-active");
            coursesLi.classList.remove("mm-active");
            discussionLi.classList.remove("mm-active");
            return timetableLi.classList.remove("mm-active");
        }

        // Remove active class if another nav item is clicked
        virtualLi.addEventListener("click", virtualClassroomClicked);

        function discussionClassroomClicked() {
            dashboardLi.classList.remove("mm-active");
            coursesLi.classList.remove("mm-active");
            virtualLi.classList.remove("mm-active");
            return timetableLi.classList.remove("mm-active");
        }

        // Remove active class if another nav item is clicked
        discussionLi.addEventListener("click", discussionClassroomClicked);

        function timetableClassroomClicked() {
            dashboardLi.classList.remove("mm-active");
            coursesLi.classList.remove("mm-active");
            virtualLi.classList.remove("mm-active");
            return discussionLi.classList.remove("mm-active");
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
                        <li id="courses-li"
                            className={`${
                                (currentUrlPath == ("courses" || "enrolled-courses" || "assignment-list" || "course-materials" || "continuous-assessment" || "course-registration")) ? "mm-active" : ""
                            }`}
                        >
                            <Link
                                className="ai-icon" aria-expanded="false"
                                to="/courses"
                            >
                                <i className="flaticon-381-folder-5"></i>
                                <span className="nav-text">Courses</span>
                            </Link>
                            <ul>
                                <li>
                                    <Link
                                        to="/enrolled-courses">Enrolled Courses</Link>
                                </li>
                                <li>
                                    <Link
                                        to="/assignment-list">Assignments</Link>
                                </li>
                                <li>
                                    <Link
                                        to="/course-materials">Course Materials</Link>
                                </li>
                                <li>
                                    <Link
                                        to="/continuous-assessments">Continuous Assessments</Link>
                                </li>
                                <li>
                                    <Link
                                        to="/course-registration">Course Registration</Link>
                                </li>
                            </ul>
                        </li>

                        <li id="virtual-li"
                            className={`${
                                (currentUrlPath == "virtual-classrooms") ? "mm-active" : ""
                            } non-course-link`}
                        >
                            <Link
                                className="ai-icon single-nav-wrapper"
                                to="/virtual-classrooms"
                            >
                                <i className="flaticon-381-news"></i>
                                <span className="nav-text">Virtual Classroom</span>
                            </Link>
                        </li>
                        <li id="discussion-li"></li>
                        {/*<li id="discussion-li"*/}
                        {/*    className={`${*/}
                        {/*        (currentUrlPath == "discussion-board") ? "mm-active" : ""*/}
                        {/*    } non-course-link`}*/}
                        {/*>*/}
                        {/*    <Link*/}
                        {/*        className="ai-icon single-nav-wrapper"*/}
                        {/*        to="/discussion-board"*/}
                        {/*    >*/}
                        {/*        <i className="flaticon-381-background-1"></i>*/}
                        {/*        <span className="nav-text">Discussion Board</span>*/}
                        {/*    </Link>*/}
                        {/*</li>*/}
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

export default SideBar;
