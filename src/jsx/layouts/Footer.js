import React from "react";
import {Link} from 'react-router-dom';

const Footer = () => {
   return (
      <div className="footer">
         <div className="copyright">
            <p>
               Copyright © e-Learning System &amp; Developed by{" "}
               <Link to="https://jazital.com/" target="_blank">
                  Jazital
               </Link>{" "}
            </p>
         </div>
      </div>
   );
};

export default Footer;
