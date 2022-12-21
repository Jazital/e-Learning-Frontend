import React, { useState } from "react";
import {Link} from 'react-router-dom';

/// Images
import avatar1 from "../../images/avatar/1.jpg";
import avatar2 from "../../images/avatar/2.jpg";
import avatar3 from "../../images/avatar/3.jpg";
import avatar4 from "../../images/avatar/4.jpg";
import avatar5 from "../../images/avatar/5.jpg";
import MsgBox from "./MsgBox";

const Chat = ({ PerfectScrollbar, toggleChatBox, toggleTab }) => {
   const [openMsg, setOpenMsg] = useState(false);
   return (
      <div>
        let me write here
        <div>
         </div>
         <MsgBox
            avatar1={avatar1}
            avatar2={avatar2}
            openMsg={openMsg}
            PerfectScrollbar={PerfectScrollbar}
            offMsg={() => setOpenMsg(false)}
         />
      </div>
   );
};

export default Chat;
