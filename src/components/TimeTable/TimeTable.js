
import React, { Fragment } from "react";
import { Table, Pagination } from "react-bootstrap";

import { Link } from "react-router-dom";
import Timetable from "../images/AKSCOE-Lecture-Timetable-1 1.png"
import Timetable2 from "../images/AKSCOE-Lecture-Timetable-2 1.png"

import "../CSS/Home.css";


const TimeTable = () => {
    return (
       <div>
            
            <img
			src={Timetable}
            />
            <br/>
            <br/>
            <br/>
            <img
			src={Timetable2}
            />
         
       </div>
    );
 };
 
 export default TimeTable;

