import React from "react";
import "../CSS/Home.css";
import {useParams} from "react-router-dom";
import SingleCourseUpcomingClassTable from "../courses/table/SingleCourseUpcomingClassTable";

const SingleVirtualClassroom = () => {
// Get ID from URL
    const {course_id} = useParams();

    return (
        <div>
            <SingleCourseUpcomingClassTable courseID={course_id} />
        </div>
    );
};

export default SingleVirtualClassroom;
