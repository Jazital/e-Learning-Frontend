import React, {useEffect, useState} from "react";
import "../CSS/Home.css";
import {Link} from "react-router-dom";
import axios from "axios";
import {Modal} from "react-bootstrap";
import ScaleLoader from "rayloading/lib/ScaleLoader";

const NewAssignment = () => {
    localStorage.setItem('page_title', 'New Assignment');
    let userRole = localStorage.getItem('userRole');
    let userToken = localStorage.getItem('userToken') || '';

    const BACKEND_BASE_URL = "http://elearning-backend.local/api/v1";
    // const BACKEND_BASE_URL = "https://pandagiantltd.com/e-learning-backend-api/api/v1";
    let endpoint = ''

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
        fetchAssignedCourses();
    }, [])

    const submitHandler = async (e) => {
        e.preventDefault()

        setIsLoading(true)
        let endpoint = '/assignments/add'

        let args2 = {
            headers: {
                'Token': userToken,
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
            }
            setIsLoading(false)

            // console.log(response.data)
        }).catch(error => {
            // console.error(error)
            if (error.response.data.message) {
                setResponseMessage(error.response.data.message)
                setResponseOK(false)
            }
            else {
                setResponseMessage("Sorry, we cannot create the assignment at the moment. Please try again later.")
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
                // console.log("No course(s) found!")
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
            <form action="" onSubmit={submitHandler}>
                <div className="row shadow p-4 m-md-3 rounded">
                    <div className="col-12 col-md-8 pr-3">
                        <div className="form-group">
                            <label htmlFor="vc-title">Title:</label>
                            <input className="form-control" type="text" placeholder="Enter title..."
                                   id="new-assignment-title" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="vc-description">Description:</label>
                            <textarea className="form-control" rows="8" id="new-assignment-description"
                                      placeholder="Enter description..."></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="vc-lecture-url">Document Attachment:</label>
                            <input type="file" id="new-assignment-attachment" className="form-control mb-3" />
                        </div>

                        <div className="d-none d-md-block">
                            <input type="submit" value="Create Assignment" className="btn btn-primary" />
                        </div>
                    </div>
                    <div className="col-12 col-md-4">

                        <div className="form-group">
                            {/*TODO: Fetch only assigned courses here*/}
                            <label htmlFor="new-assignment-course">Course:</label>
                            <select className="form-control" id="new-assignment-course">
                                <option value="">Select course</option>
                                {courses && courses.map((course) => <option value={`${course.course_id}`}
                                                                            key={Math.random()}>{`${course.course_code}`}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="vc-lecture-date">Due Date:</label>
                            <input className="form-control" type="date" id="new-assignment-due-date" />
                        </div>

                        <div className="d-md-none">
                            <input type="submit" value="Create Assignment" className="btn btn-primary" />
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default NewAssignment;
