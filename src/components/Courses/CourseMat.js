import React from "react";
import "../CSS/Home.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import coursematerial from "../images/Vectorcourses.png"



const CourseMat = () => {
   return (
    
      <div className="row ">
               

         <Card border="light" className='asgn1 main-body-card col-xl-8 col-lg-12 col-sm-12' id="assignn"> 
            
                  <div >
                        <div >
                              <img className="center-image"
                              src={coursematerial}
                              />
                             
                        </div>

                        <div id="firstAssignText">
                           <p>

                              <strong> Course: CSC 401 - Human Computer Interaction </strong> <br/>
                                 Date: 25-01-2022 <br/>
                                 Lecturer: Dr. Charles A. <br/>
                           </p>

                        </div>
                           <div >
                           <Button variant="secondary" size="lg">
                              Download 
                           </Button>
                           </div>
                     </div>
             </Card>


          <div className=" main-body-card col-xl-3 col-lg-6 col-sm-6">
            <h4>Other Materials</h4>
               <div className=" main-body-card ">
                  <div className="card overflow-hidden">
                     <div className="card-header media border-0 pb-788">
                        <div className="media-body">

                           <img className="center-image"
                           src={coursematerial}
                           />
                        </div >

                        </div>

                        <div className="card-body pt-4 p-0">
                           <p className=" centercoursetext mb-0 text-black">CSC 301 - Human Computer Interaction</p>
                        </div>
                  </div>
               </div>


               <div className=" main-body-card ">
                  <div className="card overflow-hidden">
                     <div className="card-header media border-0 pb-788">
                        <div className="media-body">

                           <img className="center-image"
                           src={coursematerial}
                           />
                        </div >

                        </div>

                        <div className="card-body pt-4 p-0">
                           <p className=" centercoursetext mb-0 text-black">CSC 301 - Human Computer Interaction</p>
                        </div>
                  </div>
               </div>

          </div>
         
      </div>
   );
};

export default CourseMat;
