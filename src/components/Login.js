import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import ScaleLoader from 'rayloading/lib/ScaleLoader';
import {Modal} from "react-bootstrap";
import logo from "./images/ospolylogo.png"

import "./login.css";
import {JazitalBackendBaseURL} from "./helpers/Constants";

const Login = () => {
    document.title = 'Login - Osun State Polytechnic';

    const history = useHistory();

    const [isLoading, setIsLoading] = useState(false);
    const [isLoginPasswordHidden, setIsLoginPasswordHidden] = useState(true);
    const BACKEND_BASE_URL = JazitalBackendBaseURL;
    const endpoint = '/auth/login';

    const [login, setLogin] = useState(
        {
            loginState: null,
            message: null
        }
    );

    // Reset the error div element when the user starts typing
    const handleOnChange = () => {
        setIsLoading(false)
        setLogin({
            loginState: null,
            message: null
        });
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        setIsLoading(true)
        setLogin({loginState: ''})

        await signIn();
    }

    const signIn = async () => {

        // Get the submitted user details
        let submittedUsername = document.getElementById("username_input").value;
        let submittedPassword = document.getElementById("password_input").value;

        let args = {
            username: submittedUsername,
            password: submittedPassword
        }

        // Making request to backend API
        await axios.post(
            BACKEND_BASE_URL + endpoint,
            args
        ).then((res) => {
            if ((res.data.code && res.data.code === 'login_success')) {
                let data = res.data;
                let userDetails = data.data.user;
                setLogin({loginState: "success", message: "Sign in success"});
                localStorage.setItem('userRole', userDetails.user_role);
                localStorage.setItem('userToken', data.token)
                localStorage.setItem('userID', userDetails.id)
                localStorage.setItem('firstName', userDetails.first_name)
                localStorage.setItem('lastName', userDetails.last_name)
                localStorage.setItem('otherName', userDetails.other_names)
                localStorage.setItem('department', userDetails.department)
                localStorage.setItem('email', userDetails.user_email)
                localStorage.setItem('userID', userDetails.id)
                localStorage.setItem('matricNumber', userDetails.matric_number)
                localStorage.setItem('phoneNumber', userDetails.phone_number)

                setIsLoading(false)
                setTimeout(() => {
                    history.push('/dashboard')
                }, 1000)

            }
            else if ((res.data.code && res.data.code === 'temp_login_success')) {
                setIsLoading(false)
                // If it is the initial temporary password, redirect to the modify password page
                localStorage.setItem('userToken', res.data.token)
                let userToken = res.data.token;
                let userID = res.data.user_id;
                setTimeout(() => {
                    history.push(`/modify-password/?token=${userToken}&user_id=${userID}&is_temp_login=true`)
                }, 1000)
            }
            else if ((res.data.code && res.data.code === 'error_login')) {
                setIsLoading(false)
                setLogin({
                    loginState: "failed",
                    message: res.data.message
                });
            }
            else {
                localStorage.removeItem('userRole');
                localStorage.removeItem('userToken')
                localStorage.removeItem('userID')
                localStorage.removeItem('firstName')
                localStorage.removeItem('lastName')
                localStorage.removeItem('otherName')
                localStorage.removeItem('department')
                localStorage.removeItem('email')
                localStorage.removeItem('userID')
                localStorage.removeItem('matricNumber')
                localStorage.removeItem('phoneNumber')
                localStorage.removeItem('page_title')

                setIsLoading(false)
                setLogin({
                    loginState: "failed",
                    message: "Sorry, we could not sign you in at the moment. Please try again"
                });
            }

            // console.log(res.data);
        }).catch(error => {
            console.log(error);
            localStorage.removeItem('userRole');
            localStorage.removeItem('userToken')
            localStorage.removeItem('userID')
            localStorage.removeItem('firstName')
            localStorage.removeItem('lastName')
            localStorage.removeItem('otherName')
            localStorage.removeItem('department')
            localStorage.removeItem('email')
            localStorage.removeItem('userID')
            localStorage.removeItem('matricNumber')
            localStorage.removeItem('phoneNumber')
            localStorage.removeItem('page_title')

            if (error.response) {
                if ((error.response.data.code && error.response.data.code === 'error_login')) {
                    setIsLoading(false)
                    setLogin({
                        loginState: "failed",
                        message: error.response.data.message
                    });
                    return;
                }

                if (error.response.data.message) {
                    setLogin({loginState: "failed", message: "Sorry, we encountered an error while trying to sign you in at the moment. Please try again"});
                    setIsLoading(false)
                }
                else {
                    setLogin({
                        loginState: "failed",
                        message: "Sorry, we could not sign you in at the moment. Please try again"
                    });
                    setIsLoading(false)
                }
            }
            else {
                setLogin({
                    loginState: "failed",
                    message: "Sorry, we could not sign you in at the moment. Kindly check your internet connection"
                });
                setIsLoading(false)
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

    const togglePasswordEyeIcon = (e) => {
        setIsLoginPasswordHidden(!isLoginPasswordHidden)
    }
    return (
        <div className="row justify-content-center h-100 align-items-center h-80">
            {loadingModal(isLoading)}
            <div className="col-md-5">
                <div className="authincation-content">
                    <div className="row no-gutters">
                        <div className="col-xl-12">
                            <div className="auth-form">
                                <div className="text-center">
                                    <img className="signin-logo mb-3" alt="logo" src={logo} />
                                </div>
                                <h4 className="text-center mb-4 "> Sign in your account </h4>
                                {/* Display success or error messages to the user when available */}
                                {(login.loginState === "success") && (
                                    <div className="alert alert-success">{login.message}</div>)}
                                {(login.loginState === "failed") && (
                                    <div className="alert alert-error">{login.message}</div>)}

                                <form action="" onSubmit={submitHandler}>
                                    <div className="form-group">
                                        <label>
                                            <strong>Matric no / Email:</strong>
                                        </label>
                                        <input type="text" placeholder="Enter matric no / email..."
                                               id="username_input" onChange={handleOnChange}
                                               className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label className="mb-1 "> <strong>Password:</strong> </label>
                                        {isLoginPasswordHidden ?
                                         (<>
                                             <input type="password" placeholder="Enter your password..." id="password_input"
                                                    onChange={handleOnChange}
                                                    className="form-control" />
                                             <span id="toggle-password-eye" className="eye-icon mdi mdi-eye"
                                                   onClick={togglePasswordEyeIcon}></span>
                                         </>) :
                                         <>
                                             <input type="text" placeholder="Enter your password..." id="password_input"
                                                    onChange={handleOnChange}
                                                    className="form-control" />
                                             <span id="toggle-password-eye" className="eye-icon mdi mdi-eye-off"
                                                   onClick={togglePasswordEyeIcon}></span>
                                         </>
                                        }

                                    </div>
                                    <div className="form-row d-flex justify-content-between mt-4 mb-2">
                                        <div className="form-group">
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="btn btn-primary btn-block"
                                                onClick={submitHandler}> Sign In
                                        </button>
                                    </div>
                                </form>
                                <div className="mt-4">
                                    Forgot password? <Link to={`/forgot-password`} >Click here</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
