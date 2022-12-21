import React, { Fragment } from "react";
import { Link } from "react-router-dom";
//** Import Profile Img */
import profileImg from "../../../images/avatar/1.jpg";
import { Dropdown } from "react-bootstrap";

const Profile = () => {
   return (
      <Fragment>
         <div className="row">
            <div className="col-xl-9 col-xxl-8 col-lg-8">
               <div className="row">
                  <div className="col-xl-12">
                     <div className="card profile-card">
                        <div className="card-header flex-wrap border-0 pb-0">
                           <h3 className="fs-24 text-black font-w600 mr-auto mb-2 pr-3">
                              Edit Profile
                           </h3>
                           <div className="d-flex mr-5 align-items-center mb-2">
                              <div className="custom-control custom-switch toggle-switch text-right">
                                 <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="customSwitch1"
                                 />
                                 <label
                                    className="custom-control-label"
                                    htmlFor="customSwitch1"
                                 >
                                    Available for hire?
                                 </label>
                              </div>
                           </div>
                           <Link
                              to="#"
                              className="btn btn-dark light btn-rounded mr-3 mb-2"
                           >
                              Cancel
                           </Link>
                           <Link
                              className="btn btn-primary btn-rounded mb-2"
                              to="#"
                           >
                              Save Changes
                           </Link>
                        </div>
                        <div className="card-body">
                           <form>
                              <div className="mb-5">
                                 <div className="title mb-4">
                                    <span className="fs-18 text-black font-w600">
                                       Generals
                                    </span>
                                 </div>
                                 <div className="row">
                                    <div className="col-xl-4 col-sm-6">
                                       <div className="form-group">
                                          <label>First Name</label>
                                          <input
                                             type="text"
                                             className="form-control"
                                             placeholder="Enter name"
                                          />
                                       </div>
                                    </div>
                                    <div className="col-xl-4 col-sm-6">
                                       <div className="form-group">
                                          <label>Middle Name</label>
                                          <input
                                             type="text"
                                             className="form-control"
                                             placeholder="Type here"
                                          />
                                       </div>
                                    </div>
                                    <div className="col-xl-4 col-sm-6">
                                       <div className="form-group">
                                          <label>Last Name</label>
                                          <input
                                             type="text"
                                             className="form-control"
                                             placeholder="Last name"
                                          />
                                       </div>
                                    </div>
                                    <div className="col-xl-4 col-sm-6">
                                       <div className="form-group">
                                          <label>Username</label>
                                          <input
                                             type="text"
                                             className="form-control"
                                             placeholder="User name"
                                          />
                                       </div>
                                    </div>
                                    <div className="col-xl-4 col-sm-6">
                                       <div className="form-group">
                                          <label>Password</label>
                                          <input
                                             type="password"
                                             className="form-control"
                                             placeholder="Enter password"
                                          />
                                       </div>
                                    </div>
                                    <div className="col-xl-4 col-sm-6">
                                       <div className="form-group">
                                          <label>Re-Type Password</label>
                                          <input
                                             type="password"
                                             className="form-control"
                                             placeholder="Enter password"
                                          />
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div className="mb-5">
                                 <div className="title mb-4">
                                    <span className="fs-18 text-black font-w600">
                                       CONTACT
                                    </span>
                                 </div>
                                 <div className="row">
                                    <div className="col-xl-4 col-sm-6">
                                       <div className="form-group">
                                          <label>MobilePhone</label>
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
                                             />
                                          </div>
                                       </div>
                                    </div>
                                    <div className="col-xl-4 col-sm-6">
                                       <div className="form-group">
                                          <label>Whatsapp</label>
                                          <div className="input-group input-icon mb-3">
                                             <div className="input-group-prepend">
                                                <span
                                                   className="input-group-text"
                                                   id="basic-addon2"
                                                >
                                                   <i
                                                      className="fa fa-whatsapp"
                                                      aria-hidden="true"
                                                   ></i>
                                                </span>
                                             </div>
                                             <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Phone no."
                                             />
                                          </div>
                                       </div>
                                    </div>
                                    <div className="col-xl-4 col-sm-6">
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
                                             />
                                          </div>
                                       </div>
                                    </div>
                                    <div className="col-xl-4 col-sm-6">
                                       <div className="form-group">
                                          <label>Address</label>
                                          <div className="input-group">
                                             <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter adress"
                                             />
                                          </div>
                                       </div>
                                    </div>
                                    <div className="col-xl-4 col-sm-6">
                                       <div className="form-group">
                                          <label>City</label>
                                          <select className="form-control">
                                             <option>London</option>
                                             <option>United State</option>
                                             <option>United Kingdom</option>
                                             <option>Germany</option>
                                             <option>Netherland</option>
                                          </select>
                                       </div>
                                    </div>
                                    <div className="col-xl-4 col-sm-6">
                                       <div className="form-group">
                                          <label>Country</label>
                                          <select className="form-control">
                                             <option>England</option>
                                             <option>United State</option>
                                             <option>United Kingdom</option>
                                             <option>Germany</option>
                                             <option>Netherland</option>
                                          </select>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div className="mb-5">
                                 <div className="title mb-4">
                                    <span className="fs-18 text-black font-w600">
                                       About me
                                    </span>
                                 </div>
                                 <div className="row">
                                    <div className="col-xl-12">
                                       <div className="form-group">
                                          <label>Tell About You</label>
                                          <textarea
                                             className="form-control"
                                             rows="6"
                                             defaultValue="Lorem ipsum dolor sit amet,
                                             consectetur adipiscing elit, sed do
                                             eiusmod tempor incididunt ut labore
                                             et dolore magna aliqua. Ut enim ad
                                             minim veniam, quis nostrud
                                             exercitation ullamco laboris nisi
                                             ut aliquip ex ea commodo consequat.
                                             Duis aute irure dolor in
                                             reprehenderit in voluptate velit
                                             esse cillum dolore eu fugiat nulla
                                             pariatur. Excepteur sint occaecat
                                             cupidatat non proident, sunt in
                                             culpa qui officia deserunt mollit
                                             anim id est laborum que laudantium,
                                             totam rem aperiam, eaque ipsa quae
                                             ab illo inventore veritatis et
                                             quasi architecto beatae vitae dicta
                                             su"
                                          />
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
                                                style={{ height: "10px" }}
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
                                                style={{ height: "10px" }}
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
                                    <div className="col-xl-6">
                                       <div className="media mb-4">
                                          <span className="text-primary progress-icon mr-3">
                                             89%
                                          </span>
                                          <div className="media-body">
                                             <p className="font-w500">
                                                Economy
                                             </p>
                                             <div
                                                className="progress skill-progress"
                                                style={{ height: "10px" }}
                                             >
                                                <div
                                                   className="progress-bar bg-primary progress-animated"
                                                   style={{
                                                      width: "89%",
                                                      height: "10px",
                                                   }}
                                                   role="progressbar"
                                                >
                                                   <span className="sr-only">
                                                      89% Complete
                                                   </span>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="col-xl-6">
                                       <div className="media mb-4">
                                          <span className="text-primary progress-icon mr-3">
                                             94%
                                          </span>
                                          <div className="media-body">
                                             <p className="font-w500">
                                                Researching
                                             </p>
                                             <div
                                                className="progress skill-progress"
                                                style={{ height: "10px" }}
                                             >
                                                <div
                                                   className="progress-bar bg-primary progress-animated"
                                                   style={{
                                                      width: "94%",
                                                      height: "10px;",
                                                   }}
                                                   role="progressbar"
                                                >
                                                   <span className="sr-only">
                                                      94% Complete
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
                           <h4 className="fs-22 text-black mb-1">Oda Dink</h4>
                           <p className="mb-4">Programmer</p>
                           <div className="row">
                              <div className="col-6">
                                 <div className="border rounded p-2">
                                    <h4 className="fs-22 text-black font-w600">
                                       228
                                    </h4>
                                    <span className="text-black">
                                       total class attempted
                                    </span>
                                 </div>
                              </div>
                              <div className="col-6">
                                 <div className="border rounded p-2">
                                    <h4 className="fs-22 text-black font-w600">
                                       4,842
                                    </h4>
                                    <span className="text-black">
                                       total classes
                                    </span>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="card-body  border-left">
                           <div className="d-flex mb-3 align-items-center">
                              <Link className="contact-icon mr-3" to="#">
                                 <i
                                    className="fa fa-phone"
                                    aria-hidden="true"
                                 ></i>
                              </Link>
                              <span className="text-black">
                                 +50 123 456 7890
                              </span>
                           </div>
                           <div className="d-flex mb-3 align-items-center">
                              <Link className="contact-icon mr-3" to="#">
                                 <i className="las la-envelope"></i>
                              </Link>
                              <span className="text-black">
                                 info@example.com
                              </span>
                           </div>
                           <div className="row text-center mt-2 mt-md-5">
                              <div className="col-4 p-0">
                                 <div className="d-inline-block mb-2 relative donut-chart-sale">
                                    <svg
                                       className="peity"
                                       height={75}
                                       width={75}
                                    >
                                       <path
                                          d="M 37.5 0 A 37.5 37.5 0 1 1 0.5697092620421955 30.988193337490124 L 10.910190668670381 32.81149920299289 A 27 27 0 1 0 37.5 10.5"
                                          data-value={7}
                                          fill="rgb(255, 142, 38)"
                                       />
                                       <path
                                          d="M 0.5697092620421955 30.988193337490124 A 37.5 37.5 0 0 1 37.49999999999999 0 L 37.49999999999999 10.5 A 27 27 0 0 0 10.910190668670381 32.81149920299289"
                                          data-value={2}
                                          fill="rgba(236, 236, 236, 1)"
                                       />
                                    </svg>
                                    <small className="text-black">66%</small>
                                 </div>
                                 <span className="d-block">PHP 111</span>
                              </div>
                              <div className="col-4 p-0">
                                 <div className="d-inline-block mb-2 relative donut-chart-sale">
                                    <svg
                                       className="peity"
                                       height={75}
                                       width={75}
                                    >
                                       <path
                                          d="M 37.5 0 A 37.5 37.5 0 0 1 50.32575537471258 72.73847327947156 L 46.73454386979306 62.87170076121953 A 27 27 0 0 0 37.5 10.5"
                                          data-value={4}
                                          fill="rgb(62, 168, 52)"
                                       />
                                       <path
                                          d="M 50.32575537471258 72.73847327947156 A 37.5 37.5 0 1 1 37.49999999999999 0 L 37.49999999999999 10.5 A 27 27 0 1 0 46.73454386979306 62.87170076121953"
                                          data-value={5}
                                          fill="rgba(236, 236, 236, 1)"
                                       />
                                    </svg>
                                    <small className="text-black">31%</small>
                                 </div>
                                 <span className="d-block">Vue 111</span>
                              </div>
                              <div className="col-4 p-0">
                                 <div className="d-inline-block mb-2 relative donut-chart-sale">
                                    <svg
                                       className="peity"
                                       height={75}
                                       width={75}
                                    >
                                       <path
                                          d="M 37.5 0 A 37.5 37.5 0 0 1 74.43029073795779 30.98819333749011 L 64.08980933132962 32.81149920299288 A 27 27 0 0 0 37.5 10.5"
                                          data-value={2}
                                          fill="rgb(34, 172, 147)"
                                       />
                                       <path
                                          d="M 74.43029073795779 30.98819333749011 A 37.5 37.5 0 1 1 37.49999999999999 0 L 37.49999999999999 10.5 A 27 27 0 1 0 64.08980933132962 32.81149920299288"
                                          data-value={7}
                                          fill="rgba(236, 236, 236, 1)"
                                       />
                                    </svg>
                                    <small className="text-black">7%</small>
                                 </div>
                                 <span className="d-block">Laravel 111</span>
                              </div>
                           </div>
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
