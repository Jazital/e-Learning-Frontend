import React, {useEffect, useState} from "react";
import VirtualClassroomTable from "./VirtualClassroomTable";
import "../CSS/Home.css";
import {Link} from "react-router-dom";
import axios from "axios";
import {Modal} from "react-bootstrap";
import ScaleLoader from "rayloading/lib/ScaleLoader";
import {JazitalBackendBaseURL} from "../helpers/Constants";

const NewVirtualClassroom = () => {
    localStorage.setItem('page_title', 'New Virtual Classroom');
    let userRole = localStorage.getItem('userRole');
    let department_id = localStorage.getItem('department');
    let userToken = localStorage.getItem('userToken') || '';

    const BACKEND_BASE_URL = JazitalBackendBaseURL;

    const [responseOK, setResponseOK] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const loadingModal = (isOpen = false) => {
        return (
            <Modal show={isOpen}>
                <ScaleLoader color="#ffffff" size="18px" margin="4px" />
            </Modal>
        );
    };

    useEffect(() => {
        setTimeout(() => {
            fetchAssignedCourses();
        }, 2000)
    }, [])

    const submitHandler = async (e) => {
        e.preventDefault()


        var vcTitle = document.querySelector("#vc-title"); // Get the file input
        var vcDescription = document.querySelector("#vc-description"); // Get the file input
        var vcLectureURL = document.querySelector("#vc-lecture-url"); // Get the file input
        var vcLectureCourse = document.querySelector("#vc-course-id"); // Get the file input
        var vcLectureDate = document.querySelector("#vc-lecture-date"); // Get the file input
        var vcLecturePlatform = document.querySelector("#vc-platform"); // Get the file input

        setIsLoading(true)
        let endpoint = '/lectures/add'

        var data = new FormData();
        data.append("lecture_title", vcTitle.value);
        data.append("lecture_description", vcDescription.value);
        data.append("course_id", vcLectureCourse.value);
        data.append("lecture_platform", vcLecturePlatform.value);
        data.append("lecture_url", vcLectureURL.value);
        data.append("lecture_date", vcLectureDate.value);

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
            if (response.data.code === 'lecture_created') {
                setResponseMessage(response.data.message)
                setResponseOK(true)

                document.getElementById("new-virtual-classroom-form").reset()
            }

            setIsLoading(false)

            // console.log(response.data)
        }).catch(error => {
            console.error(error)
            if (error.response.data.message) {
                setResponseMessage(error.response.data.message)
                setResponseOK(false)
            }
            else {
                setResponseMessage("Sorry, we cannot create the virtual classroom at the moment. Please try again later.")
                setResponseOK(false)
            }

            setIsLoading(false)
        })
    }

    const fetchAssignedCourses = async () => {
        const endpoint = '/courses/assigned';
        let args = {
            headers: {
                'Token': userToken,
            },
            params: {
                'lecturer_id': localStorage.getItem('userID'),
                'department_id': department_id,
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
                setIsLoading(false)
            }
            // console.log(res)
        }).catch(error => {
            // console.log(error)
            setIsLoading(false)
        })
    }

    return (
        <>
            {loadingModal(isLoading)}
            {responseOK && (<div className="alert alert-success mb-2">
                {responseMessage}
            </div>)}
            {responseOK === false && (<div className="alert alert-danger mb-2">
                {responseMessage}
            </div>)}
            <form id="new-virtual-classroom-form" action="post" onSubmit={submitHandler}>
                <div className="row shadow p-4 m-md-3 rounded">

                    <div className="col-12 col-md-8 pr-3">
                        <div className="form-group">
                            <label htmlFor="vc-title">Title:</label>
                            <input className="form-control" type="text" placeholder="Enter title..." id="vc-title" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="vc-description">Description:</label>
                            <textarea className="form-control" rows="8" id="vc-description"
                                      placeholder="Enter description..."></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="vc-lecture-url">Lecture URL:</label>
                            <input className="form-control" type="text"
                                   placeholder="E.g. https://teams.microsoft.com/g8forteams" id="vc-lecture-url" />
                        </div>

                        <div className="d-none d-md-block">
                            <input type="submit" value="Create Classroom" className="btn btn-primary" />
                        </div>
                    </div>
                    <div className="col-12 col-md-4">

                        <div className="form-group">
                            {/*TODO: Fetch only assigned courses here*/}
                            <label htmlFor="vc-course-id">Course:</label>
                            <select className="form-control" id="vc-course-id">
                                <option value="null">Select course</option>
                                {courses && courses.map((course, index) => <option key={index}
                                                                                   value={`${course.course_id}`}>{`${course.course_code} - ${course.course_title}`}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="vc-lecture-date">Lecture Date:</label>
                            <input className="form-control" type="datetime-local" id="vc-lecture-date" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="vc-platform">Platform:</label>
                            <select className="form-control" id="vc-platform">
                                <option value="Zoom">Zoom</option>
                                <option value="Google Meet">Google Meet</option>
                                <option value="YouTube">YouTube</option>
                                <option value="Microsoft Teams">Microsoft Teams</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>

                        <div className="d-md-none">
                            <input type="submit" value="Create Classroom" className="btn btn-primary" />
                        </div>

                    </div>
                </div>
            </form>
        </>
    );
};

export default NewVirtualClassroom;
