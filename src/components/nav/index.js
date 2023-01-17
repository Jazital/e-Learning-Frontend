import React, { Fragment, useState } from "react";
import SideBar from "./SideBar";
import SideBarLecturer from "../lecturers/nav/SideBarLecturer";
import NavHader from "./NavHeader";
import Header from "./Header";



const KokiNav = ({ title }) => {
   const [toggle, setToggle] = useState("");
   const onClick = (name) => setToggle(toggle === name ? "" : name);
   return (
      <Fragment>
         <NavHader />
          {localStorage.getItem("user_role") == "student" && (<SideBar />)}
          {localStorage.getItem("user_role") == "lecturer" && (<SideBarLecturer />)}

         <Header
            onActivity={() => onClick("activity")}
            onNotification={() => onClick("notification")}
            onProfile={() => onClick("profile")}
            toggle={toggle}
            title={title}
         />

        </Fragment>
   );
};

export default KokiNav;
