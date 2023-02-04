import React from "react";

/// React router dom
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

/// Css
import "./index.css";
import "./chart.css";

import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import Registration from "./Registration";

import Home from "./dashboard/Home";
import ProtectedContainer from "./hoc/ProtectedContainer";
import Profile from "./Profile/Profile";
import Error404 from "../components/Error404";
import EnrolledCourses from "./courses/EnrolledCourses";
import AssignmentList from "./assignments/AssignmentList";
import CourseReg from "../components/courses/table/CourseReg";
import CheckingTable from "../components/courses/CheckingTable";
import SingleCourse from "../components/courses/SingleCourse";
import Assignment from "./assignments/Assignment";
import SingleCourseMaterial from "../components/course-materials/SingleCourseMaterial";
import Logout from "./Logout";
import CourseMaterials from "./course-materials/CourseMaterials";
import DiscussionBoard from "./discussion-board/DiscussionBoard";
import VirtualClassroom from "./virtual-classroom/VirtualClassroom";
import TimeTable from "./time-table/TimeTable";

//Staff profile
import SubmittedAssignment from "./lecturers/Courses/table/AssignmentList";
import AssignedCourse from "./lecturers/Courses/AssignedCourses";
import OnlineClasses from "./lecturers/virtual-classroom/OnlineClass";
import UploadAssignment from "./lecturers/Courses/UploadAssignment";
import SProfile from "./lecturers/Dashboard/Profile/SProfile";
import ProtectedContainers from "./lecturers/hoc/ProtectedContainerss";
import CourseMats from "./lecturers/Courses/CourseMat";
import CourseRegistration from "./courses/CourseRegistration";
import SingleDiscussionBoard from "./discussion-board/SingleDiscussionBoard";


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
                    path={`/`}
                    component={Login}
                    exact
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
                        path={`/single-course/:course_id`}
                        component={SingleCourse}
                    />
                    <Route
                        path={`/course-materials`}
                        component={CourseMaterials}
                    />
                    <Route
                        path={`/course-material/course/:course_id`}
                        component={SingleCourseMaterial}
                        exact
                    />
                    <Route
                        path={`/course-registration`}
                        component={CourseRegistration}
                        exact
                    />
                    <Route
                        path={`/discussion-board/course/:course_id`}
                        component={SingleDiscussionBoard}
                    />
                    <Route
                        path={`/discussion-board`}
                        component={DiscussionBoard}
                        exact
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
                        path={`/assignment/:id`}
                        component={Assignment}
                    />
                    <Route
                        path={`/checkingtable`}
                        component={CheckingTable}
                    />
                    <Route
                        path={`/virtual-classroom`}
                        component={VirtualClassroom}
                    />
                    <Route
                        path={`/virtual-classroom/:course_id`}
                        component={VirtualClassroom}
                    />
                    <Route
                        path={`/timetable`}
                        component={TimeTable}
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
//         component={<Upload_Assignment}
//     />
//
//     <Route
//         path={`/sprofile`}
//         component={<SProfile}
//     />
//     <Route
//         path={`/AssignedCourse`}
//         component={<AssignedCourse}
//     />
//     <Route
//         path={`/Submitted-Assignment`}
//         component={<SubmittedAssignment}
//     />
//     <Route
//         path={`/coursemats`}
//         component={<CourseMats}
//     />
//     <Route
//         path={`/OnlineClasses`}
//         component={<OnlineClasses}
//     />
// </ProtectedContainers>




