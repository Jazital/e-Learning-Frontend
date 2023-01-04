import React, { Fragment } from "react";
import { Table, Pagination } from "react-bootstrap";

import CourseMaterialTable from "./table/CourseMaterialTable";

import "../CSS/Home.css";

import classroom from "../../images/HomePageIcons/classroom.png"
import pendinassingment from "../../images/HomePageIcons/pendinassingment.png"
import discussion from "../images/discussion board icondiscussionboard.png"
import coursematerial from "../images/Vectorcourses.png"






const CourseMaterial = () => {
   return (
      <fragment>

		<div className="row">
		
        <div className="col-xl-9 col-lg-6 col-sm-6">

            <div className="the">
                
            <div className=" main-body-card col-xl-4 col-lg-6 col-sm-6">
				<div className="card overflow-hidden">
					<div className="card-header media border-0 pb-788">
						<div className="media-body">

						</div>
							<img
							src={coursematerial}
							/>
							<div className="text-home"> 
							<h2 className="text-black">2</h2>
							</div>
						</div>

					    <div className="text-center card-body pt-4 p-0">
							<p className="mb-0 text-black">Pending Assignments</p>
						</div>
					<div className="text-center">
						<a href= "/assignment">view Assignment</a>
					</div>
				</div>
			</div>

			<div className=" main-body-card col-xl-4 col-lg-6 col-sm-6">
				<div className="card overflow-hidden">
					<div className="card-header media border-0 pb-788">
						<div className="media-body">

						</div>
							<img
							src={classroom}
							/>
							<div className="text-home"> 
							<h2 className="text-black">2</h2>
							</div>
						</div>

					    <div className="text-center card-body pt-4 p-0">
							<p className="mb-0 text-black">UpComing Classes</p>
						</div>
					<div className="text-center">
						<a href="/upcomingclass">view C.A Score</a>
					</div>
				</div>
			</div>

			<div className=" main-body-card col-xl-4 col-lg-6 col-sm-6">
				<div className="card overflow-hidden">
					<div className="card-header media border-0 pb-788">
						<div className="media-body">

						</div>
							<img
							src={pendinassingment}
							/>
							<div className="text-home"> 
							<h2 className="text-black">3</h2>
							</div>
						</div>

					    <div className="text-center card-body pt-4 p-0">
							<p className="mb-0 text-black">Countinous Assignment</p>
						</div>
					<div className="text-center">
						<a href="#">view C.A Score</a>
					</div>
				</div>
			</div>

		
            </div>
            
					<CourseMaterialTable />
			    
            </div>
          
         
		
                <div className="col-xl-3 col-lg-6 col-sm-6">
                   
                <div className="col-xl col-lg-6 col-sm-6">
                    <div className="card overflow-hidden">
                        <div className="card-header media border-0 pb-0">
                            <div className="media-body">
                                
                            </div>
                            <img
							src={pendinassingment}
							/>
                        </div>
                        <br />
                        
                        <div className="text-center">
                            <p className="mb-0 text-black">All Assignment</p>
                        </div>
                            <div className="text-center">
                                <a href="#">view Assignment</a>
                            </div>
                    </div>
                </div>

                    <div className="col-xl col-lg-6 col-sm-6">
                    <div className="card overflow-hidden">
                        <div className="card-header media border-0 pb-0">
                            <div className="media-body">
                                
                            </div>
                            <img
							src={coursematerial}
							/>
                        </div>
                        <br />
                        
                        <div className="text-center">
                            <p className="mb-0 text-black">Course Material</p>
                        </div>
                            <div className="text-center">
                                <a href="#">view CourseMaterial</a>
                            </div>
                    </div>
                </div>

                    <div className="col-xl col-lg-6 col-sm-6">
                    <div className="card overflow-hidden">
                        <div className="card-header media border-0 pb-0">
                            <div className="media-body">
                                
                            </div>
                            <img
							src={discussion}
							/>
                        </div>
                        <br />
                        
                        <div className="text-center">
                            <p className="mb-0 text-black">Discussion Board</p>
                        </div>
                            <div className="text-center">
                                <a href="#">Go to Discussion</a>
                            </div>
                    </div>
                </div>

                </div>
                
			
			

        </div>

	  </fragment>
   );
};

export default CourseMaterial;
