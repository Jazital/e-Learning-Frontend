import React, {useState} from "react";
import {useHistory, Link} from "react-router-dom";
import axios from "axios";
import ScaleLoader from 'rayloading/lib/ScaleLoader';
import {Modal} from "react-bootstrap";
import logo from "./images/ospolylogo.png"

import "./login.css";
import {JazitalBackendBaseURL} from "./helpers/Constants";
import tetfundLogo from "./images/tetfund.png";

const ForgotPassword = () => {
    document.title = 'Forgot Password';
    const history = useHistory();


    const [isLoading, setIsLoading] = useState(false);
    const BACKEND_BASE_URL = JazitalBackendBaseURL;
    const endpoint = '/auth/forgot-password';

    const [login, setLogin] = useState(
        {
            loginState: null,
            message: null
        }
    );

    const submitHandler = async (e) => {
        e.preventDefault();

        setIsLoading(true)
        setLogin({loginState: ''})

        await ModifyUserPassword();
    }

    const ModifyUserPassword = async () => {
        // Get the submitted user details
        let username = document.getElementById("username").value;

        let args = {
            username: username,
        }

        // Making request to backend API
        await axios.post(
            BACKEND_BASE_URL + endpoint,
            args
        ).then((res) => {
            if ((res.data.code && res.data.code === 'password_reset_success')) {
                let data = res.data;
                setLogin({loginState: "success", message: data.message});
                document.getElementById("details-form").reset()

                setIsLoading(false)
            } else {
                setIsLoading(false)
                setLogin({
                    loginState: "failed",
                    message: "Sorry, your request could not be completed. Please try again"
                });
            }
        }).catch(error => {
            setIsLoading(false)

        })
    }

    const loadingModal = (isOpen = false) => {
        return (
            <Modal show={isOpen}>
                <ScaleLoader color="#ffffff" size="18px" margin="4px"/>
            </Modal>
        );
    };


    // Reset the error div element when the user starts typing
    const handleOnChange = () => {
        setIsLoading(false)
        setLogin({
            loginState: null,
            message: null
        });
    }
    return (
        <div className="row justify-content-center h-100 align-items-center flex-column">
            {loadingModal(isLoading)}
            <div className="col-md-4 d-flex justify-content-center align-content-center flex-column flex-grow-1">
                <div className="authincation-content">
                    <div className="row no-gutters">
                        <div className="col-xl-12">
                            <div className="auth-form">
                                {/*<div className="text-center">*/}
                                {/*    <img className="signin-logo mb-3" alt="logo" src={logo} />*/}
                                {/*</div>*/}
                                <h4 className="text-center mb-4 "> Forgot Password </h4>
                                {/* Display success or error messages to the user when available */}
                                {(login.loginState === "success") && (
                                    <div className="alert alert-success">{login.message}</div>)}
                                {(login.loginState === "failed") && (
                                    <div className="alert alert-error">{login.message}</div>)}

                                <form action="" onSubmit={submitHandler} id="details-form">
                                    <div className="form-group">
                                        <label className="mb-1 "> <strong>Email/Matric number:</strong> </label>
                                        <input type="text" placeholder="Enter your email or matric number..." id="username"
                                               onChange={handleOnChange}
                                               className="form-control"/>
                                    </div>

                                    <div className="text-center">
                                        <button type="submit" className="btn btn-primary btn-block"
                                                onClick={submitHandler}> Submit
                                        </button>
                                    </div>
                                </form>
                                <div className="mt-4">
                                    <Link to={`/`}>&lt;&lt; Back to login</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>Powered by <img className="tetfund-footer-logo" src={tetfundLogo}/></div>
        </div>
    );
};

export default ForgotPassword;
