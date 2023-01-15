import React from "react";

/// React router dom
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

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
            <Routes>
                {/* Unprotected Routes*/}

                <Route
                    path="/registration"
                    element={<Registration />}
                />
                <Route
                    path="/forgot-password"
                    element={<ForgotPassword />}
                />
                <Route
                    path="/"
                    element={<Login />}
                    exact
                />
                <Route
                    path="/login"
                    element={<Login />}
                />
                <Route
                    path="/logout"
                    element={<Logout />}
                />

                {/*Protected Routes*/}
                {/*Students Routes*/}
                <ProtectedContainer>
                    <Route
                        path="/dashboard"
                        element={<Home />}
                    />
                    <Route
                        path="/enrolled-courses"
                        element={<EnrolledCourses />}
                    />
                    <Route
                        path="/discussion-board"
                        element={<ChatRoom />}
                    />course-material
                    <Route
                        path="/assignment-list"
                        element={<AssignmentList />}
                    />
                    <Route
                        path="/course-reg"
                        element={<CourseReg />}
                    />
                    <Route
                        path="/assignment"
                        element={<Assignment />}
                    />
                    <Route
                        path="/checkingtable"
                        element={<CheckingTable />}
                    />
                    <Route
                        path="/upcoming-class"
                        element={<UpComingClasses />}
                    />
                    {/* <Route
                     path={`/virtual-classroom`}
                     element={<OnlineClass}
                     /> */}
                    <Route
                        path="/timetable"
                        element={<TimeTable />}
                    />
                    <Route
                        path="/course-material"
                        element={<CourseMaterial />}
                    />
                    <Route
                        path="/profile"
                        element={<Profile />}
                    />

                    {/*Lecturers Routes*/}
                    <Route
                        path="/lecturer-dashboard"
                        element={<Profile />}
                    />
                </ProtectedContainer>
                <Route
                    path="*"
                    element={<Error404 />}
                />
            </Routes>
        </Router>
    );
};

export default Markup;


// <ProtectedContainers>
//     <Route
//         path={`/uploadAssignment`}
//         element={<Upload_Assignment}
//     />
//
//     <Route
//         path={`/sprofile`}
//         element={<SProfile}
//     />
//     <Route
//         path={`/AssignedCourse`}
//         element={<AssignedCourse}
//     />
//     <Route
//         path={`/Submitted-Assignment`}
//         element={<SubmittedAssignment}
//     />
//     <Route
//         path={`/coursemats`}
//         element={<CourseMats}
//     />
//     <Route
//         path={`/OnlineClasses`}
//         element={<OnlineClasses}
//     />
// </ProtectedContainers>




