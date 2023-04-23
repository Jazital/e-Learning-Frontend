import React from "react";

import "./Profile.css"

const ModifyUser = () => {
    // Fetch user details with a passed ID if it exists, else with current user ID (i.e. modify details by user)


    let username = undefined;
    localStorage.setItem('page_title', 'Modify Details');
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
                                                        <label>First Name (*)</label>
                                                        <input
                                                            type="text"
                                                            className="form-control" required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-sm-6">
                                                    <div className="form-group">
                                                        <label>Last Name (*)</label>
                                                        <input
                                                            type="text"
                                                            className="form-control" required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-sm-6">
                                                    <div className="form-group">
                                                        <label>Other Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-xl-6 col-sm-6">
                                                    <div className="form-group">
                                                        <label>Phone Number (*)</label>
                                                        <div className="input-group input-icon mb-3">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text" id="basic-addon1">
                                                                    <i className="fa fa-phone" aria-hidden="true"></i>
                                                                </span>
                                                            </div>
                                                            <input
                                                                type="tel"
                                                                className="form-control" required
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-xl-6 col-sm-6">
                                                    <div className="form-group">
                                                        <label>Email (*)</label>
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
                                                                className="form-control" required
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div><input type="submit" value="Submit" class="btn btn-primary"/></div>
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

export default ModifyUser;
