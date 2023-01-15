import React, {Fragment} from "react";

import {Link} from "react-router-dom"

import CourseMaterialTable from "./table/CourseMaterialTable";

import "../CSS/Home.css";

import classroom from "../../images/HomePageIcons/classroom.png"
import pendinassingment from "../../images/HomePageIcons/pendinassingment.png"
import discussion from "../images/discussion board icondiscussionboard.png"
import coursematerial from "../images/Vectorcourses.png"

const SingleCourse = () => {
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
                                    <a href="/assignment">view assignment</a>
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
                                    <Link to="/virtual-classroom">view classes</Link>
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
                                        <h2 className="text-black">3</h2>
                                    </div>
                                </div>

                                <div className="text-center card-body pt-4 p-0">
                                    <p className="mb-0 text-black">Continuous Assignment</p>
                                </div>
                                <div className="text-center">
                                    <a href="#">view C.A scores</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <CourseMaterialTable />
                </div>
                <div className="col-xl-3 col-lg-6 col-sm-6">

                    <div className="col-xl col-lg-6 col-sm-6">
                        <div className="card overflow-hidden">
                            <div className="card-header media border-0 pb-0">
                                <div className="media-body">
                                </div>
                                <img src={pendinassingment} />
                            </div>
                            <br />
                            <div className="text-center">
                                <p className="mb-0 text-black">All Assignments</p>
                            </div>
                            <div className="text-center">
                                <a href="#">view assignments</a>
                            </div>
                        </div>
                    </div>

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
                                <Link to={`/course-material/3`}>view course materials</Link>
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
                                <p className="mb-0 text-black">Discussion Board</p>
                            </div>
                            <div className="text-center">
                                <a href="#">go to discussion</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </fragment>
    );
};

export default SingleCourse;
