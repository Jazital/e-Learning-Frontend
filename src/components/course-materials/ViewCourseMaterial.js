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
import {JazitalBackendBaseURL} from "../helpers/Constants";
import {closeNavMenu, openNavMenu} from "../helpers/Constants";


const ViewCourseMaterial = (props) => {

    let userRole = localStorage.getItem('userRole');

    // Get ID from URL
    const {material_id} = useParams();

    const BACKEND_BASE_URL = JazitalBackendBaseURL;
    let endpoint = ''
    let args = {}

    let userToken = localStorage.getItem('userToken') || '';

    if (props.courseID) {
        // A course ID was passed, so we fetch the course materials for the passed course ID; else we fetch all the
        // course materials for all courses.
        // This is passed in SingleCourseMaterial.js
        args = {
            headers: {
                'Authorization': 'Bearer '+userToken,
            },
            params: {
                'course_id': props.courseID,
            }
        }
    }
    else {
        args = {
            headers: {
                'Authorization': 'Bearer '+userToken,
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
        setTimeout(() => {
            fetchCourseMaterials();
        }, 2000)
    }, [])

    const fetchCourseMaterials = async () => {
        endpoint = '/lecture-documents/'+material_id;

        await axios.get(
            BACKEND_BASE_URL + endpoint,
            args
        ).then(response => {
            // console.log(response);
            if (response.data.code === 'lecture_document_fetched') {
                setDocument(response.data.data.lecture_document)
                setAttachments(response.data.data.lecture_document.attachments)

            }
            setIsLoading(false)
closeNavMenu();
        }).catch(error => {
            setIsLoading(false)
closeNavMenu();
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
                            <div className="mb-3"> Title:  <b>{document.document_title}</b></div>
                            <div className="mb-3">Course Code: <b> {document.course_code}</b></div>
                            <div className="mb-3"> Date Uploaded: <b>{document.document_date}</b></div>
                            <div className="mb-1"><b>Description:</b></div>
                            <div>{document.document_description}</div>
                        </div>
                    </div>
                </Card>
                <div className='Formdiv main-body-card col-xl-6 col-lg-6 col-sm-12 d-flex flex-column m-3 my-lg-0 p-3X py-3'>
                    <h3>Attachment(s)</h3>
                    {attachments.map((data, index) => {
                            var i = 1;
                                return (<a key={index} className="btn btn-primary" href={data} target="_blank">
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
