import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {Modal} from "react-bootstrap";

import ScaleLoader from "rayloading/lib/ScaleLoader";
import {JazitalBackendBaseURL} from "../helpers/Constants";

import "./Profile.css"

const AddUser = () => {
    let username = undefined;
    localStorage.setItem('page_title', 'Add New User');
    let userRole = localStorage.getItem('userRole');
    let userToken = localStorage.getItem('userToken');
    const [isLoginPasswordHidden, setIsLoginPasswordHidden] = useState(true);

    const BACKEND_BASE_URL = JazitalBackendBaseURL;
    let endpoint = '';

    const [login, setLogin] = useState(
        {
            loginState: null,
            message: null
        }
    );

    const [responseOK, setResponseOK] = useState(null);
    const [responseOKMessage, setResponseOKMessage] = useState('');
    const [responseError, setResponseError] = useState(null);
    const [responseErrorMessage, setResponseErrorMessage] = useState('');
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const loadingModal = (isOpen = false) => {
        return (
            <Modal show={isOpen}>
                <ScaleLoader color="#ffffff" size="18px" margin="4px"/>
            </Modal>
        );
    };

    const submitHandler = async (e) => {
        e.preventDefault()

        setIsLoading(true)
        let endpoint = '/users/add-user'

        let args2 = {
            headers: {
                'Authorization': 'Bearer '+userToken,
                'Content-Type': 'multipart/form-data',
            },
        }


        var userEmail = document.querySelector("#user-email"); //
        var userPassword = document.querySelector("#user-password"); //
        var userFirstName = document.querySelector("#user-firstname"); //
        var userLastName = document.querySelector("#user-lastname"); //
        var userOtherNames = document.querySelector("#user-othernames"); //
        var userPhone = document.querySelector("#user-phone"); //

        var formData = new FormData();
        formData.append("email", userEmail.value);
        formData.append("password", userPassword.value);
        formData.append("first_name", userFirstName.value);
        formData.append("last_name", userLastName.value);
        formData.append("other_names", userOtherNames.value);
        formData.append("phone", userPhone.value);
        formData.append("role", userRole);

        // console.log(userRole);

        await axios.post(
            BACKEND_BASE_URL + endpoint,
            formData,
            args2
        ).then(response => {
            // console.log(response);
            return; // TODO: REMOVE RETURN AFTER LECTURER DEPARTMENT NOT SUBMITTING BUG FIX
            if (response.data.code == 'new_user_created') {
                setResponseOKMessage(response.data.message)
                setResponseOK(true)
                setResponseError(false)
                document.getElementById("user-form").reset() // TODO: Activate the form reset when problem is fixed;
            }
            setIsLoading(false)

           // console.log(response.data)
        }).catch(error => {
            console.error(error)
            if (error.response.data.message) {
                setResponseErrorMessage(error.response.data.message)
                setResponseError(true)
                setResponseOK(false)
            } else {
                setResponseErrorMessage("Sorry, we cannot create the assignment at the moment. Please try again later.")
                setResponseError(true)
                setResponseOK(false)
            }

            setIsLoading(false)
        })
    }

    const handleOnChange = () => {
        setLogin({
            loginState: null,
            message: null
        });
    }

    const togglePasswordEyeIcon = (e) => {
        setIsLoginPasswordHidden(!isLoginPasswordHidden)
    }

    return (
        <>


            <div className="row">
                <div className="col-xl-9 col-xxl-9 col-lg-9">
                    {loadingModal(isLoading)}
                    {responseOK && <div className="alert alert-success col-12">
                        {responseOKMessage}
                    </div>}

                    {responseError && <div className="alert alert-danger col-12">
                        {responseErrorMessage}
                    </div>}

                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card profile-card">
                                <div className="card-body">
                                    <form id="user-form" action="" onSubmit={submitHandler}>
                                        <div className="mb-5">
                                            <div className="row">
                                                <div className="col-xl-6 col-sm-6">
                                                    <div className="form-group">
                                                        <label>First Name*</label>
                                                        <input id="user-firstname"
                                                               type="text"
                                                               placeholder="Enter first name..."
                                                               className="form-control" required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-sm-6">
                                                    <div className="form-group">
                                                        <label>Last Name*</label>
                                                        <input id="user-lastname"
                                                               type="text"
                                                               placeholder="Enter last name..."
                                                               className="form-control" required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-sm-6">
                                                    <div className="form-group">
                                                        <label>Other Name</label>
                                                        <input id="user-othernames"
                                                               type="text"
                                                               placeholder="Enter other names..."
                                                               className="form-control"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-sm-6">
                                                    <div className="form-group">
                                                        <label>Email*</label>
                                                        <input id="user-email"
                                                               type="email"
                                                               placeholder="Enter email..."
                                                               className="form-control"
                                                               autoComplete="false" required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-sm-6">
                                                    <div className="form-group">
                                                        <label>Phone Number*</label>
                                                        <input id="user-phone"
                                                               type="tel"
                                                               placeholder="Enter phone number..."
                                                               className="form-control" required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-sm-6">
                                                    <div className="form-group">
                                                        <label>Password*</label>

                                                        {isLoginPasswordHidden ?
                                                            (<>
                                                                <input type="password" placeholder="Enter password..." id="user-password"
                                                                       onChange={handleOnChange}
                                                                       className="form-control" autoComplete="false" required/>
                                                                <span id="toggle-password-eye" className="eye-icon mdi mdi-eye"
                                                                      onClick={togglePasswordEyeIcon}></span>
                                                            </>) :
                                                            <>
                                                                <input type="text" placeholder="Enter password..." id="user-password"
                                                                       onChange={handleOnChange}
                                                                       className="form-control" autoComplete="false" required/>
                                                                <span id="toggle-password-eye" className="eye-icon mdi mdi-eye-off"
                                                                      onClick={togglePasswordEyeIcon}></span>
                                                            </>
                                                        }
                                                    </div>
                                                </div>

                                            </div>
                                            <div><input type="submit" value="Submit" className="btn btn-primary"/></div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddUser;
