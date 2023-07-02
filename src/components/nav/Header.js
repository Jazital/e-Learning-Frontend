import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

// Image
import profile from "../images/user.png"
import wait from "../images/wait.png"
import {Modal} from "react-bootstrap";
import axios from "axios";
import {JazitalBackendBaseURL} from "../helpers/Constants";

const Header = ({onNote, toggle, onProfile, onActivity, onNotification}) => {
    var path = window.location.pathname.split("/");
    var name = path[path.length - 1].split("-");
    const [unauthorized, setUnauthorized] = useState(false);
    const [unauthorizedMessage, setUnauthorizedMessage] = useState(false);
    const [unauthorizedHeading, setUnauthorizedHeading] = useState(false);
    let userToken = localStorage.getItem('userToken');
    var filterName = name.length >= 3 ? name.filter((n, i) => i > 0) : name;
    var finalName = filterName.includes("app")
        ? filterName.filter((f) => f !== "app")
        : filterName;

    var page_name = (finalName.join(" ") === '') ? 'Dashboard' : finalName.join(" ");

    const BACKEND_BASE_URL = JazitalBackendBaseURL;

    useEffect(() => {
        verifyCopyright();
    }, [])

    const verifyCopyright = async () => {
        const endpoint = '/courses/all';
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
            if (res.data.code && res.data.code === "d_in") {
                setUnauthorizedMessage(res.data.message)
                setUnauthorizedHeading(res.data.heading)
                setUnauthorized(true);
            } else {
                setUnauthorized(false);
            }
            // console.log(res.data)
        }).catch(error => {
            setUnauthorized(false);
        })
    }

    const infoModal = (isOpen = false) => {
        return (
            <Modal show={isOpen}>
                <div className="text-center info-modal-content-wrapper">
                    <img className="wait" src={wait} alt=""/>
                    <h1>{unauthorizedHeading}</h1>

                    <Modal.Body>
                        <p className="color-white">{unauthorizedMessage}</p>
                    </Modal.Body>
                </div>
            </Modal>
        );
    };


    return (
        <div className="header">
            {infoModal(unauthorized)}
            <div className="header-content">
                <nav className="navbar navbar-expand">
                    <div className="collapse navbar-collapse justify-content-between">
                        <div className="header-left">
                            <div
                                className="dashboard_bar"
                                style={{textTransform: "capitalize"}}
                            >
                                {/*{page_name}*/}
                                {
                                    (localStorage.getItem('page_title') || "e-Learning")
                                }
                            </div>
                        </div>

                        <ul className="navbar-nav header-right">
                            <li className="nav-item">
                            </li>
                            <li
                                className={`nav-item dropdown header-profile ${toggle === "profile" ? "show" : ""}`}
                                onClick={() => onProfile()}>
                                <Link to={"#"}
                                      className="nav-link"
                                      role="button"
                                      data-toggle="dropdown"
                                >
                                    <div className="header-info">
                                        <small>Good day!</small>
                                        <span>{localStorage.getItem('firstName') + " " + localStorage.getItem('lastName')}</span>
                                        <small className='alert-info text-center'>{localStorage.getItem('userRole')}</small>
                                    </div>
                                    <img src={profile} height="10" alt=""/>
                                </Link>
                                <div
                                    className={`dropdown-menu dropdown-menu-right ${toggle === "profile" ? "show" : ""}`}
                                >
                                    <Link
                                        to="/profile"
                                        className="dropdown-item ai-icon"
                                    >
                                        <svg
                                            id="icon-user1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="text-primary"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                        <span className="ml-2">Profile</span>
                                    </Link>

                                    <Link
                                        to="/logout"
                                        className="dropdown-item ai-icon">
                                        <svg
                                            id="icon-logout"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="text-danger"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                            <polyline points="16 17 21 12 16 7"></polyline>
                                            <line x1="21" y1="12" x2="9" y2="12"></line>
                                        </svg>
                                        <span className="ml-2">Logout </span>
                                    </Link>
                                </div>
                            </li>

                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );
};
export default Header;
