import React, { Fragment } from "react";
import { Table, Pagination } from "react-bootstrap";

import { Link } from "react-router-dom";
import CourseMaterialTable from "../Courses/table/CourseMaterialTable";
import "../CSS/Home.css";


const UpComingClasses = () => {
    return (
       <div>
            <CourseMaterialTable />
         
       </div>
    );
 };
 
 export default UpComingClasses;