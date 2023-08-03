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
import {JazitalBackendBaseURL} from "../helpers/Constants";
import {closeNavMenu, openNavMenu} from "../helpers/Constants";


function LecturerAssignmentView() {
    localStorage.setItem('page_title', 'Assignment');
    let userRole = localStorage.getItem('userRole');

    const {assignment_id} = useParams();

    const BACKEND_BASE_URL = JazitalBackendBaseURL;
    let endpoint = ''
    let args = {}

    let userToken = localStorage.getItem('userToken') || '';

    args = {
        headers: {
            'Authorization': userToken,
        },
    }
    endpoint = '/assignments/' + assignment_id;


    const [isLoading, setIsLoading] = useState(true);
    const [assignment, setAssignment] = useState([])
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
    }, [])

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
closeNavMenu();
        }).catch(error => {
            setIsLoading(false)
closeNavMenu();
        })
    }


    return (<>
            <div className="row">
                <div className="col-xl-12 col-lg-12 col-sm-12">
                    <div className="row justify-content-between">
                        <div className="pb-4">
                            {userRole == "lecturer" &&
                            <Link to={'/assignment-list'} className="btn btn-primary">Back to assignments</Link>}
                        </div>
                        <div className="pb-4">
                            {/*{userRole === "lecturer" && <Link to={`/assignment/edit/${assignment_id}`} className="btn btn-warning">Modify</Link>}*/}
                        </div>
                    </div>
                </div>
            </div>

            <div className='the col-xl-10 col-lg-12 col-sm-12'>
                {loadingModal(isLoading)}

                <Card border="light" className='main-body-card col-12'>
                    <div>
                        <div className="centercoursetext">
                            <img className="center-image mb-2"
                                 src={coursematerial}
                                 alt=""
                            />
                        </div>
                        <div className="centercoursetext mb-2">
                            {
                                assignmentDocumentURI && (<a className="btn btn-primary" href={assignmentDocumentURI}  target="_blank">
                                    View Assignment Attachment
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
            </div>
        </>
    )
}

export default LecturerAssignmentView
