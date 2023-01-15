import "./login.css";
import {Email, Password} from "@mui/icons-material";
import React, {useState, useEffect} from "react";
import {Link, Outlet, Redirect, useHistory} from "react-router-dom";

const Login = () => {
    const history = useHistory();

    const [login, setLogin] = useState("./login");
    const [loginAttempt, setLoginAttempt] = useState(
        {
            loginState: "",
            message: ''
        }
    );

    // Some pre-defined login details for various user types
    const [loginDetails, setLoginDetails] = useState({
        student: {
            username: 'FUO/13/CSI/960',
            password: 'student@123'
        },
        lecturer: {
            username: 'lecturer',
            password: 'lecturer@123'
        }
    });

    // Reset the error div element when the user starts typing
    const handleOnChange = (event) => {
        setLoginAttempt({
            loginState: "",
            message: ''
        });
    }

    const submitHandler = (e) => {

        e.preventDefault();
        // Get the pre-defined user details
        var dbStudentUsername = loginDetails.student.username;
        var dbStudentPassword = loginDetails.student.password;

        var dbLecturerUsername = loginDetails.lecturer.username;
        var dbLecturerPassword = loginDetails.lecturer.password;

        // Get the submitted user details
        var submittedUsername = document.getElementById("username_input").value;
        var submittedPassword = document.getElementById("password_input").value;

        // Compare the submitted user details with the pre-defined user details
        if (((submittedUsername == dbStudentUsername) && (submittedPassword == dbStudentPassword))) {
            // If the login details match student details

            // Update the state as successful login
            setLoginAttempt({
                loginState: "success",
                message: "Login successful!"
            });

            localStorage.setItem('username', 'dbLecturerUsername')
            localStorage.setItem('user_role', 'student')

            // Redirect to dashboard after successful login
            setTimeout(() => {
                history.push('/dashboard')
            }, 2000)
        }
        else if (((submittedUsername == dbLecturerUsername) && (submittedPassword == dbLecturerPassword))) {
            // Or if the details match lecturer details, sign in

            // Update the state as successful login
            setLoginAttempt({
                loginState: "success",
                message: "Login successful!"
            });

            localStorage.setItem('username', 'dbLecturerUsername')
            localStorage.setItem('user_role', 'lecturer')

            // Redirect to dashboard after successful login
            setTimeout(() => {
                history.push('/dashboard')
            }, 2000)

        }
        else {
            // If the login is not successful
            setLoginAttempt({
                loginState: "failed",
                message: "Sorry, username or password is incorrect. Please try again!"
            });
        }
        ;

    }


    return (
        <div className="row justify-content-center h-100 align-items-center h-80">
            <div className="col-md-5">
                <div className="authincation-content">
                    <div className="row no-gutters">
                        <div className="col-xl-12">
                            <div className="auth-form">
                                {/* Display success or error messages to the user when available */}
                                {(loginAttempt.loginState == "success") && (
                                    <div className="alert alert-success">{loginAttempt.message}</div>) || ""}
                                {(loginAttempt.loginState == "failed") && (
                                    <div className="alert alert-error">{loginAttempt.message}</div>) || ""}
                                <h4 className="text-center mb-4 "> Sign in your account </h4>

                                <form action="" onSubmit={submitHandler}>
                                    <div className="form-group"><label className="mb-1 "> <strong>Email</strong>
                                    </label>
                                    </div>
                                    <input type="text" id="username_input" onChange={handleOnChange}
                                           className="form-control" />
                                    <div className="form-group">
                                        <label className="mb-1 "> <strong>Password</strong> </label>
                                        <input type="password" id="password_input" onChange={handleOnChange}
                                               className="form-control" />
                                    </div>
                                    {/*Remember sign-in in checkbox temporarily disabled*/}
                                    <div className="form-row d-flex justify-content-between mt-4 mb-2">
                                        <div className="form-group">
                                            <div className="custom-control custom-checkbox ml-1 ">
                                                <input type="checkbox" className="custom-control-input"
                                                       id="basic_checkbox_1" />
                                                <label className="custom-control-label"
                                                       htmlFor="basic_checkbox_1"> Remember my preference </label>
                                            </div>
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
