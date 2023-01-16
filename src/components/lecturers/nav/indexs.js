import React, { Fragment, useState } from "react";
import SideBars from "./SideBars";
import NavHeaders from "./NavHeaders";
import Headers from "./Headers";


const KokiNavs = ({ title }) => {
   const [toggle, setToggle] = useState("");
   const onClick = (name) => setToggle(toggle === name ? "" : name);
   return (
      <Fragment>
         <NavHeaders />
         <SideBars />
         <Headers
            onActivity={() => onClick("activity")}
            onNotification={() => onClick("notification")}
            onProfile={() => onClick("profile")}
            toggle={toggle}
            title={title}
         />
           
        </Fragment>
   );
};

export default KokiNavs;
