import React, {useEffect, useState} from 'react'
import "../CSS/Home.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import coursematerial from "../images/Vectorcourses.png"
import "./Assignments.css";
import {Link, useParams} from "react-router-dom";
import {Modal} from "react-bootstrap";
import ScaleLoader from "rayloading/lib/ScaleLoader";
import axios from "axios";


function Assignment() {
    // assignment_id

    localStorage.setItem('page_title', 'Assignment');
    let userRole = localStorage.getItem('userRole');

    const {assignment_id} = useParams();

    const BACKEND_BASE_URL = "http://elearning-backend.local/api/v1";
    // const BACKEND_BASE_URL = "https://pandagiantltd.com/e-learning-backend-api/api/v1";
    let endpoint = ''
    let args = {}

    let userToken = localStorage.getItem('userToken');

    args = {
        headers: {
            'Token': userToken,
        },
    }
    endpoint = '/assignments/' + assignment_id;

    const [assignment, setAssignment] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [assignmentDocumentURI, setAssignmentDocumentURI] = useState(null);
    const [submissionResponse, setSubmissionResponse] = useState({
        status: '', //success or error
        message: ''
    }); // either success or failed


    const loadingModal = (isOpen = false) => {
        return (
            <Modal show={isOpen}>
                <ScaleLoader color="#ffffff" size="18px" margin="4px" />
            </Modal>
        );
    };

    useEffect(() => {
        setTimeout(() => {
            fetchAssignment();
        }, 2000)
    }, [submissionResponse])

    const fetchAssignment = async () => {

        await axios.get(
            BACKEND_BASE_URL + endpoint,
            args
        ).then(response => {
            if (response.data.code === 'assignment_fetched') {
                setAssignment(response.data.data.lecture_assignment)
                setAssignmentDocumentURI(response.data.data.lecture_assignment.attachments[0]['file_uri']);
            }
            setIsLoading(false)
        }).catch(error => {
            setIsLoading(false)
        })
    }


    
    async function handleAssignmentSubmit(e) {
        e.preventDefault()
        setIsLoading(true)

        endpoint = '/assignments/submit';
        let args2 = {
            headers: {
                'Token': userToken,
                'Content-Type': 'multipart/form-data',
            },
        }

        var fileInput = document.querySelector("#assignment-file-input"); // Get the file input
        var studentCommentInput = document.querySelector("#assignment-comment-input"); // Get the file input

        var formData = new FormData();
        formData.append("attachments[]", fileInput.files[0]);
        formData.append("assignment_id", assignment_id);
        formData.append("student_comment", studentCommentInput.value);
        await axios.post(
            BACKEND_BASE_URL + endpoint,
            formData,
            args2
        ).then(response => {
            if (response.data.code === 'assignment_submitted') {
                setSubmissionResponse({
                    status: 'success',
                    message: response.data.message
                })
                setIsLoading(false)
            }
            setIsLoading(false)
            // console.log(response.data.data.lecture_assignment)
            // console.log(response)
        }).catch(error => {
            setSubmissionResponse({
                status: 'error',
                message: error.response.data.message
            })
            // console.error(error.response.status)
            setIsLoading(false)
        })
    }

    return (<>
            <div className="pb-4">
                {userRole=="student" && <Link to={'/enrolled-courses'} className="btn btn-primary">Back to courses</Link> }
                {userRole=="lecturer" && <Link to={'/assigned-courses'} className="btn btn-primary">Back to courses</Link> }
            </div>

            <div className='the col-xl-10 col-lg-12 col-sm-12'>
                {loadingModal(isLoading)}

                <Card border="light" className='main-body-card col-xl-6 col-lg-12 col-sm-12'>
                    <div>
                        <div className="centercoursetext">
                            <img className="center-image mb-2"
                                 src={coursematerial}
                                 alt=""
                            />
                            {/*<p className="indicator-open">Open</p>*/}
                        </div>
                        <div className="centercoursetext mb-2">
                            {
                                assignmentDocumentURI && (<a className="btn btn-primary" href={assignmentDocumentURI}>
                                    Download Assignment
                                </a>)
                            }

                        </div>
                        <div id="firstAssignText">
                            <p>
                            <strong> Title: {assignment.assignment_title}</strong> <br />
                                <strong> Course: {assignment.course_code}</strong> <br />
                                Assigned Date: {assignment.creation_date} <br />
                                <strong>Due Date: {assignment.due_date}</strong> <br />
                                <strong>Description:</strong> <br />
                                <p>{assignment.assignment_description}</p>

                            </p>
                        </div>
                        
                    </div>
                </Card>
                <div className='Formdiv main-body-card col-xl-6 col-lg-6 col-sm-12 d-flex flex-column m-3 p-3'>
                    <div className="centercoursetext">
                        <h2 className="pb-3">Submit Assignment</h2>
                        {submissionResponse.status === "success" && (<div className="alert alert-success mb-2">
                            {submissionResponse.message}
                        </div>)}
                        {submissionResponse.status === "error" && (<div className="alert alert-danger mb-2">
                            {submissionResponse.message}
                        </div>)}
                        <p className="pb-0 pt-1">Upload your assignment below to submit</p>
                    </div>
                    <form onSubmit={handleAssignmentSubmit}>
                        <input type="file" id="assignment-file-input" className="form-control mb-3" />
                        <label htmlFor="assignment-comment-input">Comment (optional)</label>
                        <textarea rows="5" id="assignment-comment-input" className="form-control mb-3"
                                  placeholder="Enter your comment here..."></textarea>
                        <input className="btn btn-primary" type="submit" value="Submit Assignment" />
                    </form>

                </div>
            </div>
        </>
    )
}

export default Assignment
