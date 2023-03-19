import React from "react";
import VirtualClassroomTable from "./VirtualClassroomTable";
import "../CSS/Home.css";
import {Link} from "react-router-dom";

const VirtualClassroom = () => {
    localStorage.setItem('page_title', 'Virtual Classroom');
    let userRole = localStorage.getItem('userRole');
    return (
        <div>
                <div className="pb-4">
                    {userRole == "lecturer" &&
                    <Link to={'/new-virtual-classroom'} className="btn btn-primary">New Virtual Classroom</Link>}                </div>

            <VirtualClassroomTable />
        </div>
    );
};

export default VirtualClassroom;
