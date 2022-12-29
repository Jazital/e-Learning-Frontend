import React, { Fragment } from "react";
import docimg from "../images/Vectorcourses.png";



const Assignment = () => {
   return (
      <fragment>

		<div className="row">
			
			
        <div className="col-xl-6 col-lg col-sm">

            <div>
                <img
                src= { docimg}
                />
            </div>

        <div>
            
             <p>
                Course: CSC 401 - Human Computer Interaction <br/> 
                Assigned Date: 25-01-2022<br/>
                Due Date: 30-01-2022 <br/>
                Lecturer: Dr. Charles A.<br/>
                Submission Status: NOT SUBMITTED
            </p>
            
        </div>            
                
                
         </div>
        <div className="col-xl-6 col-lg col-sm">

                    <p>This is what i will do</p>
                    
                   
                </div>
			

        </div>

	  </fragment>
   );
};

export default Assignment;
