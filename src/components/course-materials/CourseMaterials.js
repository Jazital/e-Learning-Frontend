import React, {Fragment} from "react";

import {Link} from "react-router-dom"

import CourseMaterialTable from "./CourseMaterialTable";

import "../CSS/Home.css";

const CourseMaterials = () => {
    localStorage.setItem('page_title', 'All Materials');
    return (
        <>
            <div className="row">
                <div className="col-xl-12 col-lg-12 col-sm-12">
                    {/*<h2>Course Materials</h2>*/}
                    <div className="pb-4">
                        <Link to={'/enrolled-courses'} className="btn btn-primary">Back to courses</Link>
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
