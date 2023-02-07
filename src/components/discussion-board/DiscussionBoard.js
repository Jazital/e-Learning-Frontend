import React from 'react'

// import Chat, {Bubble, useMessages} from '@chatui/core';
import '@chatui/core/dist/index.css';
import {Link} from "react-router-dom";
import coursematerial from "../images/Vectorcourses.png";

const DiscussionBoard = () => {
    // const {messages, appendMsg, setTyping} = useMessages([]);

    localStorage.setItem('page_title', 'Discussion Board');

    return (

        <fragment>
            <div className="row">
                <div className=" main-body-card col-xl-3 col-lg-6 col-sm-6">
                    <Link to={'/discussion-board/course/1'}>
                        <div className="card overflow-hidden">
                            <div className="card-header media border-0 pb-788">
                                <div className="media-body">
                                    <img className="center-image" alt="" src={coursematerial} />
                                </div>
                            </div>
                            <div className="card-body pt-4 p-0">
                                <p className=" centercoursetext mb-0 text-black">General Discussion</p>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className=" main-body-card col-xl-3 col-lg-6 col-sm-6">
                    <Link to={'/discussion-board/course/1'}>
                        <div className="card overflow-hidden">
                            <div className="card-header media border-0 pb-788">
                                <div className="media-body">
                                    <img className="center-image" alt="" src={coursematerial} />
                                </div>
                            </div>
                            <div className="card-body pt-4 p-0">
                                <p className=" centercoursetext mb-0 text-black">CSC 301 Discussion</p>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className=" main-body-card col-xl-3 col-lg-6 col-sm-6">
                    <Link to={'/discussion-board/course/1'}>
                        <div className="card overflow-hidden">
                            <div className="card-header media border-0 pb-788">
                                <div className="media-body">
                                    <img className="center-image" alt="" src={coursematerial} />
                                </div>
                            </div>
                            <div className="card-body pt-4 p-0">
                                <p className=" centercoursetext mb-0 text-black">BCH 204 Discussion</p>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className=" main-body-card col-xl-3 col-lg-6 col-sm-6">
                    <Link to={'/discussion-board/course/1'}>
                        <div className="card overflow-hidden">
                            <div className="card-header media border-0 pb-788">
                                <div className="media-body">
                                    <img className="center-image" alt="" src={coursematerial} />
                                </div>
                            </div>
                            <div className="card-body pt-4 p-0">
                                <p className=" centercoursetext mb-0 text-black">GST 102 Discussion</p>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className=" main-body-card col-xl-3 col-lg-6 col-sm-6">
                    <Link to={'/discussion-board/course/1'}>
                        <div className="card overflow-hidden">
                            <div className="card-header media border-0 pb-788">
                                <div className="media-body">
                                    <img className="center-image" alt="" src={coursematerial}
                                    />
                                </div>
                            </div>
                            <div className="card-body pt-4 p-0">
                                <p className=" centercoursetext mb-0 text-black">POL 322 Discussion</p>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className=" main-body-card col-xl-3 col-lg-6 col-sm-6">
                    <Link to={'/discussion-board/course/1'}>
                        <div className="card overflow-hidden">
                            <div className="card-header media border-0 pb-788">
                                <div className="media-body">
                                    <img className="center-image" alt=""
                                         src={coursematerial}
                                    />
                                </div>
                            </div>
                            <div className="card-body pt-4 p-0">
                                <p className=" centercoursetext mb-0 text-black">ECO 413 Discussion</p>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className=" main-body-card col-xl-3 col-lg-6 col-sm-6">
                    <Link to={'/discussion-board/course/1'}>
                        <div className="card overflow-hidden">
                            <div className="card-header media border-0 pb-788">
                                <div className="media-body">
                                    <img className="center-image" alt="" src={coursematerial} />
                                </div>
                            </div>
                            <div className="card-body pt-4 p-0">
                                <p className=" centercoursetext mb-0 text-black">CHM 202 Discussion</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </fragment>
    );
};

export default DiscussionBoard;
