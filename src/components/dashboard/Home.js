import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {Dropdown} from 'react-bootstrap';
import {Tab, Nav} from "react-bootstrap";
//** Import Image */
import "../CSS/Home.css";

import classroom from "../../images/HomePageIcons/classroom.png"
import pendinassingment from "../../images/HomePageIcons/pendinassingment.png"
import coursematerial from "../../images/HomePageIcons/coursematerial.png"
import timetable from "../../images/HomePageIcons/timetable.png"

const Home = () => {
    localStorage.setItem('page_title', 'Dashboard');
    document.title = localStorage.getItem('page_title')

    return (
        <Fragment>
            <div className="row">
                <div className=" main-body-card col-xl-3 col-lg-6 col-sm-6">
                    <div className="card overflow-hidden">
                        <div className="card-header media border-0 pb-788">
                            <div className="media-body">
                            </div>
                            <img
                                src={pendinassingment}
                            />
                            <div className="text-home">
                                {/*<h2 className="text-black">2</h2>*/}
                            </div>
                        </div>

                        <div className="card-body pt-4 p-0 text-center">
                            <p className="mb-0 text-black">Pending Assignment</p>
                        </div>
                        <div className="text-center">
                            <Link to={`/assignment-list`} className="sub-links">view all</Link>
                        </div>
                    </div>
                </div>

                <div className=" main-body-card col-xl-3 col-lg-6 col-sm-6">
                    <div className="card overflow-hidden">
                        <div className="card-header media border-0 pb-788">
                            <div className="media-body">

                            </div>
                            <img
                                src={classroom}
                            />
                            <div className="text-home">
                                {/*<h2 className="text-black">2</h2>*/}
                            </div>
                        </div>

                        <div className="card-body pt-4 p-0 text-center">
                            <p className="mb-0 text-black">Upcoming Classes</p>
                        </div>
                        <div className="text-center">
                            <Link to={`/virtual-classrooms`} className="sub-links">view all</Link>
                        </div>
                    </div>
                </div>

                <div className=" main-body-card col-xl-3 col-lg-6 col-sm-6">
                    <div className="card overflow-hidden">
                        <div className="card-header media border-0 pb-788">
                            <div className="media-body">

                            </div>
                            <img
                                src={timetable}
                            />
                            <div className="text-home">
                                <h2 className="text-black"></h2>
                            </div>
                        </div>

                        <div className="card-body pt-4 p-0 text-center">
                            <p className="mb-0 text-black">Lecture Timetable</p>
                        </div>
                        <div className="text-center">
                            <Link to={`/timetable`} className="sub-links">view timetable</Link>
                        </div>
                    </div>
                </div>

                <div className=" main-body-card col-xl-3 col-lg-6 col-sm-6">
                    <div className="card overflow-hidden">
                        <div className="card-header media border-0 pb-788">
                            <div className="media-body">

                            </div>
                            <img
                                src={coursematerial}
                            />
                            <div className="text-home">
                                <h2 className="text-black"></h2>
                            </div>
                        </div>

                        <div className="card-body pt-4 p-0 text-center">
                            <p className="mb-0 text-black">Course Material</p>
                        </div>
                        <div className="text-center">
                            <Link to={`/course-materials`} className="sub-links">view all</Link>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Home;
