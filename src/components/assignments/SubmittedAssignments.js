import React, {useEffect, useState} from "react"
import MUIDataTable from "mui-datatables";

import {Link, useParams, useHistory} from 'react-router-dom';
import {Modal} from "react-bootstrap";
import ScaleLoader from "rayloading/lib/ScaleLoader";
import coursematerial from "../images/Vectorcourses.png"
import axios from "axios";
import Card from 'react-bootstrap/Card';


const SubmittedAssignments = () => {
    const {assignment_id} = useParams();

    const history = useHistory();


    localStorage.setItem('page_title', 'Assignment Submissions');
    let userRole = localStorage.getItem('userRole');
    const [responseOK, setResponseOK] = useState(null);
    const [responseOKMessage, setResponseOKMessage] = useState('');
    const [responseError, setResponseError] = useState(null);
    const [responseErrorMessage, setResponseErrorMessage] = useState('');

    const [assignment, setAssignment] = useState([])
    const [assignmentDocumentURI, setAssignmentDocumentURI] = useState(null);
    const [submissionResponse, setSubmissionResponse] = useState({
        status: '', //success or error
        message: ''
    }); // either success or failed



    // const BACKEND_BASE_URL = "http://elearning-backend.local/api/v1";
    const BACKEND_BASE_URL = "https://pandagiantltd.com/e-learning-backend-api/api/v1";

    var scoreCSVSampleURL = BACKEND_BASE_URL.slice(0, -7);

    // URL to sample file for the uploading of students scores
    // var scoreCSVSampleURL = "http://elearning-backend.local/wp-content/uploads/e-learning-core-sample-files/upload-assignment-scores-234435f65.csv"


    let userToken = localStorage.getItem('userToken') || '';
    

    const [submissions, setSubmissions] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const loadingModal = (isOpen = false) => {
        return (
            <Modal show={isOpen}>
                <ScaleLoader color="#ffffff" size="18px" margin="4px" />
            </Modal>
        );
    };

    useEffect(() => {
        setTimeout(() => {
            fetchAssignmentSubmissions();
            fetchAssignment();
        }, 2000)
    }, [])

    const fetchAssignmentSubmissions = async () => {

        var args = {
            headers: {
                'Token': userToken,
            },
            params: {
                'assignment_id': assignment_id,
            }
        }
        var endpoint = '/assignments/fetch-submission-by-assignment-id';

        await axios.get(
            BACKEND_BASE_URL + endpoint,
            args
        ).then(response => {
            if(response.data.code === 'assignment_fetched'){
                setSubmissions(response.data.data.submissions)
            }
            setIsLoading(false)
            // console.log(response.data)
        }).catch(error => {
            // console.error(error)
            setIsLoading(false)
        })
    }

    const fetchAssignment = async () => {

        var args = {
            headers: {
                'Token': userToken,
            },
        }
        var endpoint = '/assignments/' + assignment_id;

        await axios.get(
            BACKEND_BASE_URL + endpoint,
            args
        ).then(response => {
            if (response.data.code === 'assignment_fetched') {
                setAssignment(response.data.data.lecture_assignment)
                setAssignmentDocumentURI(response.data.data.lecture_assignment.attachments[0]['file_uri']);
            }
            setIsLoading(false)
        }).catch(error => {
            setIsLoading(false)
        })
    }

    const columns = [
        {
            name: "Number",
            label: "S/N",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "MatricNumber",
            label: "Mat. No",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Name",
            label: "Name ",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Score",
            label: "Score",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "SubmissionDate",
            label: "Submission Date",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Actions",
            options: {
                filter: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <>
                        {userRole === "lecturer" && <Link to={`/${submissions[tableMeta.rowIndex].attachments[0].file_uri}`} className="btn btn-primary">Download solution</Link>}
                    </>
                )
            }
        },
    ];

    let data2 = []
    if (submissions.length > 0) {
        let sn = 1;
        submissions.forEach((data) => {
            data2.push({
                Number: sn,
                MatricNumber: data.student_details.matric_number,
                Name: data.student_details.first_name+" "+data.student_details.last_name,
                Score: data.score,
                SubmissionDate: data.submission_date,
            })
            sn++;
        })
    }

    const options = {
        search: true,
        download: false,
        print: false,
        viewColumns: false,
        filter: false,
        responsive: "standard",
        tableBodyMaxHeight: '400px',
        selectableRowsHideCheckboxes: true

    };



    async function handleAssignmentScoreSubmit(e) {
        e.preventDefault()
        setIsLoading(true)

        var endpoint = '/assignments/upload-scores';
        var args2 = {
            headers: {
                'Token': userToken,
                'Content-Type': 'multipart/form-data',
            },
        }

        var fileInput = document.querySelector("#assignment-score-file-input"); // Get the file input

        var formData = new FormData();
        formData.append("attachments[]", fileInput.files[0]);
        formData.append("assignment_id", assignment_id);

        await axios.post(
            BACKEND_BASE_URL + endpoint,
            formData,
            args2
        ).then(response => {
            if (response.data.code === 'scores_uploaded') {
                setResponseOKMessage(response.data.message)
                setResponseOK(true)
                setResponseError(false)

                setTimeout(()=>{
                    window.location.reload(false);
                }, 2000)
            }
            setIsLoading(false)
            // console.log(response.data.data.lecture_assignment)
            // console.log(response.data)
        }).catch(error => {
            setResponseErrorMessage(error.response.data.message)
                setResponseError(true)
                setResponseOK(false)

            // console.error(error.response.status)
            setIsLoading(false)
        })
    }

    return (
        <div>
            {loadingModal(isLoading)}

            {responseOK && <div className="alert alert-success col-12">
                    {responseOKMessage}
                </div>}

                {responseError && <div className="alert alert-danger col-12">
                    {responseErrorMessage}
                </div>}

            <div className="pb-4">
                {userRole == "lecturer" && <Link to={'/assignment-list'} className="btn btn-primary">Back to assignments</Link>}
            </div>

            <MUIDataTable
            className="mb-4"
                title={"Assignment Submissions"}
                data={data2}
                columns={columns}
                options={options}
                pagination
            /> 

            <div className="d-flex">
                <Card border="light" className='main-body-card col-xl-6 col-lg-6 col-sm-12'>
                    <div>
                        <div className="centercoursetext">
                            <img className="center-image mb-2"
                                    src={coursematerial}
                                    alt=""
                            />
                            {/*<p className="indicator-open">Open</p>*/}
                        </div>
                        <div className="centercoursetext mb-2">
                            {
                                assignmentDocumentURI && (<a className="btn btn-primary" href={assignmentDocumentURI}  target="_blank">
                                    View Assignment Attachment
                                </a>)
                            }

                        </div>
                        <div id="firstAssignText">
                            <p>
                            <strong> Title: {assignment.assignment_title}</strong> <br />
                                <strong> Course: {assignment.course_code}</strong> <br />
                                Assigned Date: {assignment.creation_date} <br />
                                <strong>Due Date: {assignment.due_date}</strong> <br />
                                <strong>Description:</strong> <br />
                                <p>{assignment.assignment_description}</p>

                            </p>
                        </div>
                        
                    </div>
                </Card>

                <div className='Formdiv main-body-card col-xl-6 col-lg-6 col-sm-12 d-flex flex-column me-lg-3 p-3'>
                    <div className="centercoursetext">
                        <h2 className="pb-3">Upload Assignment Score</h2>
                        {submissionResponse.status === "success" && (<div className="alert alert-success mb-2">
                            {submissionResponse.message}
                        </div>)}
                        {submissionResponse.status === "error" && (<div className="alert alert-danger mb-2">
                            {submissionResponse.message}
                        </div>)}
                        <p className="pb-0 pt-1">Upload the CSV file having the assignment scores <span className='text-danger'>(only comma-delimited CSV files are allowed)</span>.</p>
                    </div>
                    <form onSubmit={handleAssignmentScoreSubmit}>
                        <input type="file" id="assignment-score-file-input" className="form-control mb-3" required />
                        <input className="btn btn-primary" type="submit" value="Submit Scores" />
                    </form>

                    <br />
                    <br />
                    <br />
                    <a href={scoreCSVSampleURL} className="btn-warning p-2 ps-3">Click here to download scores CSV file sample</a>
                </div>
            </div>
            
        </div>
    );
};

export default SubmittedAssignments;
