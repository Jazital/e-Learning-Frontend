import React, {Fragment} from "react";
import {Link, useParams} from "react-router-dom"

import "../CSS/Home.css";
import CourseMaterialTable from "./CourseMaterialTable";

const SingleCourseMaterial = (props) => {

    // Get ID from URL
    const {course_id} = useParams();

    return (
        <>
            <div className="row">
                <div className="col-xl-12 col-lg-12 col-sm-12">
                    {/*<h2>CSC 401 Course Materials</h2>*/}
                    <div className="pb-4">
                        <Link to={'/enrolled-courses'} className="btn btn-primary">Back to courses</Link>
                    </div>
                    <div>
                        {/*Pass course ID to fetch the course material of a single course*/}
                        <CourseMaterialTable courseID={course_id} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleCourseMaterial;
