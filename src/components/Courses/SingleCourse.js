import React, {useEffect, useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom"
import {Modal} from "react-bootstrap";
import ScaleLoader from "rayloading/lib/ScaleLoader";
import axios from "axios";

import SingleCourseUpcomingClassTable from "./table/SingleCourseUpcomingClassTable";

import "../CSS/Home.css";

import classroom from "../../images/HomePageIcons/classroom.png"
import pendinassingment from "../../images/HomePageIcons/pendinassingment.png"
import discussion from "../images/discussion board icondiscussionboard.png"
import coursematerial from "../images/Vectorcourses.png"
import {JazitalBackendBaseURL} from "../helpers/Constants";


const SingleCourse = (props) => {
    const history = useHistory();

    let userRole = localStorage.getItem('userRole');
    // Get ID from URL
    const {course_id} = useParams();
    const [course, setCourse] = useState({
        courseID: '',
        courseCode: '',
        course_title: '',
    });
    const [isLoading, setIsLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);

    localStorage.setItem('page_title', course.courseCode + " - " + course.course_title);
    let userToken = localStorage.getItem('userToken') || '';

    document.title = localStorage.getItem('page_title')

    const BACKEND_BASE_URL = JazitalBackendBaseURL;

    useEffect(() => {
        setTimeout(() => {
            fetchSingleCourse();
        }, 2000)
    }, [])

    async function fetchSingleCourse() {
        const endpoint = '/courses/' + course_id;
        let args = {
            headers: {
                'Token': userToken,
            },
        }
        // Making request to backend API
        await axios.get(
            BACKEND_BASE_URL + endpoint,
            args
        ).then((res) => {
            if (res.data.code && res.data.code === "courses_fetched") {
                setCourse({
                    courseID: res.data.data.course.course_id,
                    courseCode: res.data.data.course.course_code,
                    course_title: res.data.data.course.course_title,
                })
                setShowContent(true)
                setIsLoading(false)
            }
            else {
                // console.log("No course(s) found")
                setShowContent(false)
                setIsLoading(false)
            }
        }).catch(error => {
            setShowContent(false)
            setIsLoading(false)
        })
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

            <div className="row">
                <div className="col-xl-6 col-lg-6 col-sm-12 mb-3">
                    {userRole=="student" && <Link to={'/enrolled-courses'} className="btn btn-primary">Back to courses</Link> }
                    {userRole=="lecturer" && <Link to={'/assigned-courses'} className="btn btn-primary">Back to courses</Link> }
                </div>
                <div className="col-xl-6 col-lg-6 col-sm-12 mb-3 text-right justify-content-end">
                        {userRole == "lecturer" &&
                        <Link to={'/new-virtual-classroom'} className="btn btn-primary">New Virtual Classroom</Link>}
                </div>
            </div>
            {showContent && (<div className="row">
                <div className="col-xl-12 col-lg-12 col-sm-12">
                    <div className="the flex-column flex-md-row">

                        <div className="col-12 col-md-4">
                            <div className="card overflow-hidden">
                                <div className="card-header media border-0 pb-0">
                                    <div className="media-body">
                                    </div>
                                    <img src={coursematerial} alt="" />
                                </div>
                                <br />
                                <div className="text-center">
                                    <p className="mb-0 text-black">Course Materials</p>
                                </div>
                                <div className="text-center">
                                    <Link to={`/course-material/course/${course_id}`}
                                          className="sub-links">view course materials</Link>
                                </div>
                            </div>
                        </div>


                        <div className=" main-body-card col-12 col-md-4">
                            <div className="card overflow-hidden">
                                <div className="card-header media border-0 pb-788">
                                    <div className="media-body">
                                    </div>
                                    <img
                                        src={pendinassingment}
                                        alt=""
                                    />
                                    <div className="text-home">
                                        {/*<h2 className="text-black">2</h2>*/}
                                    </div>
                                </div>
                                <div className="text-center pt-4 card-body p-0">
                                    <p className="mb-0 text-black">Pending Assignments</p>
                                </div>
                                <div className="text-center">
                                    <Link to={`/assignments/course/${course_id}`}
                                          className="sub-links">view assignment</Link>
                                </div>
                            </div>
                        </div>

                        <div className=" main-body-card col-12 col-md-4">
                            <div className="card overflow-hidden">
                                <div className="card-header media border-0 pb-788">
                                    <div className="media-body">

                                    </div>
                                    <img
                                        src={classroom}
                                        alt=""
                                    />
                                    <div className="text-home">
                                        {/*<h2 className="text-black">2</h2>*/}
                                    </div>
                                </div>

                                <div className="text-center card-body p-0">
                                    <p className="mb-0 text-black">Upcoming Classes</p>
                                </div>
                                <div className="text-center">
                                    <Link to={`/virtual-classroom/course/${course_id}`}
                                          className="sub-links">view classes</Link>
                                </div>
                            </div>
                        </div>

                    </div>
                    <SingleCourseUpcomingClassTable courseID={course.courseID} />
                </div>
            </div>)}
        </>
    );
};

export default SingleCourse;
