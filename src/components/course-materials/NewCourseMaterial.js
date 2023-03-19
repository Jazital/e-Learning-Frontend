import React, {useEffect, useState} from "react";
import "../CSS/Home.css";
import {Link} from "react-router-dom";
import axios from "axios";
import {Modal} from "react-bootstrap";
import ScaleLoader from "rayloading/lib/ScaleLoader";

const NewCourseMaterial = () => {
    localStorage.setItem('page_title', 'New Document');
    let userRole = localStorage.getItem('userRole');
    let department_id = localStorage.getItem('department');
    let userToken = localStorage.getItem('userToken');

    const BACKEND_BASE_URL = "http://elearning-backend.local/api/v1";
    // const BACKEND_BASE_URL = "https://pandagiantltd.com/e-learning-backend-api/api/v1";
    let endpoint = ''

    const [responseOK, setResponseOK] = useState(null);
    const [responseOKMessage, setResponseOKMessage] = useState('');
    const [responseError, setResponseError] = useState(null);
    const [responseErrorMessage, setResponseErrorMessage] = useState('');
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
        let endpoint = '/lecture-documents/add'

        let args2 = {
            headers: {
                'Token': userToken,
                'Content-Type': 'multipart/form-data',
            },
        }

        var documentAttachments = document.querySelector("#document-attachments"); // 
        var documentCourseID = document.querySelector("#document-course-id"); // 
        var documentTitle = document.querySelector("#document-title"); // 
        var documentDescription = document.querySelector("#document-description"); // 
        var documentType = document.querySelector("#document-type"); // 

        var formData = new FormData();
        formData.append("attachments[]", documentAttachments.files[0]);
        formData.append("course_id", documentCourseID.value);
        formData.append("document_title", documentTitle.value);
        formData.append("document_description", documentDescription.value);
        formData.append("document_type", documentType.value);


        // var value = e.options[e.selectedIndex].value;
        // setIsLoading(false)
        // return console.log(documentCourseID.value)

        await axios.post(
            BACKEND_BASE_URL + endpoint,
            formData,
            args2
        ).then(response => {
            if (response.data.code == 'document_uploaded') {
                setResponseOKMessage(response.data.message)
                setResponseOK(true)
                setResponseError(false)
                document.getElementById("upload-document-form").reset()
            }
            setIsLoading(false)

            console.log(response.data)
        }).catch(error => {
            // console.error(error)
            if (error.response.data.message) {
                setResponseErrorMessage(error.response.data.message)
                setResponseError(true)
                setResponseOK(false)
            }
            else {
                setResponseErrorMessage("Sorry, we cannot create the assignment at the moment. Please try again later.")
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


    return (
        <>
            {loadingModal(isLoading)}
            {responseOK && <div className="alert alert-success col-12">
                    {responseOKMessage}
                </div>}

            {responseError && <div className="alert alert-danger col-12">
                {responseErrorMessage}
            </div>}

            <form id="upload-document-form" action="" onSubmit={submitHandler}>
                <div className="row shadow p-4 m-md-3 rounded">
                    <div className="col-12 col-md-8 pr-3">
                        <div className="form-group">
                            <label htmlFor="document-title">Title:</label>
                            <input className="form-control" type="text" placeholder="Enter title..."
                                   id="document-title" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="document-description">Description:</label>
                            <textarea className="form-control" rows="8" id="document-description"
                                      placeholder="Enter description..."></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="document-attachments">Document Attachment:</label>
                            <input type="file" id="document-attachments" className="form-control mb-3" />
                        </div>

                        <div className="d-none d-md-block">
                            <input type="submit" value="Upload Document" className="btn btn-primary" />
                        </div>
                    </div>
                    <div className="col-12 col-md-4">

                        <div className="form-group">
                            <label htmlFor="document-course-id">Course:</label>
                            <select className="form-control" id="document-course-id">
                                {courses && courses.map((course, index) => <option value={`${course.course_id}`}
                                                                            key={index}>{`${course.course_code} - ${course.course_title}`}</option>)}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="document-type">Document Type:</label>
                            <select className="form-control" id="document-type">
                                <option value="3">Lecture Material</option>
                                <option value="1">Journal</option>
                                <option value="2">Textbook</option>
                                <option value="4">Notebook</option>
                                <option value="5">Course Outline</option>
                                <option value="6">Others</option>
                            </select>
                        </div>

                        <div className="d-md-none">
                            <input type="submit" value="Upload Document" className="btn btn-primary" />
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default NewCourseMaterial;
