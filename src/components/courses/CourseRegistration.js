import React, {Fragment} from "react";
import CourseRegTable from "./table/CourseReg";
import "../CSS/Home.css";

const CourseRegistration = () => {
    localStorage.setItem('page_title', 'Course Registration');
    return (
        <div>
            <CourseRegTable />
        </div>
    );
};

export default CourseRegistration;
