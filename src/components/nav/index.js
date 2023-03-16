import React, { Fragment, useState } from "react";
import SideBar from "./SideBar";
import NavHader from "./NavHeader";
import Header from "./Header";
import SideBarDepartmentAdmin from "./SideBarDepartmentAdmin";

const KokiNav = ({ title }) => {
   const [toggle, setToggle] = useState("");
   let userRole = localStorage.getItem('userRole');
   const onClick = (name) => setToggle(toggle === name ? "" : name);
   return (
      <Fragment>
         <NavHader />
         {(userRole.includes('student') || userRole.includes('lecturer') ) && <SideBar />}
         {(userRole.includes('department_admin')) && <SideBarDepartmentAdmin />}
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
