import React, {Fragment} from "react";

import {Link} from "react-router-dom"

import SingleCourseUpcomingClassTable from "./table/SingleCourseUpcomingClassTable";

import "../CSS/Home.css";

import classroom from "../../images/HomePageIcons/classroom.png"
import pendinassingment from "../../images/HomePageIcons/pendinassingment.png"
import discussion from "../images/discussion board icondiscussionboard.png"
import coursematerial from "../images/Vectorcourses.png"

const SingleCourse = () => {
    localStorage.setItem('page_title', 'CSC 405');
    return (
        <fragment>

            <div className="row">

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
                                    <Link to="/assignment/course/43" className="sub-links">view assignment</Link>
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
                                    <Link to="/virtual-classroom/course/343" className="sub-links">view classes</Link>
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
                                    <Link to="/continuous-assessment/course/345"
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
                                <Link to={`/course-material/course/3`}
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
                                <p className="mb-0 text-black">CSC301 </p>
                            </div>
                            <div className="text-center">
                                <Link to={`/discussion-board/course/3`} className="sub-links">go to room</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </fragment>
    );
};

export default SingleCourse;
