import React, {Fragment, useState, useEffect} from "react";
import {Link} from "react-router-dom";

//** Import Image */
import "../CSS/Home.css";
import coursematerial from "../images/Vectorcourses.png"
import axios from "axios";


const EnrolledCourses = () => {
    localStorage.setItem('page_title', 'Enrolled Courses');
    let userToken = localStorage.getItem('userToken') || '';

    const [loading, setLoading] = useState(null)
    const [courses, setCourses] = useState(null)

    const BACKEND_BASE_URL = "http://elearning-backend.local/api/v1";

    useEffect(() => {
        fetchEnrolledCourses();
    }, [])


    const fetchEnrolledCourses = async () => {
        const endpoint = '/courses/enrolled';

        let args = {
            headers: {
                'Token': userToken,
                // "content-type": "application/json"
            },
            data: {
                'student_id': localStorage.getItem('userID')
            }
        }
        // Making request to backend API
        await axios.get(
            BACKEND_BASE_URL + endpoint,
            args
        ).then((res) => {
            // console.log(res)
            // return
            // console.log(data);
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <>
            <div className="row">
                <div className=" main-body-card col-xl-3 col-lg-6 col-sm-6">
                    <Link to={'/single-course/1'}>
                        <div className="card overflow-hidden">
                            <div className="card-header media border-0 pb-788">
                                <div className="media-body">
                                    <img className="center-image" src={coursematerial} />
                                </div>
                            </div>
                            <div className="card-body pt-4 p-0">
                                <p className=" centercoursetext mb-0 text-black">CSC 301 - Human Computer Interaction</p>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className=" main-body-card col-xl-3 col-lg-6 col-sm-6">
                    <Link to={'/single-course/1'}>
                        <div className="card overflow-hidden">
                            <div className="card-header media border-0 pb-788">
                                <div className="media-body">
                                    <img className="center-image" src={coursematerial} />
                                </div>
                            </div>
                            <div className="card-body pt-4 p-0">
                                <p className=" centercoursetext mb-0 text-black">CSC 301 - Human Computer Interaction</p>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className=" main-body-card col-xl-3 col-lg-6 col-sm-6">
                    <Link to={'/single-course/1'}>
                        <div className="card overflow-hidden">
                            <div className="card-header media border-0 pb-788">
                                <div className="media-body">
                                    <img className="center-image" src={coursematerial} />
                                </div>
                            </div>
                            <div className="card-body pt-4 p-0">
                                <p className=" centercoursetext mb-0 text-black">CSC 301 - Human Computer Interaction</p>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className=" main-body-card col-xl-3 col-lg-6 col-sm-6">
                    <Link to={'/single-course/1'}>
                        <div className="card overflow-hidden">
                            <div className="card-header media border-0 pb-788">
                                <div className="media-body">
                                    <img className="center-image" src={coursematerial} />
                                </div>
                            </div>
                            <div className="card-body pt-4 p-0">
                                <p className=" centercoursetext mb-0 text-black">CSC 301 - Human Computer Interaction</p>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className=" main-body-card col-xl-3 col-lg-6 col-sm-6">
                    <Link to={'/single-course/1'}>
                        <div className="card overflow-hidden">
                            <div className="card-header media border-0 pb-788">
                                <div className="media-body">
                                    <img className="center-image" src={coursematerial}
                                    />
                                </div>
                            </div>
                            <div className="card-body pt-4 p-0">
                                <p className=" centercoursetext mb-0 text-black">CSC 301 - Human Computer Interaction</p>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className=" main-body-card col-xl-3 col-lg-6 col-sm-6">
                    <Link to={'/single-course/1'}>
                        <div className="card overflow-hidden">
                            <div className="card-header media border-0 pb-788">
                                <div className="media-body">
                                    <img className="center-image"
                                         src={coursematerial}
                                    />
                                </div>
                            </div>
                            <div className="card-body pt-4 p-0">
                                <p className=" centercoursetext mb-0 text-black">CSC 301 - Human Computer Interaction</p>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className=" main-body-card col-xl-3 col-lg-6 col-sm-6">
                    <Link to={'/single-course/1'}>
                        <div className="card overflow-hidden">
                            <div className="card-header media border-0 pb-788">
                                <div className="media-body">
                                    <img className="center-image" src={coursematerial} />
                                </div>
                            </div>
                            <div className="card-body pt-4 p-0">
                                <p className=" centercoursetext mb-0 text-black">CSC 301 - Human Computer Interaction</p>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className=" main-body-card col-xl-3 col-lg-6 col-sm-6">
                    <Link to={'/single-course/1'}>
                        <div className="card overflow-hidden">
                            <div className="card-header media border-0 pb-788">
                                <div className="media-body">
                                    <img className="center-image" src={coursematerial} />
                                </div>
                            </div>
                            <div className="card-body pt-4 p-0">
                                <p className=" centercoursetext mb-0 text-black">CSC 301 - Human Computer Interaction</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default EnrolledCourses;
