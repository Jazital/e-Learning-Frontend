import React, {useEffect, useState} from "react";
import "../CSS/Home.css";
import axios from "axios";
import {Modal} from "react-bootstrap";
import ScaleLoader from "rayloading/lib/ScaleLoader";
import {Link, useParams} from "react-router-dom"
import { VapingRooms } from "@mui/icons-material";
import {JazitalBackendBaseURL} from "../helpers/Constants";
import {closeNavMenu, openNavMenu} from "../helpers/Constants";

const ModifyAssignedCourses = () => {
    localStorage.setItem('page_title', 'Assign New Courses');
    let userToken = localStorage.getItem('userToken') || '';
    let department_id = localStorage.getItem('department') || '';
    const [responseOK, setResponseOK] = useState(null);
    const [responseOKMessage, setResponseOKMessage] = useState('');
    const [responseError, setResponseError] = useState(null);
    const [responseErrorMessage, setResponseErrorMessage] = useState('');
    const [courses, setCourses] = useState([])
    const [tableCourses, setTableCourses] = useState([])
    const [selectedSemester, setSelectedSemester] = useState("first-semester")

    const BACKEND_BASE_URL = JazitalBackendBaseURL;
    let endpoint = '';
    let args = '';

        // Get ID from URL
        const {lecturer_id} = useParams();

    useEffect(() => {
        setTimeout(() => {
            fetchLecturerCourses();
        }, 2000)
    }, [])

    const [isLoading, setIsLoading] = useState(true);

    const fetchLecturerCourses = () => {
        setIsLoading(true);
        endpoint = `/courses/courses-by-department`;

        let args = {
            headers: {
                'Authorization': 'Bearer '+userToken,
            },
            params: {
                // "lecturer_id": lecturer_id,
                "department_id": department_id,
            }
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
closeNavMenu();
        }).catch(error => {
            setIsLoading(false)
closeNavMenu();
        })
    }

    const submitAssignedCourses = async (e) => {
        e.preventDefault();

        setIsLoading(true)

        endpoint = '/departmental-admin/assign-courses-by-course-code';

        var items = document.getElementsByName("selectedCourses[]");

      var arr=[];
      for (var i = 0; i < items.length; i++) {
         if (items[i].type == "checkbox" && items[i].checked == true){
            arr.push(items[i].value);
         }
      }

        var data = {
            "lecturer_id": lecturer_id,
            "course_codes": arr,
        };

        let args = {
            headers: {
                'Authorization': 'Bearer '+userToken,
            },
        }

        await axios.post(
            BACKEND_BASE_URL + endpoint,
            data,
            args
        ).then(response => {
            if (response.data.code === 'courses_assigned') {
                setResponseOKMessage(response.data.message)
                setResponseOK(true)
                setResponseError(false)
            }
            else{
                setResponseErrorMessage(response.data.message)
                setResponseError(true)
                setResponseOK(false)
            }
            setIsLoading(false)
closeNavMenu();

            // console.log(response.data)
        }).catch(error => {
            // console.error(error)
            if(error.response.data.message){
                setResponseErrorMessage(error.response.data.message)
                setResponseError(true)
                setResponseOK(false)
            }
            else{
                setResponseErrorMessage("Sorry, we cannot create the virtual classroom at the moment. Please try again later.")
                setResponseError(true)
                setResponseOK(false)
            }

            setIsLoading(false)
closeNavMenu();
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
                <h4 className="alert alert-danger text-center">***Please note that new courses submitted will replace any other courses previously assigned to this lecturer***</h4>

                {responseOK && <div className="alert alert-success col-11">
                    {responseOKMessage}
                </div>}

                {responseError && <div className="alert alert-danger col-11">
                    {responseErrorMessage}
                </div>}

                    <div className="col-12 col-lg-6">
                    </div>
                    <div className="col-12 col-lg-6 text-right">
                        <input className="form-control" onChange={filterCoursesOnchange} type="search"
                               id="course-ajax-search-input" placeholder="Search courses..." />
                    </div>
                </div>
                    <div className="table-responsive">
                        <form onSubmit={submitAssignedCourses}>
                        <table
                        className="table table-borderless table-hover table-responsive table-striped table-">
                            <thead>
                            <tr>
                                <th></th>
                                <th>S/N</th>
                                <th>Code</th>
                                <th>Title</th>
                                <th>Unit</th>
                                <th>Semester</th>
                            </tr>
                            </thead>

                        <tbody>
                            {/* {course.course_semester.semester_slug.toLowerCase().includes(selectedSemester.toLowerCase()) && */}
                        {tableCourses.map((course, index) =>  (
                            <tr key={index}>
                                <td><input className="form-check courses-checkbox" name="selectedCourses[]"
                                           value={course.course_code}
                                           type="checkbox" id="selectedCourses" /></td>
                                <td>{index + 1}</td>
                                <td>{course.course_code}</td>
                                <td>{course.course_title}</td>
                                <td>{course.course_unit}</td>
                                <td>{course.course_semester.semester_name}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div><input type="submit" className="btn btn-primary" value="Submit Courses" /></div>

                    </form>
                    </div>
            </div>
        </>
    );
};

export default ModifyAssignedCourses;
