import React from "react";

import {Link} from "react-router-dom"

import CourseMaterialTable from "./CourseMaterialTable";

import "../CSS/Home.css";

const CourseMaterials = () => {
    localStorage.setItem('page_title', 'Course Materials');
    let userRole = localStorage.getItem('userRole');

    return (
        <>
            <div className="row">
                <div className="col-xl-12 col-lg-12 col-sm-12">
                    {/*<h2>Course Materials</h2>*/}
                    <div className="row justify-content-between">
                        <div className="pb-4">
                            {userRole == "student" &&
                            <Link to={'/enrolled-courses'} className="btn btn-primary">Back to courses</Link>}
                            {userRole == "lecturer" &&
                            <Link to={'/assigned-courses'} className="btn btn-primary">Back to courses</Link>}
                        </div>
                        <div className="pb-4">
                            {userRole == "lecturer" &&
                            <Link to={'/new-course-material'} className="btn btn-primary"><i className="fa fa-plus mr-2"></i>New Document</Link>}
                        </div>
                    </div>
                    <div>
                        <CourseMaterialTable />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CourseMaterials;
