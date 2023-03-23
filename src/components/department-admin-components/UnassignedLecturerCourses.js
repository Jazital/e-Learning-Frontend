import React, {useEffect, useState} from "react";
import "../CSS/Home.css";
import axios from "axios";
import {Modal} from "react-bootstrap";
import ScaleLoader from "rayloading/lib/ScaleLoader";
import {Link, useParams} from "react-router-dom"
import { VapingRooms } from "@mui/icons-material";
import {JazitalBackendBaseURL} from "../helpers/Constants";

const UnassignedLecturerCourses = () => {
    localStorage.setItem('page_title', 'Assign New Courses');
    let userToken = localStorage.getItem('userToken') || '';
    let department_id = localStorage.getItem('department') || '';
    const [responseOK, setResponseOK] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');
    const [courses, setCourses] = useState([])
    const [tableCourses, setTableCourses] = useState([])
    const [selectedSemester, setSelectedSemester] = useState("first-semester")

    const BACKEND_BASE_URL = JazitalBackendBaseURL;
    let endpoint = ''
    let args = ''

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
        endpoint = `/courses/assigned`;

        let args = {
            headers: {
                'Token': userToken,
            },
            params: {
                "lecturer_id": lecturer_id,
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
            // console.log(res.data)
        }).catch(error => {
            setIsLoading(false)
            // console.error(error)
        })
    }

    const submitAssignedCourses = async (e) => {
        e.preventDefault();

        setIsLoading(true)

        endpoint = '/departmental-admin/un-assign-courses-by-course-code';

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
                'Token': userToken,
            },
        }

        await axios.post(
            BACKEND_BASE_URL + endpoint,
            data,
            args
        ).then(response => {
            if (response.data.code === 'courses_unassigned') {
                setResponseMessage(response.data.message)
                setResponseOK(true)
            }
            setIsLoading(false)

            console.log(response.data)
        }).catch(error => {
            console.error(error)
            if(error.response.data.message){
                setResponseMessage(error.response.data.message)
                setResponseOK(false)
            }
            else{
                setResponseMessage("Sorry, we cannot create the virtual classroom at the moment. Please try again later.")
                setResponseOK(false)
            }

            setIsLoading(false)
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

                {responseOK && <div className="alert alert-success col-11">
                    {responseMessage}
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
                        <td></td>
                        <td>S/N</td>
                        <td>Code</td>
                        <td>Title</td>
                        <td>Department</td>
                        <td>Semester</td>
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
                                <td>{course.course_department.department_name}</td>
                                <td>{course.course_semester.semester_name}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div><input type="submit" className="btn btn-primary" value="Un-assign Courses" /></div>

                    </form>
                    </div>
            </div>
        </>
    );
};

export default UnassignedLecturerCourses;
