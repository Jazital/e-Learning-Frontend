import React, {useEffect, useState} from "react";
import "../CSS/Home.css";
import axios from "axios";
import {Modal} from "react-bootstrap";
import ScaleLoader from "rayloading/lib/ScaleLoader";
import {Link, useParams} from "react-router-dom"

const LecturerCourses = () => {
    localStorage.setItem('page_title', 'Assigned Courses');
    let userToken = localStorage.getItem('userToken') || '';
    let department_id = localStorage.getItem('department');
    const [responseOK, setResponseOK] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');
    const [courses, setCourses] = useState([])
    const [tableCourses, setTableCourses] = useState([])
    const [selectedSemester, setSelectedSemester] = useState("first-semester")
    const BACKEND_BASE_URL = "http://elearning-backend.local/api/v1";
    // const BACKEND_BASE_URL = "https://pandagiantltd.com/e-learning-backend-api/api/v1";
    let endpoint = ''
    let args = ''
    // Get ID from URL
    let {lecturer_id} = useParams();

    useEffect(() => {
        fetchLecturerCourses();
    }, [])
    const [isLoading, setIsLoading] = useState(true);

    const fetchLecturerCourses = () => {
        setIsLoading(true);
        endpoint = `/courses/assigned`;

        let args = {
            headers: {
                'Token': userToken,
            },
            params: {
                'lecturer_id': lecturer_id,
                "department_id": department_id,
            },
        }
        
        // Making request to backend API
        axios.get(
            BACKEND_BASE_URL + endpoint,
            args
        ).then((res) => {
            if (res.data.code && res.data.code === "courses_fetched") {
                setCourses(res.data.data.courses);
                setTableCourses(res.data.data.courses);
            }
            setIsLoading(false)
            // console.log(res.data)
        }).catch(error => {
            setIsLoading(false)
            // console.error(error)
        })
    }


    const filterCoursesOnchange = (e) => {
        var searchQuery = e.target.value;
        var newCourses = courses.filter(course => {
            return ((course.course_code.toLowerCase().includes(searchQuery.toLowerCase())) || (course.course_title.toLowerCase().includes(searchQuery.toLowerCase())));
    })
        setTableCourses(newCourses);
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
            <div className="col-lg-12">
            <div className="row my-3">
            </div>
                <div className="row mb-3">
                <div className="col-12 col-lg-6 text-right">
                        <input className="form-control" onChange={filterCoursesOnchange} type="search"
                               id="course-ajax-search-input" placeholder="Search courses..." />
                    </div>
                    <div className="col-12 col-lg-6">
                    </div>
                </div>
                    <div className="table-responsive">
                    <table
                        className="table table-borderless table-hover table-striped">
                        <thead>
                        <td>S/N</td>
                        <td>Course Code</td>
                        <td>Title</td>
                        <td>Unit</td>
                        </thead>
                        <tbody>
                        {tableCourses.map((course, index) =>  (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{course.course_code}</td>
                                <td>{course.course_title}</td>
                                <td>{course.course_unit}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div>
                        <Link className="btn btn-primary mr-3"to={`/modify-assigned-courses/${lecturer_id}`}>Modify Assigned Courses</Link> <Link className="btn btn-danger"to={`/unassigned-courses/${lecturer_id}`}>Un-assign Courses</Link>
                    </div>
                    </div>
            </div>
        </>
    );
};

export default LecturerCourses;
