import React, { useState } from "react";

/// React router dom
import { Link } from "react-router-dom";

/// image
import logo from "../images/ospolylogo.png";

const NavHader = () => {
   const [toggle, setToggle] = useState(false);

   return (
      <div className="nav-header">
         <Link to="/dashboard" className="brand-logo text-yellow flex-column pt-4">
             <div>
                 <img className="logo-abbr" src={logo} alt="" />
             </div>

             <div className="ml-4 header-brand-name">Osun State Polytechnic, Iree</div>
         </Link>

         <div className="nav-control" onClick={() => setToggle(!toggle)}>
            <div className={`hamburger ${toggle ? "is-active" : ""}`}>
               <span className="line"></span>
               <span className="line"></span>
               <span className="line"></span>
            </div>
         </div>
      </div>
   );
};

export default NavHader;
