import { Email, Password } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";

const Login = () => {
   const [val, setVal] = useState("student");
   const [pw, setPw] = useState("password");
   const [login, setLogin] = useState("./login");

   
      const submitHandler = () => {
        
           }
      const change = (event) => {
                 setVal(event.target.value)
              }
      const change1 = (event) => {
         setPw(event.target.value)
              }
         
  
   
      
   return (
      <div className="row justify-content-center h-100 align-items-center h-80">
         <div className="col-md-5">
            <div className="authincation-content">
               <div className="row no-gutters">
                  <div className="col-xl-12">
                     <div className="auth-form">
                        <h4 className="text-center mb-4 "> Sign in your account  </h4>
                        <form  action=""  onSubmit={(e) => e.preventDefault()}  >
                           <div className="form-group">    <label className="mb-1 ">  <strong>Email</strong> </label>
                           </div>
                              <input type="email" className="form-control" value={val} onChange={change}   />
                           <div className="form-group">
                              <label className="mb-1 "> <strong>Password</strong>  </label>
                              <input type="password" className="form-control" value={pw} onChange={change1}  />
                           </div>
                           <div className="form-row d-flex justify-content-between mt-4 mb-2">
                              <div className="form-group">
                                 <div className="custom-control custom-checkbox ml-1 ">
                                    <input  type="checkbox" className="custom-control-input"   id="basic_checkbox_1"  />
                                    <label    className="custom-control-label" htmlFor="basic_checkbox_1"  >  Remember my preference </label>
								</div>
                              </div>
                              <div className="form-group">
                                 <Link  className=""  to="/forgot-password"  > Forgot Password?  </Link>
                              </div>
                           </div>
                           <div className="text-center">
                              <button  type="submit"  className="btn btn-primary btn-block"  onClick={submitHandler} > Sign Me In </button>
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
