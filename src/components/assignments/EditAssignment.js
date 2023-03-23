import React, {useEffect, useState} from "react";
import "../CSS/Home.css";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {Modal} from "react-bootstrap";
import ScaleLoader from "rayloading/lib/ScaleLoader";
import {JazitalBackendBaseURL} from "../helpers/Constants";

const EditAssignment = () => {
    localStorage.setItem('page_title', 'Modify Assignment');
    let userRole = localStorage.getItem('userRole');
    let department_id = localStorage.getItem('department');
    let userToken = localStorage.getItem('userToken');

    const BACKEND_BASE_URL = JazitalBackendBaseURL;
    let endpoint = ''

    const [responseOK, setResponseOK] = useState(null);
    const [responseOKMessage, setResponseOKMessage] = useState('');
    const [responseError, setResponseError] = useState(null);
    const [responseErrorMessage, setResponseErrorMessage] = useState('');

    // const [responseOK, setResponseOK] = useState(null);
    // const [responseMessage, setResponseMessage] = useState('');
    const [assignment, setAssignment] = useState([]);
    const [assignmentDocumentURI, setAssignmentDocumentURI] = useState(null);
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const {assignment_id} = useParams();

    const loadingModal = (isOpen = false) => {
        return (
            <Modal show={isOpen}>
                <ScaleLoader color="#ffffff" size="18px" margin="4px" />
            </Modal>
        );
    };

    useEffect(() => {
        setTimeout(()=>{
            fetchAssignment();
            fetchAssignedCourses();
        },500);

    }, [])

    const fetchAssignment = async () => {

        var args = {
            headers: {
                'Token': userToken,
            },
        }
        var endpoint = '/assignments/' + assignment_id;

        await axios.get(
            BACKEND_BASE_URL + endpoint,
            args
        ).then(response => {
            if (response.data.code === 'assignment_fetched') {
                setAssignment(response.data.data.lecture_assignment)
                setAssignmentDocumentURI(response.data.data.lecture_assignment.attachments[0]['file_uri']);
            }
            setIsLoading(false)
            // console.log(response.data)
        }).catch(error => {
            setIsLoading(false)
        })
    }


    const submitHandler = async (e) => {
        e.preventDefault()

        setIsLoading(true)
        let endpoint = '/assignments/update'

        let args2 = {
            headers: {
                'Token': userToken,
                'Content-Type': 'multipart/form-data',
            },
            params: {
                assignment_id: assignment_id
            }
        }

        var assignmentAttachment = document.querySelector("#new-assignment-attachment"); // Get the file input

        var formData = new FormData();
        formData.append("attachments[]", assignmentAttachment.files[0]);
        formData.append("course_id", assignment.course_id);
        formData.append("assignment_title", assignment.assignment_title);
        formData.append("assignment_description", assignment.assignment_description);
        formData.append("due_date", assignment.due_date);

        // console.log("State: "+formData.course_id)

        await axios.post(
            BACKEND_BASE_URL + endpoint,
            formData,
            args2
        ).then(response => {
            if (response.data.code === 'assignment_updated') {
                setResponseOKMessage(response.data.message)
                setResponseOK(true)
                setResponseError(false)
            }
            setIsLoading(false)
            // document.getElementById("assignment-form").reset()

            console.log(response.data);
        }).catch(error => {
            // console.error(error)
            if (error.response.data.message) {
                setResponseErrorMessage(error.response.data.message)
                setResponseError(true)
                setResponseOK(false)
            }
            else {
                setResponseErrorMessage("Sorry, we could not update the assignment at the moment. Please try again later.")
                setResponseError(true)
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

    const textOnchange = (e) => {
        switch(e.target.id){
            case 'new-assignment-title':
                setAssignment({
                    assignment_title: e.target.value,
                })
                break;
            case 'new-assignment-description':
                setAssignment({
                    assignment_description: e.target.value,
                })
                break;
            case 'new-assignment-course':
                setAssignment({
                    course_id: e.target.value,
                })
                break;
            case 'new-assignment-due-date':
                setAssignment({
                    due_date: e.target.value,
                })
            break;

            default:;
        }
    }


    return (
        <>
            {loadingModal(isLoading)}
            {responseOK && <div className="alert alert-success col-12">
                    {responseOKMessage}
                </div>}

            {responseError && <div className="alert alert-danger col-12">
                {responseErrorMessage}
            </div>}
            <form id="assignment-form" action="" onSubmit={submitHandler}>
                <div className="row shadow p-4 m-md-3 rounded">
                    <div className="col-12 col-md-8 pr-3">
                        <div className="form-group">
                            <label htmlFor="vc-title">Title:</label>
                            <input value={assignment.assignment_title} onChange={textOnchange} className="form-control" type="text" placeholder="Enter title..."
                                   id="new-assignment-title" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="vc-description">Description:</label>
                            <textarea value={assignment.assignment_description} onChange={textOnchange} className="form-control" rows="8" id="new-assignment-description"
                                      placeholder="Enter description..." required></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="vc-lecture-url">Attach New Document:</label>
                            <input type="file" id="new-assignment-attachment" className="form-control mb-3" />
                        </div>

                        <div className="d-none d-md-block">
                            <input type="submit" value="Update Assignment" className="btn btn-primary" />
                        </div>
                    </div>
                    <div className="col-12 col-md-4">

                        <div className="form-group">
                            {/*TODO: Fetch only assigned courses here*/}
                            <label htmlFor="new-assignment-course">Course:</label>
                            <select className="form-control" id="new-assignment-course" onChange={textOnchange}>
                                <option value="">Select course</option>
                                {courses && courses.map((course, index) => <option value={`${course.course_id}`}
                                                                            key={index}>{`${course.course_code} - ${course.course_title}`}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="vc-lecture-date">Due Date:</label>
                            <input value={assignment.due_date} className="form-control" onChange={textOnchange} type="date" id="new-assignment-due-date" required />
                        </div>

                        <div className="d-md-none">
                            <input type="submit" value="Update Assignment" className="btn btn-primary" />
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default EditAssignment;
