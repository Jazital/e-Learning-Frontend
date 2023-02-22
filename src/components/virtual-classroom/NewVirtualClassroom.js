import React, {useEffect, useState} from "react";
import VirtualClassroomTable from "./VirtualClassroomTable";
import "../CSS/Home.css";
import {Link} from "react-router-dom";
import axios from "axios";
import {Modal} from "react-bootstrap";
import ScaleLoader from "rayloading/lib/ScaleLoader";

const NewVirtualClassroom = () => {
    localStorage.setItem('page_title', 'New Virtual Classroom');
    let userRole = localStorage.getItem('userRole');
    let userToken = localStorage.getItem('userToken') || '';

    const BACKEND_BASE_URL = "http://elearning-backend.local/api/v1";

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
        let endpoint = '/lectures/add'

        let args2 = {
            headers: {
                'Token': userToken,
                'Content-Type': 'multipart/form-data',
            },
        }

        var vcTitle = document.querySelector("#vc-title"); // Get the file input
        var vcDescription = document.querySelector("#vc-description"); // Get the file input
        var vcLectureURL = document.querySelector("#vc-lecture-url"); // Get the file input
        var vcLectureCourse = document.querySelector("#vc-course"); // Get the file input
        var vcLectureDate = document.querySelector("#vc-lecture-date"); // Get the file input
        var vcLecturePlatform = document.querySelector("#vc-platform"); // Get the file input

        var formData = new FormData();
        // formData.append("attachments[]", fileInput.files[0]);
        formData.append("lecture_title", vcTitle.value);
        formData.append("lecture_description", vcDescription.value);
        formData.append("course_id", vcLectureCourse.value);
        formData.append("lecture_platform", vcLecturePlatform.value);
        formData.append("lecture_url", vcLectureURL.value);
        formData.append("lecture_date", vcLectureDate.value);
        await axios.post(
            BACKEND_BASE_URL + endpoint,
            formData,
            args2
        ).then(response => {
            if (response.data.code === 'lecture_created') {
                setResponseMessage(response.data.message)
                setResponseOK(true)
            }
            setIsLoading(false)

            // console.log(response.data)
        }).catch(error => {
            // console.error(error)
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
                            <label htmlFor="vc-course">Course:</label>
                            <select className="form-control" id="vc-course">
                                <option value="">Select course</option>
                                {courses && courses.map((course) =><option value={`${course.course_id}`} key={Math.random()}>{`${course.course_code}`}</option>)}
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
