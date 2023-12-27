import React, {useEffect, useState} from "react";

/// React router dom
import {HashRouter as Router, Switch, Route} from "react-router-dom";

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
import EnrolledCourses from "./Courses/EnrolledCourses";
import AssignmentList from "./assignments/AssignmentList";
import SingleCourse from "../components/Courses/SingleCourse";
import Assignment from "./assignments/Assignment";
import SingleCourseMaterial from "../components/course-materials/SingleCourseMaterial";
import Logout from "./Logout";
import CourseMaterials from "./course-materials/CourseMaterials";
import DiscussionBoard from "./discussion-board/DiscussionBoard";
import VirtualClassroom from "./virtual-classroom/VirtualClassroom";
import TimeTable from "./time-table/TimeTable";
import CourseRegistration from "./Courses/CourseRegistration";
import SingleDiscussionBoard from "./discussion-board/SingleDiscussionBoard";
import SingleVirtualClassroom from "./virtual-classroom/SingleVirtualClassroom";
import ContinuousAssessment from "./continuous-assessment/ContinuousAssessment";
import SingleContinuousAssessment from "./continuous-assessment/SingleContinuousAssessment";
import StaffAssignedCourses from "./Courses/StaffAssignedCourses";
import NewVirtualClassroom from "./virtual-classroom/NewVirtualClassroom";
import NewAssignment from "./assignments/NewAssignment";
import ViewCourseMaterial from "./course-materials/ViewCourseMaterial";
import AssignCourses from "./department-admin-components/AssignCourses";
import LecturerCourses from "./department-admin-components/LecturerCourses";
import ModifyAssignedCourses from "./department-admin-components/ModifyAssignedCourses";
import UnassignedLecturerCourses from "./department-admin-components/UnassignedLecturerCourses";
import NewCourseMaterial from "./course-materials/NewCourseMaterial";
import EditAssignment from "./assignments/EditAssignment";
import LecturerAssignmentView from "./assignments/LecturerAssignmentView";
import SubmittedAssignments from "./assignments/SubmittedAssignments";
import DepartmentLecturers from "./department-admin-components/DepartmentLecturers";
import AddUser from "./Profile/AddUser";
import ModifyUser from "./Profile/ModifyUser";
import ModifyPassword from "./ModifyPassword";
import LectureAttendance from "./virtual-classroom/ClassAttendance";


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
                    path={`/modify-password`}
                    component={ModifyPassword}
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
                        path={`/new-course-material`}
                        component={NewCourseMaterial}
                    />
                    <Route
                        path={`/course-material/view/:material_id`}
                        component={ViewCourseMaterial}
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
                        path={`/assignments/course/:course_id`}
                        component={AssignmentList}
                    />
                    <Route
                        exact path={`/assignment/:assignment_id`}
                        component={Assignment}
                    />
                    <Route
                        path={`/assignment/lecturer-view/:assignment_id`}
                        component={LecturerAssignmentView}
                    />
                    <Route
                        path={`/assignment/submissions/:assignment_id`}
                        component={SubmittedAssignments}
                    />
                    <Route
                        path={`/assignment/edit/:assignment_id`}
                        component={EditAssignment}
                    />
                    <Route
                        path={`/virtual-classroom/course/:course_id`}
                        component={SingleVirtualClassroom}
                    />
                    <Route
                        path={`/virtual-classrooms`}
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
                    <Route
                        path={`/continuous-assessments`}
                        component={ContinuousAssessment}
                    />
                    <Route
                        path={`/continuous-assessment/course/:course_id`}
                        component={SingleContinuousAssessment}
                        exact
                    />

                    {/*Lecturers Routes*/}
                    <Route
                        path={`/lecturer-dashboard`}
                        component={Profile}
                    />
                    <Route
                        path={`/assigned-courses`}
                        component={StaffAssignedCourses}
                    />
                    <Route
                        path={`/new-virtual-classroom`}
                        component={NewVirtualClassroom}
                    />
                    <Route
                        path={`/lecture/attendance/:lecture_id`}
                        component={LectureAttendance}
                        exact
                    />
                    <Route
                        path={`/new-assignment`}
                        component={NewAssignment}
                    />
                    <Route
                        path={`/add-new-user`}
                        component={AddUser}
                    />
                    <Route
                        path={`/modify-user-details/:user_id`}
                        component={ModifyUser}
                    />
                    <Route
                        path={`/modify-user-details`}
                        component={ModifyUser} exact
                    />

                    {/* Department Admin Routes*/}
                    <Route
                        path={`/assign-courses`}
                        component={AssignCourses}
                    />

                    <Route
                        path={`/department-lecturers`}
                        component={DepartmentLecturers}
                    />
                    <Route
                        path={`/department-lecturers-courses/:lecturer_id`}
                        component={LecturerCourses}
                    />

                    <Route
                        path={`/modify-assigned-courses/:lecturer_id`}
                        component={ModifyAssignedCourses}
                    />
                    <Route
                        path={`/unassigned-courses/:lecturer_id`}
                        component={UnassignedLecturerCourses}
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
