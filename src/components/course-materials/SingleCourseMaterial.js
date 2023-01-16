import React, {Fragment} from "react";

import {Link} from "react-router-dom"

import SingleCourseMaterials from "./SingleCourseMaterialsTable";

import "../CSS/Home.css";

const SingleCourseMaterial = () => {
    localStorage.setItem('page_title', 'CSC 401 Materials');
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
                        <SingleCourseMaterials courseID={15} />
                    </div>

                </div>
            </div>
        </>
    );
};

export default SingleCourseMaterial;
