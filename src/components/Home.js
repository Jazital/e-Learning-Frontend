import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import {Dropdown} from 'react-bootstrap';
import { Tab, Nav } from "react-bootstrap";
//** Import Image */
import "./CSS/Home.css";

import classroom from "../images/HomePageIcons/classroom.png"
import pendinassingment from "../images/HomePageIcons/pendinassingment.png"
import coursematerial from "../images/HomePageIcons/coursematerial.png"
import timetable from "../images/HomePageIcons/timetable.png"


import {  Sparklines,  SparklinesLine,  } from "react-sparklines";



const Home = () => {

   return (
      <Fragment>
         <div className="row">
			
		 <div className=" main-body-card col-xl-3 col-lg-6 col-sm-6">
				<div className="card overflow-hidden">
					<div className="card-header media border-0 pb-788">
						<div className="media-body">

						</div>
							<img
							src={pendinassingment}
							/>
							<div className="text-home"> 
							<h2 className="text-black">2</h2>
							</div>
						</div>

					    <div className="card-body pt-4 p-0 text-center">
							<p className="mb-0 text-black">Pending Assignment</p>
						</div>
					<div className="text-center">
						<a href="#">view all</a>
					</div>
				</div>
			</div>

			<div className=" main-body-card col-xl-3 col-lg-6 col-sm-6">
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

					    <div className="card-body pt-4 p-0 text-center">
							<p className="mb-0 text-black">Upcoming Classes</p>
						</div>
					<div className="text-center">
						<a href="#">view all</a>
					</div>
				</div>
			</div>

			<div className=" main-body-card col-xl-3 col-lg-6 col-sm-6">
				<div className="card overflow-hidden">
					<div className="card-header media border-0 pb-788">
						<div className="media-body">

						</div>
							<img
							src={timetable}
							/>
							<div className="text-home"> 
							<h2 className="text-black">3</h2>
							</div>
						</div>

					    <div className="card-body pt-4 p-0 text-center">
							<p className="mb-0 text-black">timetable</p>
						</div>
					<div className="text-center">
						<a href="#">view all</a>
					</div>
				</div>
			</div>

			<div className=" main-body-card col-xl-3 col-lg-6 col-sm-6">
				<div className="card overflow-hidden">
					<div className="card-header media border-0 pb-788">
						<div className="media-body">

						</div>
							<img
							src={coursematerial}
							/>
							<div className="text-home"> 
							<h2 className="text-black">4</h2>
							</div>
						</div>

					    <div className="card-body pt-4 p-0 text-center">
							<p className="mb-0 text-black">course material</p>
						</div>
					<div className="text-center">
						<a href="#">view all</a>
					</div>
				</div>
			</div>

        </div>


      </Fragment>
   );
};

export default Home;
