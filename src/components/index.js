import React from "react";

/// React router dom
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

/// Css
import "./index.css";
import "./chart.css";

import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import Registration from "./Registration";

// Deshboard
import Home from "./Home";
import ProtectedContainer from "./hoc/ProtectedContainer";
import Profile from "../components/Dashboard/Profile/Profile";
import UnprotectedContainer from "../components/hoc/UnprotectedContainer";
import Error404 from "../components/Error404";
import EnrolledCourses from "./Courses/EnrolledCourses";
import AssignmentList from "../components/Courses/table/AssignmentList";
import CourseReg from "../components/Courses/table/CourseReg";
import CheckingTable from "../components/Courses/CheckingTable";
import CourseMaterial from "../components/Courses/CourseMaterial";
import Assignment from "../components/Courses/Assignment";
import CourseMat from "../components/Courses/CourseMat";

import ChatRoom from "../components/Courses/ChatRoom";
import UpComingClasses from "../components/virtual-classroom/UpComingClasses";
import TimeTable from "../components/TimeTable/TimeTable";

//Staff profile
import SubmittedAssignment from "./Workers/Courses/table/AssignmentList";
import AssignedCourse from "./Workers/Courses/AssignedCourses";
import OnlineClasses from "./Workers/virtual-classroom/OnlineClass";
import UploadAssignment from "./Workers/Courses/UploadAssignment";
import SProfile from "./Workers/Dashboard/Profile/SProfile";
import ProtectedContainers from "./Workers/hoc/ProtectedContainerss";
import CourseMats from "./Workers/Courses/CourseMat";
import Logout from "./Logout";

const Markup = () => {
    return (
        <Router basename="/">
            <Switch>
                {/* Unprotected Routes*/}

                <Route
                    path={`/registration`}
                    component={Registration}
                />
                <Route
                    path={`/forgot-password`}
                    component={ForgotPassword}
                />
                <Route
                    exact path={`/`}
                    component={Login}
                />
                <Route
                    path={`/login`}
                    component={Login}
                />
                <Route
                path={`/logout`}
                component={Logout}
            />

                {/*Protected Routes*/}
                {/*Students Routes*/}
                <ProtectedContainer>
                    <Route
                        path={`/dashboard`}
                        component={Home}
                    />
                    <Route
                        path={`/enrolled-courses`}
                        component={EnrolledCourses}
                    />
                    <Route
                        path={`/discussion-board`}
                        component={ChatRoom}
                    />
                    <Route
                        path={`/assignment-list`}
                        component={AssignmentList}
                    />
                    <Route
                        path={`/course-reg`}
                        component={CourseReg}
                    />
                    <Route
                        path={`/assignment`}
                        component={Assignment}
                    />
                    <Route
                        path={`/checkingtable`}
                        component={CheckingTable}
                    />
                    <Route
                        path={`/upcoming-class`}
                        component={UpComingClasses}
                    />
                    {/* <Route
                     path={`/virtual-classroom`}
                     component={OnlineClass}
                     /> */}
                    <Route
                        path={`/timetable`}
                        component={TimeTable}
                    />
                    <Route
                        path={`/course-material`}
                        component={CourseMaterial}
                    />
                    <Route
                        path={`/profile`}
                        component={Profile}
                    />

                    {/*Lecturers Routes*/}
                    <Route
                        path={`/lecturer-dashboard`}
                        component={Profile}
                    />
                </ProtectedContainer>
                <Route
                    path="*"
                    component={Error404}
                />
            </Switch>
        </Router>
    );
};

export default Markup;


// <ProtectedContainers>
//     <Route
//         path={`/uploadAssignment`}
//         component={Upload_Assignment}
//     />
//
//     <Route
//         path={`/sprofile`}
//         component={SProfile}
//     />
//     <Route
//         path={`/AssignedCourse`}
//         component={AssignedCourse}
//     />
//     <Route
//         path={`/Submitted-Assignment`}
//         component={SubmittedAssignment}
//     />
//     <Route
//         path={`/coursemats`}
//         component={CourseMats}
//     />
//     <Route
//         path={`/OnlineClasses`}
//         component={OnlineClasses}
//     />
// </ProtectedContainers>




