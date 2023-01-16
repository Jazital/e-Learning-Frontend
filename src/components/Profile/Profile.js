import React, {Fragment} from "react";
import {Link} from "react-router-dom";
//** Import Profile Img */
import profileImg from "../../images/avatar/1.jpg";
import "./Profile.css"

const Profile = () => {
    localStorage.setItem('page_title', ' My Profile');
    return (
        <Fragment>
            <div className="row">
                <div className="col-xl-9 col-xxl-8 col-lg-8">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card profile-card">
                                <div className="card-header flex-wrap border-0 pb-0">
                                    <h3 className="fs-24 text-black font-w600 mr-auto mb-2 pr-3">

                                    </h3>

                                </div>
                                <div className="card-body">
                                    <form>
                                        <div className="mb-5">
                                            <div className="title mb-4">

                                            </div>
                                            <div className="row">
                                                <div className="col-xl-6 col-sm-6">
                                                    <div className="form-group">
                                                        <label>First Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Enter name" disabled
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-sm-6">
                                                    <div className="form-group">
                                                        <label>Other Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Type here"
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-sm-6">
                                                    <div className="form-group">
                                                        <label>Last Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Last name"
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-sm-6">
                                                    <div className="form-group">
                                                        <label>Username/Matric. No:</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="User name"
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                                {/*<div className="col-xl-4 col-sm-6">*/}
                                                {/*   <div className="form-group">*/}
                                                {/*      <label>Password</label>*/}
                                                {/*      <input*/}
                                                {/*         type="password"*/}
                                                {/*         className="form-control"*/}
                                                {/*         placeholder="Enter password"*/}
                                                {/*      />*/}
                                                {/*   </div>*/}
                                                {/*</div>*/}
                                                {/*<div className="col-xl-4 col-sm-6">*/}
                                                {/*   <div className="form-group">*/}
                                                {/*      <label>Re-Type Password</label>*/}
                                                {/*      <input*/}
                                                {/*         type="password"*/}
                                                {/*         className="form-control"*/}
                                                {/*         placeholder="Enter password"*/}
                                                {/*      />*/}
                                                {/*   </div>*/}
                                                {/*</div>*/}
                                            </div>
                                        </div>
                                        <div className="mb-5">
                                            <div className="row">
                                                <div className="col-xl-6 col-sm-6">
                                                    <div className="form-group">
                                                        <label>Phone Number</label>
                                                        <div className="input-group input-icon mb-3">
                                                            <div className="input-group-prepend">
                                                <span
                                                    className="input-group-text"
                                                    id="basic-addon1"
                                                >
                                                   <i
                                                       className="fa fa-phone"
                                                       aria-hidden="true"
                                                   ></i>
                                                </span>
                                                            </div>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Phone no."
                                                                disabled
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-xl-6 col-sm-6">
                                                    <div className="form-group">
                                                        <label>Email</label>
                                                        <div className="input-group input-icon mb-3">
                                                            <div className="input-group-prepend">
                                                <span
                                                    className="input-group-text"
                                                    id="basic-addon3"
                                                >
                                                   <i className="las la-envelope"></i>
                                                </span>
                                                            </div>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Enter email"
                                                                disabled
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div>
                                            <div className="title mb-4">
                                    <span className="fs-18 text-black font-w600">
                                       class attendance
                                    </span>
                                            </div>
                                            <div className="row">
                                                <div className="col-xl-6">
                                                    <div className="media mb-4">
                                          <span className="text-primary progress-icon mr-3">
                                             78%
                                          </span>
                                                        <div className="media-body">
                                                            <p className="font-w500">
                                                                CSC 211
                                                            </p>
                                                            <div
                                                                className="progress skill-progress"
                                                                style={{height: "10px"}}
                                                            >
                                                                <div
                                                                    className="progress-bar bg-primary progress-animated"
                                                                    style={{
                                                                        width: "78%",
                                                                        height: "10px",
                                                                    }}
                                                                    role="progressbar"
                                                                >
                                                   <span className="sr-only">
                                                      78% Complete
                                                   </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-6">
                                                    <div className="media mb-4">
                                          <span className="text-primary progress-icon mr-3">
                                             65%
                                          </span>
                                                        <div className="media-body">
                                                            <p className="font-w500">
                                                                CSC 221
                                                            </p>
                                                            <div
                                                                className="progress skill-progress"
                                                                style={{height: "10px"}}
                                                            >
                                                                <div
                                                                    className="progress-bar bg-primary progress-animated"
                                                                    style={{
                                                                        width: "65%",
                                                                        height: "10px;",
                                                                    }}
                                                                    role="progressbar"
                                                                >
                                                   <span className="sr-only">
                                                      65% Complete
                                                   </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-xxl-4 col-lg-4">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card  flex-lg-column flex-md-row ">
                                <div className="card-body card-body  text-center border-bottom profile-bx">
                                    <div className="profile-image mb-4">
                                        <img
                                            src={profileImg}
                                            className="rounded-circle"
                                            alt=""
                                        />
                                    </div>
                                    <h4 className="fs-22 text-black mb-1">John Doe</h4>
                                    <p className="mb-4 role-tag">student</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Profile;
