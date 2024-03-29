import React from "react";

import "./Profile.css"

const Profile = () => {
    let username = undefined;
    localStorage.setItem('page_title', ' My Profile');
    let userRole = localStorage.getItem('userRole');

    return (
        <>
            <div className="row">
                <div className="col-xl-9 col-xxl-9 col-lg-9">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card profile-card">
                                <div className="card-body">
                                    <form>
                                        <div className="mb-5">

                                            <div className="row">
                                                <div className="col-xl-6 col-sm-6">
                                                    <div className="form-group">
                                                        <label>First Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={localStorage.getItem('firstName')} disabled
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-sm-6">
                                                    <div className="form-group">
                                                        <label>Last Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={localStorage.getItem('lastName')}
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-sm-6">
                                                    <div className="form-group">
                                                        <label>Other Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={localStorage.getItem('otherName')}
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                                {userRole==="student" && (<div className="col-xl-6 col-sm-6">
                                                    <div className="form-group">
                                                        <label>Username/Matric. No:</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={localStorage.getItem('matricNumber')}
                                                            disabled
                                                        />
                                                    </div>
                                                </div>)}


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
                                                                value={localStorage.getItem('phoneNumber')}
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
                                                                value={localStorage.getItem('email')}
                                                                disabled
                                                            />
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
            </div>
        </>
    );
};

export default Profile;
