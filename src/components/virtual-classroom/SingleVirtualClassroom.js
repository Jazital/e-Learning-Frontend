import React from "react";
import "../CSS/Home.css";
import {Link, useParams} from "react-router-dom";
import SingleCourseUpcomingClassTable from "../courses/table/SingleCourseUpcomingClassTable";

const SingleVirtualClassroom = () => {
    let userRole = localStorage.getItem('userRole');
// Get ID from URL
    const {course_id} = useParams();

    return (
        <div>
            <div className="pb-4">
                {userRole == "lecturer" &&
                <Link to={'/new-virtual-classroom'} className="btn btn-primary">
                    <i className="fa fa-plus mr-2"></i>New Virtual Classroom</Link>
                }
            </div>
            <SingleCourseUpcomingClassTable courseID={course_id} />
        </div>
    );
};

export default SingleVirtualClassroom;
