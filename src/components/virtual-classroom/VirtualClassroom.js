import React from "react";
import VirtualClassroomTable from "./VirtualClassroomTable";
import "../CSS/Home.css";

const VirtualClassroom = () => {
    localStorage.setItem('page_title', 'Virtual Classroom');
    return (
        <div>
            <VirtualClassroomTable />
        </div>
    );
};

export default VirtualClassroom;
