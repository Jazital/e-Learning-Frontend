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
import Assignment from "../components/Courses/Assignment";
import CourseMaterial from "../components/Courses/CourseMaterial";
import PatientTable from "../components/Courses/table/PatientTable";


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
                        
                        path={`/dashboard`}
                        component={Home}
                    />
             
                      <Route
                        
                        path={`/enrolledcourses`}
                        component={EnrolledCourses}
                    />
                      <Route
                        
                        path={`/assignments`}
                        component={BasicDatatable}
                    />
                      <Route
                        
                        path={`/assignments-file`}
                        component={Assignment}
                    />
                      <Route
                        
                        path={`/CourseMaterial`}
                        component={CourseMaterial}
                    />
                        <Route
                          
                          path={`/virtual-classroom`}
                          component={PatientTable}
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




