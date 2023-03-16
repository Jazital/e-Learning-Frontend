import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom"

import "../CSS/Home.css";
import CourseMaterialTable from "./CourseMaterialTable";


import MUIDataTable from "mui-datatables";

import axios from "axios";
import {Modal} from "react-bootstrap";
import ScaleLoader from "rayloading/lib/ScaleLoader";
import coursematerial from "../images/Vectorcourses.png"

import Card from 'react-bootstrap/Card';




const ViewCourseMaterial = (props) => {

    let userRole = localStorage.getItem('userRole');

    // Get ID from URL
    const {material_id} = useParams();

    const BACKEND_BASE_URL = "http://elearning-backend.local/api/v1";
    // const BACKEND_BASE_URL = "https://pandagiantltd.com/e-learning-backend-api/api/v1";
    let endpoint = ''
    let args = {}

    let userToken = localStorage.getItem('userToken') || '';

    if (props.courseID) {
        // A course ID was passed, so we fetch the course materials for the passed course ID; else we fetch all the
        // course materials for all courses.
        //This is passed in SingleCourseMaterial.js
        args = {
            headers: {
                'Token': userToken,
            },
            params: {
                'course_id': props.courseID,
            }
        }
    }
    else {
        args = {
            headers: {
                'Token': userToken,
            },
        }
    }
    const [document, setDocument] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [attachments, setAttachments] = useState([])
    const loadingModal = (isOpen = false) => {
        return (
            <Modal show={isOpen}>
                <ScaleLoader color="#ffffff" size="18px" margin="4px" />
            </Modal>
        );
    };

    useEffect(() => {
        fetchCourseMaterials();
    }, [])


    const fetchCourseMaterials = async () => {
        endpoint = '/lecture-documents/'+material_id;

        await axios.get(
            BACKEND_BASE_URL + endpoint,
            args
        ).then(response => {
            console.log(response);
            if (response.data.code === 'lecture_document_fetched') {
                setDocument(response.data.data.lecture_document)
                setAttachments(response.data.data.lecture_document.attachments)
                
            }
            setIsLoading(false)
        }).catch(error => {
            // console.error(error)
            setIsLoading(false)
        })
    }
    return (
        <>
            <div className="row">
                <div className="col-xl-12 col-lg-12 col-sm-12">
                    {/*<h2>CSC 401 Course Materials</h2>*/}
                    <div className="pb-4">
                        {userRole=="student" && <Link to={'/enrolled-courses'} className="btn btn-primary">Back to courses</Link> }
                        {userRole=="lecturer" && <Link to={'/assigned-courses'} className="btn btn-primary">Back to courses</Link> }
                    </div>

                    <div className='the col-xl-12 col-lg-12 col-sm-12'>
                {loadingModal(isLoading)}

                <Card border="light" className='py-4 py-lg-5 main-body-card col-xl-6 col-lg-12 col-sm-12 text-left d-block'>
                    <div>
                        <div className="centercoursetext">
                            <img className="center-image mb-5"
                                 src={coursematerial}
                                 alt=""
                            />
                        </div>
                        <div className="text-left">
                        <div> Title:  {document.document_title} </div>
                            <div>Course Code: {document.course_code}</div>
                            <div>Description: {document.document_description} </div>
                            <div> Date Uploaded: {document.document_date}</div>
                        </div>
                    </div>
                </Card>
                <div className='Formdiv main-body-card col-xl-6 col-lg-6 col-sm-12 d-flex flex-column m-3 my-lg-0 p-3X py-3'>
                    <h3>Attachment(s)</h3>
                    {attachments.map((data, index) => {
                            var i = 1;
                                return (<a className="btn btn-primary" href={data.file_uri} target="_blank">
                                {`Download Attachment ${i}`}
                            </a>)
                            i++;
                        })
                    }  
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default ViewCourseMaterial;