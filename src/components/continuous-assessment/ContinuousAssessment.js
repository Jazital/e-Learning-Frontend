import React from "react";

import {Link} from "react-router-dom"

import "../CSS/Home.css";
import ContinuousAssessmentTable from "./ContinuousAssessmentTable";

const ContinuousAssessment = () => {
    localStorage.setItem('page_title', 'Continuous Assessments');

    let userRole = localStorage.getItem('userRole');

    return (
        <>
            <div className="row">
                <div className="col-xl-12 col-lg-12 col-sm-12">
                    {/*<h2>Course Materials</h2>*/}
                    <div className="pb-4">
                        {userRole=="student" && <Link to={'/enrolled-courses'} className="btn btn-primary">Back to courses</Link> }
                        {userRole=="lecturer" && <Link to={'/assigned-courses'} className="btn btn-primary">Back to courses</Link> }
                    </div>
                    <div>
                        <ContinuousAssessmentTable />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContinuousAssessment;
