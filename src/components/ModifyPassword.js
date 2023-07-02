import React, {useState} from "react";
import axios from "axios";
import ScaleLoader from 'rayloading/lib/ScaleLoader';
import {Modal} from "react-bootstrap";
import logo from "./images/ospolylogo.png"
import {Link, useParams, useHistory} from "react-router-dom";

import "./login.css";
import {JazitalBackendBaseURL} from "./helpers/Constants";

const ModifyPassword = () => {
    const history = useHistory();

    let URLQueryParams = new URLSearchParams(history.location.search);
    let urlToken = URLQueryParams.get('token');
    let user_id = URLQueryParams.get('user_id');
    let isTempLogin = URLQueryParams.get('is_temp_login');
    if(isTempLogin){
        document.title = 'Modify Details';
    }else{
        document.title = 'Modify Password';
    }

    let userToken = localStorage.getItem('userToken') || '';

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
        let firstName, lastName, otherNames, phoneNumber;

        if(isTempLogin){
            // Get the submitted user details
            firstName = document.getElementById("new-firstname").value;
            lastName = document.getElementById("new-lastname").value;
            otherNames = document.getElementById("new-othernames").value;
            phoneNumber = document.getElementById("new-phone").value;
        }


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
        var data;
        let args;

        // If token and user ID are provided
        if(isTempLogin){
            data = {
                user_id: user_id,
                reset_token: urlToken,
                new_password: newPassword,

                first_name: firstName,
                last_name: lastName,
                other_names: otherNames,
                phone: phoneNumber,
            };

            args = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        }
        else{
            data = {
                user_id: user_id,
                reset_token: urlToken,
                new_password: newPassword,
            };

            args = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        }

        // Making request to backend API
        await axios.post(
            BACKEND_BASE_URL + endpoint,
            data,
            args
        ).then((res) => {
            // console.log(res);
            
            if ((res.data.code && res.data.code === 'password_update_success')) {
                if(isTempLogin){
                    setLogin({loginState: "success", message: "Your details has been updated successfully"});
                } else{
                    setLogin({loginState: "success", message: "Your password has been updated successfully"});
                }

                setIsLoading(false)
                setTimeout(() => {
                    // history.push('./')
                }, 2000)
                document.getElementById("details-form").reset()
            } 
            else if ((res.data.code && res.data.code === 'invalid_reset_token_1')) {
                setIsLoading(false)
                setLogin({
                    loginState: "failed",
                    message: res.data.message
                });
            }
            else if ((res.data.code && res.data.code === 'invalid_reset_token_2')) {
                setIsLoading(false)
                setLogin({
                    loginState: "failed",
                    message: res.data.message
                });
            }
            else {
                setIsLoading(false)
                setLogin({
                    loginState: "failed",
                    message: "Sorry, your password could not be modified at the moment. Please try again"
                });
            }

            setIsLoading(false)
        }).catch(error => {
            // console.log(error)
            // let data = error.data;
            
            if ((error.response.data.code && error.response.data.code === 'invalid_reset_token_1')) {
                setIsLoading(false)
                setLogin({
                    loginState: "failed",
                    message: error.response.data.message
                });
            }

            else if ((error.response.data.code && error.response.data.code === 'invalid_reset_token_2')) {
                setIsLoading(false)
                setLogin({
                    loginState: "failed",
                    message: error.response.data.message
                });
            }

            else if ((error.response.data.code && error.response.data.code === 'password_update_error')) {
                setIsLoading(false)
                setLogin({
                    loginState: "failed",
                    message: error.response.data.message
                });
            }

            setIsLoading(false)

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
                                {(isTempLogin) && (
                                    <h4 className="text-center mb-4 "> Update Details </h4>
                                )||
                                (
                                    <h4 className="text-center mb-4 "> Modify Password </h4>
                                )}

                                {(isTempLogin) && (
                                    <div className="alert alert-info">You are required to update your details to continue on this platform.</div>)}
                                {/*<div className="text-center">*/}
                                {/*    <img className="signin-logo mb-3" alt="logo" src={logo} />*/}
                                {/*</div>*/}
                                

                                {/* Display success or error messages to the user when available */}
                                {(login.loginState === "success") && (
                                    <div className="alert alert-success">{login.message}</div>)}

                                {(login.loginState === "failed") && (
                                    <div className="alert alert-error">{login.message}</div>)}

                                <form action="" onSubmit={submitHandler} id="details-form">
                                {(isTempLogin) && (
                                    <>
                                        <div className="form-group">
                                            <label className="mb-1 "> <strong>First Name:</strong> </label>
                                            <input type="text" placeholder="Enter your first name..." id="new-firstname"
                                                    onChange={handleOnChange}
                                                    className="form-control" required />
                                        </div>

                                        <div className="form-group">
                                            <label className="mb-1 "> <strong>Last Name:</strong> </label>
                                            <input type="text" placeholder="Enter your last name..." id="new-lastname"
                                                    onChange={handleOnChange}
                                                    className="form-control" required />
                                        </div>

                                        <div className="form-group">
                                            <label className="mb-1 "> <strong>Other Names:</strong> </label>
                                            <input type="text" placeholder="Enter your other names..." id="new-othernames"
                                                    onChange={handleOnChange}
                                                    className="form-control" />
                                        </div>

                                        <div className="form-group">
                                            <label className="mb-1 "> <strong>Phone Number:</strong> </label>
                                            <input type="text" placeholder="Enter your phone number..." id="new-phone"
                                                    onChange={handleOnChange}
                                                    className="form-control" required />
                                        </div>
                                    </>
                                )}

                                    <div className="form-group">
                                        <label className="mb-1 "> <strong>New Password:</strong> </label>
                                        {isLoginPasswordHidden1 ?
                                         (<>
                                             <input type="password" placeholder="Enter new password..." id="new-password"
                                                    onChange={handleOnChange}
                                                    className="form-control" required />
                                             <span id="toggle-password-eye" className="eye-icon mdi mdi-eye"
                                                   onClick={togglePasswordEyeIcon1}></span>
                                         </>) :
                                         <>
                                             <input type="text" placeholder="Enter new password..." id="new-password"
                                                    onChange={handleOnChange}
                                                    className="form-control" required />
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
                                                    className="form-control" required />
                                             <span id="toggle-password-eye" className="eye-icon mdi mdi-eye"
                                                   onClick={togglePasswordEyeIcon2}></span>
                                         </>) :
                                         <>
                                             <input type="text" placeholder="Confirm new password..." id="confirm-password"
                                                    onChange={handleOnChange}
                                                    className="form-control" required />
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
                                <div className="mt-4">
                                    <Link to={`/`} >&lt;&lt; Back to login</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModifyPassword;
