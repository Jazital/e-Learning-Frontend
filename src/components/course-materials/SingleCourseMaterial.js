import React, {Fragment} from "react";

import {Link} from "react-router-dom"

import CourseMaterialTable from "../courses/table/CourseMaterialTable";

import "../CSS/Home.css";

import classroom from "../../images/HomePageIcons/classroom.png"
import pendinassingment from "../../images/HomePageIcons/pendinassingment.png"
import discussion from "../images/discussion board icondiscussionboard.png"
import coursematerial from "../images/Vectorcourses.png"

const SingleCourseMaterial = () => {
    return (
        <>
            <div className="row">
                <div className="col-xl-12 col-lg-12 col-sm-12">
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

export default SingleCourseMaterial;
