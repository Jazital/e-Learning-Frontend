import React from "react";
import CourseRegTable from "./table/CourseReg";
import "../CSS/Home.css";

const CourseRegistration = () => {
    localStorage.setItem('page_title', 'Course Registration');
    return (
        <div>
            <CourseRegTable />
            <button className="btn btn-primary mt-3">Register Courses</button>
        </div>
    );
};

export default CourseRegistration;
