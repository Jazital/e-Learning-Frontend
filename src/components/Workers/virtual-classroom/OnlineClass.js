import React from "react";
import MyVideo from "../images/Video.mp4";
import {Link} from 'react-router-dom';

const OnlineClasses = () => {
   return (
      <div className="OnlineClass">
         <video width="100%" height="100%" preload="auto">
        <source src={MyVideo} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
      </div>
   );
};

export default OnlineClasses;