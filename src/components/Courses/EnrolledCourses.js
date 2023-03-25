import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import ScaleLoader from 'rayloading/lib/ScaleLoader';
import {Modal} from "react-bootstrap";

import "../CSS/Home.css";
import coursematerial from "../images/Vectorcourses.png"
import {JazitalBackendBaseURL} from "../helpers/Constants";

const EnrolledCourses = () => {
    localStorage.setItem('page_title', 'Enrolled Courses');
    document.title = localStorage.getItem('page_title')
    let userToken = localStorage.getItem('userToken');

    const [isLoading, setIsLoading] = useState(true);
    const [courses, setCourses] = useState(null)
    const [tableCourses, setTableCourses] = useState([])

    const BACKEND_BASE_URL = JazitalBackendBaseURL;

    useEffect(() => {
        setTimeout(() => {
            fetchEnrolledCourses();
        }, 2000)
    }, [])

    const fetchEnrolledCourses = async () => {
        const endpoint = '/courses/enrolled';
        let args = {
            headers: {
                'Token': userToken,
            },
            params: {
                'student_id': localStorage.getItem('userID')
            },
        }
        // Making request to backend API
        await axios.get(
            BACKEND_BASE_URL + endpoint,
            args
        ).then((res) => {
            if (res.data.code && res.data.code === "courses_fetched") {
                setCourses(res.data.data.courses);
                setTableCourses(res.data.data.courses);
                setIsLoading(false)
            }
            else {
                setIsLoading(false)
            }
            // console.log(res.data)
        }).catch(error => {
            // console.log(error)
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

    const filterCoursesOnchange = (e) => {
        var searchQuery = e.target.value;
        var newCourses = courses.filter(course => {
            return ((course.course_code.toLowerCase().includes(searchQuery.toLowerCase())) || (course.course_title.toLowerCase().includes(searchQuery.toLowerCase())));
        })
        setTableCourses(newCourses);
    }

    return (
        <>
            {loadingModal(isLoading)}
            <div className="row mb-3">
                <div className="col-12 col-lg-6">

                </div>
                <div className="col-12 col-lg-6 text-right">
                    <input className="form-control" onChange={filterCoursesOnchange} type="search"
                           id="course-ajax-search-input" placeholder="Search courses..." />
                </div>
            </div>
            <div className="row">
                {tableCourses && tableCourses.map((course, index) => <div key={index}
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

export default EnrolledCourses;
