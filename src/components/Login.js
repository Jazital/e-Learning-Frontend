import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import ScaleLoader from 'rayloading/lib/ScaleLoader';
import {Modal} from "react-bootstrap";

import "./login.css";

const Login = () => {
    const history = useHistory();

    const [isLoading, setIsLoading] = useState(false);

    const BACKEND_BASE_URL = "http://elearning-backend.local/api/v1";
    const endpoint = '/auth/login';

    const [login, setLogin] = useState(
        {
            loginState: null,
            message: null
        }
    );

    // Reset the error div element when the user starts typing
    const handleOnChange = (event) => {
        setIsLoading(false)
        setLogin({
            loginState: "",
            message: ''
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
        var submittedUsername = document.getElementById("username_input").value;
        var submittedPassword = document.getElementById("password_input").value;

        var args = {
            username: submittedUsername,
            password: submittedPassword
        }

        // Making request to backend API
        await axios.post(
            BACKEND_BASE_URL + endpoint,
            args
        ).then((res) => {
            if ((res.data.code && res.data.code == 'login_success')) {
                var data = res.data;
                var userDetails = data.data.user;
                setLogin({loginState: "success", message: data.message});
                localStorage.setItem('userRole', userDetails.user_role);
                localStorage.setItem('userToken', data.token)
                localStorage.setItem('userID', userDetails.id)
                localStorage.setItem('firstName', userDetails.first_name)
                localStorage.setItem('lastName', userDetails.last_name)
                localStorage.setItem('email', userDetails.user_email)
                localStorage.setItem('userID', userDetails.id)
                localStorage.setItem('matricNumber', userDetails.matric_number)
                localStorage.setItem('phoneNumber', userDetails.phone_number)

                setIsLoading(false)
                setTimeout(() => {
                    history.push('/dashboard')
                }, 1000)

            }
            else {
                localStorage.removeItem('userRole');
                localStorage.removeItem('userToken')
                localStorage.removeItem('userID')
                localStorage.removeItem('firstName')
                localStorage.removeItem('lastName')
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
        }).catch(error => {
            localStorage.removeItem('userRole');
            localStorage.removeItem('userToken')
            localStorage.removeItem('userID')
            localStorage.removeItem('firstName')
            localStorage.removeItem('lastName')
            localStorage.removeItem('email')
            localStorage.removeItem('userID')
            localStorage.removeItem('matricNumber')
            localStorage.removeItem('phoneNumber')
            localStorage.removeItem('page_title')

            if (error.response) {
                if (error.response.data.message) {
                    setLogin({loginState: "failed", message: error.response.data.message});
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
    return (
        <div className="row justify-content-center h-100 align-items-center h-80">
            {loadingModal(isLoading)}
            <div className="col-md-5">
                <div className="authincation-content">
                    <div className="row no-gutters">
                        <div className="col-xl-12">
                            <div className="auth-form">
                                <h4 className="text-center mb-4 "> Sign in your account </h4>
                                {/* Display success or error messages to the user when available */}
                                {(login.loginState == "success") && (
                                    <div className="alert alert-success">{login.message}</div>) || ""}
                                {(login.loginState == "failed") && (
                                    <div className="alert alert-error">{login.message}</div>) || ""}

                                <form action="" onSubmit={submitHandler}>
                                    <div className="form-group"><label className="mb-1 "> <strong>Email / Matric no:</strong>
                                    </label>
                                    </div>
                                    <input type="text" id="username_input" onChange={handleOnChange}
                                           className="form-control" />
                                    <div className="form-group">
                                        <label className="mb-1 "> <strong>Password:</strong> </label>
                                        <input type="password" id="password_input" onChange={handleOnChange}
                                               className="form-control" />
                                    </div>
                                    {/*Remember sign-in in checkbox temporarily disabled*/}
                                    <div className="form-row d-flex justify-content-between mt-4 mb-2">
                                        <div className="form-group">
                                            {/*<div className="custom-control custom-checkbox ml-1 ">
                                                <input type="checkbox" className="custom-control-input"
                                                       id="basic_checkbox_1" />
                                                <label className="custom-control-label"
                                                       htmlFor="basic_checkbox_1"> Remember me </label>
                                            </div>*/}
                                        </div>
                                        {/*<div className="form-group">
                                         <Link className="" to="/forgot-password"> Forgot Password? </Link>
                                         </div>*/}
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="btn btn-primary btn-block"
                                                onClick={submitHandler}> Sign In
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
