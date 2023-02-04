import React, {Fragment, useEffect, useState} from "react";
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


const SingleCourse = (props) => {
    const history = useHistory();

    // Get ID from URL
    const {course_id} = useParams();
    const [course, setCourse] = useState({
        course_id: '',
        course_code: '',
        course_title: '',
    });
    const [isLoading, setIsLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);
    const [courseLectures, setCourseLectures] = useState([]);

    localStorage.setItem('page_title', course.course_code + "  " + course.course_title);
    let userToken = localStorage.getItem('userToken') || '';

    const BACKEND_BASE_URL = "http://elearning-backend.local/api/v1";

    useEffect(() => {
        fetchSingleCourse();
        // fetchCourseLectures()
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
            if (res.data.code && res.data.code == "courses_fetched") {
                setCourse({
                    course_id: res.data.data.course.course_id,
                    course_code: res.data.data.course.course_code,
                    course_title: res.data.data.course.course_title,
                })
                setShowContent(true)
                setIsLoading(false)
            }
            else {
                console.log("No course(s) found")
                setShowContent(false)
                setIsLoading(false)
            }
        }).catch(error => {
            setShowContent(false)
            setIsLoading(false)
        })
    }

    async function fetchCourseLectures() {
        setShowContent(false)
        setIsLoading(true)

        const endpoint = '/lectures/fetch-by-course-code';
        let args = {
            headers: {
                'Token': userToken,
            },
            params: {
                'course_code': course.course_code,
            },
        }
        // Making request to backend API
        await axios.get(
            BACKEND_BASE_URL + endpoint,
            args
        ).then((res) => {
            console.log(res.data.data)
            setShowContent(true)
            setIsLoading(false)

            // if (res.data.code && res.data.code == "courses_fetched") {
            //     setCourse({
            //         course_id: res.data.data.course.course_id,
            //         course_code: res.data.data.course.course_code,
            //         course_title: res.data.data.course.course_title,
            //     })
            //     setShowContent(true)
            //     setIsLoading(false)
            // }
            // else {
            //     console.log("No course(s) found")
            //     setShowContent(false)
            //     setIsLoading(false)
            // }
        }).catch(error => {
            setShowContent(false)
            setIsLoading(false)
            console.log(error.response.data.code)
            if(error.response.data.code && (error.response.data.code=="user_not_signed_in") ){
                history.push('/')
            }
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
            {showContent && (<div className="row">
                <div className="col-xl-9 col-lg-6 col-sm-6">
                    <div className="the">
                        <div className=" main-body-card col-xl-4 col-lg-6 col-sm-6">
                            <div className="card overflow-hidden">
                                <div className="card-header media border-0 pb-788">
                                    <div className="media-body">
                                    </div>
                                    <img
                                        src={coursematerial}
                                    />
                                    <div className="text-home">
                                        <h2 className="text-black">2</h2>
                                    </div>
                                </div>
                                <div className="text-center card-body pt-4 p-0">
                                    <p className="mb-0 text-black">Pending Assignments</p>
                                </div>
                                <div className="text-center">
                                    <Link to={`/assignment/course/${course_id}`}
                                          className="sub-links">view assignment</Link>
                                </div>
                            </div>
                        </div>

                        <div className=" main-body-card col-xl-4 col-lg-6 col-sm-6">
                            <div className="card overflow-hidden">
                                <div className="card-header media border-0 pb-788">
                                    <div className="media-body">

                                    </div>
                                    <img
                                        src={classroom}
                                    />
                                    <div className="text-home">
                                        <h2 className="text-black">2</h2>
                                    </div>
                                </div>

                                <div className="text-center card-body pt-4 p-0">
                                    <p className="mb-0 text-black">Upcoming Classes</p>
                                </div>
                                <div className="text-center">
                                    <Link to={`/virtual-classroom/course/${course_id}`} className="sub-links">view classes</Link>
                                </div>
                            </div>
                        </div>

                        <div className=" main-body-card col-xl-4 col-lg-6 col-sm-6">
                            <div className="card overflow-hidden">
                                <div className="card-header media border-0 pb-788">
                                    <div className="media-body">

                                    </div>
                                    <img
                                        src={pendinassingment}
                                    />
                                    <div className="text-home">
                                        <h2 className="text-black">30%</h2>
                                    </div>
                                </div>

                                <div className="text-center card-body pt-4 p-0">
                                    <p className="mb-0 text-black">Continuous Assignment</p>
                                </div>
                                <div className="text-center">
                                    <Link to={`/continuous-assessment/course/${course_id}`}
                                          className="sub-links">view C.A scores</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <SingleCourseUpcomingClassTable />
                </div>
                <div className="col-xl-3 col-lg-6 col-sm-6">

                    <div className="col-xl col-lg-6 col-sm-6">
                        <div className="card overflow-hidden">
                            <div className="card-header media border-0 pb-0">
                                <div className="media-body">
                                </div>
                                <img src={coursematerial} />
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

                    <div className="col-xl col-lg-6 col-sm-6">
                        <div className="card overflow-hidden">
                            <div className="card-header media border-0 pb-0">
                                <div className="media-body">
                                </div>
                                <img src={discussion} />
                            </div>
                            <br />

                            <div className="text-center">
                                <p className="mb-0 text-black">{course.course_code} </p>
                            </div>
                            <div className="text-center">
                                <Link to={`/discussion-board/course/${course_id}`} className="sub-links">go to room</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)}

        </>
    );
};

export default SingleCourse;
