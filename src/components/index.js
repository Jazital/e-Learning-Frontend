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
import BasicDatatable from "../components/Courses/table/BasicDatatable";
import AssignmentList from "../components/Courses/table/AssignmentList";
import CheckingTable from "../components/Courses/CheckingTable";
import CourseMaterial from "../components/Courses/CourseMaterial";
import UpComingClasses from "../components/virtual-classroom/UpComingClasses";
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

              {/*Protected Routes*/} 
                <ProtectedContainer>

                      <Route
                        
                        exact path={`/`}
                        component={Home}
                    />
                      <Route
                        
                        path={`/dashboard`}
                        component={Home}
                    />
             
                      <Route
                        
                        path={`/enrolledcourses`}
                        component={EnrolledCourses}
                    />
                      <Route
                        
                        path={`/AssignmentList`}
                        component={AssignmentList}
                    />
                      <Route
                        
                        path={`/checkingtable`}
                        component={CheckingTable}
                    />
                     
                      <Route
                        
                        path={`/upcomingclass`}
                        component={UpComingClasses}
                    />
                      <Route
                        
                        path={`/timetable`}
                        component={TimeTable}
                    />
                      <Route
                        
                        path={`/CourseMaterial`}
                        component={CourseMaterial}
                    />
                      
                                                     
                      <Route
                        
                        path={`/Profile`}
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




