import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import ScaleLoader from 'rayloading/lib/ScaleLoader';
import {Modal} from "react-bootstrap";

import "../CSS/Home.css";
import coursematerial from "../images/Vectorcourses.png"

const StaffAssignedCourses = () => {
    localStorage.setItem('page_title', 'Assigned Courses');
    document.title = localStorage.getItem('page_title')
    let userToken = localStorage.getItem('userToken');

    const [isLoading, setIsLoading] = useState(true);
    const [courses, setCourses] = useState(null)


    const BACKEND_BASE_URL = "http://elearning-backend.local/api/v1";

    useEffect(() => {
        fetchAssignedCourses();
    }, [])

    const fetchAssignedCourses = async () => {
        const endpoint = '/courses/assigned';
        let args = {
            headers: {
                'Token': userToken,
            },
            params: {
                'lecturer_id': localStorage.getItem('userID')
            },
        }
        // Making request to backend API
        await axios.get(
            BACKEND_BASE_URL + endpoint,
            args
        ).then((res) => {
            if (res.data.code && res.data.code === "courses_fetched") {
                setCourses(res.data.data.courses);
                setIsLoading(false)
            }
            else {
                console.log("No course(s) found!")
                setIsLoading(false)
            }
            // console.log(res.data)
        }).catch(error => {
            console.log(error)
            setIsLoading(false)
        })
    }

    const loadingModal = (isOpen = false) => {
        return (
            <Modal show={isOpen}>
                <ScaleLoader color="#ffffff" size="18px" margin="4px" />
            </Modal>
        );
    };

    return (
        <>
            {loadingModal(isLoading)}
            <div className="row">
                {courses && courses.map((course) => <div key={Math.random()}
                                                         className=" main-body-card col-xl-3 col-lg-6 col-sm-6">
                    <Link to={`/single-course/${course['course_id']}`}>
                        <div className="card overflow-hidden">
                            <div className="card-header media border-0 pb-788">
                                <div className="media-body">
                                    <img className="center-image" alt='' src={coursematerial} />
                                </div>
                            </div>
                            <div className="card-body pt-4 p-0">
                                <p className="centercoursetext mb-0 text-black">{course['course_code']} - {course['course_title']}</p>
                            </div>
                        </div>
                    </Link>
                </div>)}
            </div>
        </>
    );
};

export default StaffAssignedCourses;
