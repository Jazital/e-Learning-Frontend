import React from "react";
import MyVideo from "../images/Video.mp4";

class OnlineClass extends React.Component {
  render() {
    return (
      <video width="100%" height="100%" preload="auto">
        <source src={MyVideo} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
    );
  }
}

export default OnlineClass