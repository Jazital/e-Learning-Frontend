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
import OnlineClass from "../components/virtual-classroom/OnlineClass";
import TimeTable from "../components/TimeTable/TimeTable";


const Markup = () => {

    return (
        <Router basename="/">
            <Switch>
                
                
                  {/*Unprotected Routes*/} 
                <Route
                    
                    path={`/login`}
                    component={Login}
                    />
            

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
              {/*Protected Routes*/} 
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
                        
                        path={`/coursemat`}
                        component={CourseMat}
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
                        
                        path={`/CourseReg`}
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
                      <Route
                    
                        
                        path={`/virtual-classroom`}
                        component={OnlineClass}
                    />
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




