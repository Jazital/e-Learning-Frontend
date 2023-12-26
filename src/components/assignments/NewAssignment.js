import React, {useEffect, useState} from "react";
import "../CSS/Home.css";
import {Link} from "react-router-dom";
import axios from "axios";
import {Modal} from "react-bootstrap";
import ScaleLoader from "rayloading/lib/ScaleLoader";
import {JazitalBackendBaseURL} from "../helpers/Constants";
import {closeNavMenu, openNavMenu} from "../helpers/Constants";


const NewAssignment = () => {
    localStorage.setItem('page_title', 'New Assignment');
    let userRole = localStorage.getItem('userRole');
    let department_id = localStorage.getItem('department');
    let userToken = localStorage.getItem('userToken');

    const BACKEND_BASE_URL = JazitalBackendBaseURL;
    let endpoint = ''

    const [responseOK, setResponseOK] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const loadingModal = (isOpen = false) => {
        return (
            <Modal show={isOpen}>
                <ScaleLoader color="#ffffff" size="18px" margin="4px"/>
            </Modal>
        );
    };

    useEffect(() => {
        setTimeout(() => {
            fetchAssignedCourses();
        }, 500)
    }, [])

    const submitHandler = async (e) => {
        e.preventDefault()

        setIsLoading(true)
        let endpoint = '/assignments/add'

        let args2 = {
            headers: {
                'Authorization':'Bearer '+ userToken,
                'Content-Type': 'multipart/form-data',
            },
        }

        var assignmentTitle = document.querySelector("#new-assignment-title"); // Get the file input
        var assignmentDescription = document.querySelector("#new-assignment-description"); // Get the file input
        var assignmentAttachment = document.querySelector("#new-assignment-attachment"); // Get the file input
        var assignmentCourse = document.querySelector("#new-assignment-course"); // Get the file input
        var assignmentDueDate = document.querySelector("#new-assignment-due-date"); // Get the file input

        var formData = new FormData();
        formData.append("attachments[]", assignmentAttachment.files[0]);
        formData.append("course_id", assignmentCourse.value);
        formData.append("assignment_title", assignmentTitle.value);
        formData.append("assignment_description", assignmentDescription.value);
        formData.append("due_date", assignmentDueDate.value);

        await axios.post(
            BACKEND_BASE_URL + endpoint,
            formData,
            args2
        ).then(response => {
            if (response.data.code === 'assignment_created') {
                setResponseMessage(response.data.message)
                setResponseOK(true)
                document.getElementById("assignment-form").reset()
            }
            setIsLoading(false)
            closeNavMenu();
        }).catch(error => {
            // console.error(error)
            if (error.response.data.message) {
                setResponseMessage(error.response.data.message)
                setResponseOK(false)
            } else {
                setResponseMessage("Sorry, we cannot create the assignment at the moment. Please try again later.")
                setResponseOK(false)
            }

            setIsLoading(false)
            closeNavMenu();
        })
    }

    const fetchAssignedCourses = async () => {
        const endpoint = '/courses/assigned';
        let args = {
            headers: {
                'Authorization':'Bearer '+ userToken,
            },
            params: {
                'lecturer_id': localStorage.getItem('userID'),
                'department_id': department_id
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
                closeNavMenu();
            } else {
                setIsLoading(false)
                closeNavMenu();
            }
            // console.log(res)
        }).catch(error => {
            // console.log(error)
            setIsLoading(false)
            closeNavMenu();
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
            <form id="assignment-form" action="" onSubmit={submitHandler}>
                <div className="row shadow p-4 m-md-3 rounded">
                    <div className="col-12 col-md-8 pr-3">
                        <div className="form-group">
                            <label htmlFor="vc-title">Title:</label>
                            <input className="form-control" type="text" placeholder="Enter title..."
                                   id="new-assignment-title" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="vc-description">Description:</label>
                            <textarea className="form-control" rows="8" id="new-assignment-description"
                                      placeholder="Enter description..." required></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="vc-lecture-url">Document Attachment:</label>
                            <input type="file" id="new-assignment-attachment" className="form-control mb-3"/>
                        </div>

                        <div className="d-none d-md-block">
                            <input type="submit" value="Create Assignment" className="btn btn-primary"/>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">

                        <div className="form-group">
                            {/*TODO: Fetch only assigned courses here*/}
                            <label htmlFor="new-assignment-course">Course:</label>
                            <select className="form-control" id="new-assignment-course">
                                <option value="">Select course</option>
                                {courses && courses.map((course, index) => <option value={`${course.course_id}`}
                                                                                   key={index}>{`${course.course_code} - ${course.course_title}`}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="vc-lecture-date">Due Date:</label>
                            <input className="form-control" type="datetime-local" id="new-assignment-due-date" required/>
                        </div>

                        <div className="d-md-none">
                            <input type="submit" value="Create Assignment" className="btn btn-primary"/>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default NewAssignment;
