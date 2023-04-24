import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import ScaleLoader from 'rayloading/lib/ScaleLoader';
import {Modal} from "react-bootstrap";
import logo from "./images/ospolylogo.png"
import {Link, useParams} from "react-router-dom";

import "./login.css";
import {JazitalBackendBaseURL} from "./helpers/Constants";

const ModifyPassword = () => {
    document.title = 'Modify Password';
    const history = useHistory();

    let URLQueryParams = new URLSearchParams(history.location.search);
    let token = URLQueryParams.get('token') || 0;


    const [isLoading, setIsLoading] = useState(false);
    const [isLoginPasswordHidden1, setIsLoginPasswordHidden1] = useState(true);
    const [isLoginPasswordHidden2, setIsLoginPasswordHidden2] = useState(true);
    const BACKEND_BASE_URL = JazitalBackendBaseURL;
    const endpoint = '/auth/modify-password';

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
        let newPassword = document.getElementById("new-password").value;
        let confirmPassword = document.getElementById("confirm-password").value;

        if(!(newPassword==confirmPassword)){
            setIsLoading(false)
            setLogin({
                loginState: "failed",
                message: "Your password do not match. Please try again"
            });
            return false;
        }

        if(!(newPassword.length >= 6)){
            setIsLoading(false)
            setLogin({
                loginState: "failed",
                message: "Your password must be 6 characters or more. Please try again"
            });
            return false;
        }

        var data = {
            "new_password": newPassword,
        };

        let args = {
            headers: {
                'Token': token,
                'Content-Type': 'multipart/form-data',
            },
        }

        // Making request to backend API
        await axios.post(
            BACKEND_BASE_URL + endpoint,
            data,
            args
        ).then((res) => {
            if ((res.data.code && res.data.code === 'modify_password_success')) {
                let data = res.data;
                let userDetails = data.data.user;
                setLogin({loginState: "success", message: data.message});
                localStorage.setItem('userRole', userDetails.user_role);

                setIsLoading(false)
                setTimeout(() => {
                    history.push('./')
                }, 2000)
            }
            else {
                setIsLoading(false)
                setLogin({
                    loginState: "failed",
                    message: "Sorry, your password could not be modified at the moment. Please try again"
                });
            }
        }).catch(error => {
           
        })
    }

    const loadingModal = (isOpen = false) => {
        return (
            <Modal show={isOpen}>
                <ScaleLoader color="#ffffff" size="18px" margin="4px" />
            </Modal>
        );
    };

    const togglePasswordEyeIcon1 = (e) => {
        setIsLoginPasswordHidden1(!isLoginPasswordHidden1)
    }

    const togglePasswordEyeIcon2 = (e) => {
        setIsLoginPasswordHidden2(!isLoginPasswordHidden2)
    }

    
    // Reset the error div element when the user starts typing
    const handleOnChange = () => {
        setIsLoading(false)
        setLogin({
            loginState: null,
            message: null
        });
    }
    return (
        <div className="row justify-content-center h-100 align-items-center h-80">
            {loadingModal(isLoading)}
            <div className="col-md-5">
                <div className="authincation-content">
                    <div className="row no-gutters">
                        <div className="col-xl-12">
                            <div className="auth-form">
                                {/*<div className="text-center">*/}
                                {/*    <img className="signin-logo mb-3" alt="logo" src={logo} />*/}
                                {/*</div>*/}
                                <h4 className="text-center mb-4 "> Modify Password </h4>
                                {/* Display success or error messages to the user when available */}
                                {(login.loginState === "success") && (
                                    <div className="alert alert-success">{login.message}</div>) || ("")}
                                {(login.loginState === "failed") && (
                                    <div className="alert alert-error">{login.message}</div>) || ("")}

                                <form action="" onSubmit={submitHandler}>
                                <div className="form-group">
                                        <label className="mb-1 "> <strong>New Password:</strong> </label>
                                        {isLoginPasswordHidden1 ?
                                         (<>
                                             <input type="password" placeholder="Enter new password..." id="new-password"
                                                    onChange={handleOnChange}
                                                    className="form-control" />
                                             <span id="toggle-password-eye" className="eye-icon mdi mdi-eye"
                                                   onClick={togglePasswordEyeIcon1}></span>
                                         </>) :
                                         <>
                                             <input type="text" placeholder="Enter new password..." id="new-password"
                                                    onChange={handleOnChange}
                                                    className="form-control" />
                                             <span id="toggle-password-eye" className="eye-icon mdi mdi-eye-off"
                                                   onClick={togglePasswordEyeIcon1}></span>
                                         </>
                                        }

                                    </div>

                                    <div className="form-group">
                                        <label className="mb-1 "> <strong>Confirm Password:</strong> </label>
                                        {isLoginPasswordHidden2 ?
                                         (<>
                                             <input type="password" placeholder="Confirm new password..." id="confirm-password"
                                                    onChange={handleOnChange}
                                                    className="form-control" />
                                             <span id="toggle-password-eye" className="eye-icon mdi mdi-eye"
                                                   onClick={togglePasswordEyeIcon2}></span>
                                         </>) :
                                         <>
                                             <input type="text" placeholder="Confirm new password..." id="confirm-password"
                                                    onChange={handleOnChange}
                                                    className="form-control" />
                                             <span id="toggle-password-eye" className="eye-icon mdi mdi-eye-off"
                                                   onClick={togglePasswordEyeIcon2}></span>
                                         </>
                                        }

                                    </div>

                                    <div className="text-center">
                                        <button type="submit" className="btn btn-primary btn-block"
                                                onClick={submitHandler}> Submit
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

export default ModifyPassword;
