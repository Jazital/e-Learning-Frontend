import React, {useEffect, useState} from "react"
import MUIDataTable from "mui-datatables";

import {Link, useParams, useHistory} from 'react-router-dom';
import {Modal} from "react-bootstrap";
import ScaleLoader from "rayloading/lib/ScaleLoader";
import coursematerial from "../images/Vectorcourses.png"
import axios from "axios";
import Card from 'react-bootstrap/Card';
import {JazitalBackendBaseURL} from "../helpers/Constants";
import {closeNavMenu, openNavMenu} from "../helpers/Constants";


const SubmittedAssignments = () => {
    const {assignment_id} = useParams();

    const history = useHistory();

    var modifiedArray = [];

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

    const BACKEND_BASE_URL = JazitalBackendBaseURL;
    var scoreCSVSampleURL = BACKEND_BASE_URL.slice(0, -7) + "/wp-content/uploads/e-learning-core-sample-files/upload-assignment-scores-234435f65.csv";
    let userToken = localStorage.getItem('userToken') || '';

    const [submissions, setSubmissions] = useState([])
    const [inputScoreArray, setInputScoreArray] = useState([]);
    const [finalScoreInputArray, setFinalScoreInputArray] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const loadingModal = (isOpen = false) => {
        return (
            <Modal show={isOpen}>
                <ScaleLoader color="#ffffff" size="18px" margin="4px"/>
            </Modal>
        );
    };

    useEffect(() => {
        setTimeout(() => {
            fetchAssignmentSubmissions();
            fetchAssignment();
        }, 1000)
    }, [])

    const fetchAssignmentSubmissions = async () => {

        var args = {
            headers: {
                'Authorization': userToken,
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
            if (response.data.code === 'assignment_fetched') {
                var fetchedData = response.data.data.submissions;
                setSubmissions(fetchedData);
            }
            setIsLoading(false)
closeNavMenu();
        }).catch(error => {
            setIsLoading(false)
closeNavMenu();
        })
    }

    const fetchAssignment = async () => {

        var args = {
            headers: {
                'Authorization': userToken,
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
closeNavMenu();
        }).catch(error => {
            setIsLoading(false)
closeNavMenu();
        })
    }

    // Reset the error div element when the user starts typing
    const handleScoreOnChange = (inputRowID) => {
        var scoreInput = document.querySelector(`#input-score-${inputRowID}`).value;
        var initialArray = [...submissions];

        modifiedArray = [...finalScoreInputArray];

        modifiedArray[inputRowID] = {
            student_id: parseInt(initialArray[inputRowID].student_details.id),
            score: parseInt(scoreInput),
        }

        setFinalScoreInputArray(modifiedArray);
    }


    const submitScoresArray = async () => {
        // e.preventDefault()
        setIsLoading(true)

        var endpoint = '/assignments/submit-scores-array';
        var args2 = {
            headers: {
                'Authorization': userToken,
            },
        }

        let data = {
            assignment_id: assignment_id,
            scores_array: finalScoreInputArray,
        }

        // Making request to backend API
        await axios.post(
            BACKEND_BASE_URL + endpoint,
            data,
            args2
        ).then(response => {
            if (response.data.code === 'scores_uploaded') {
                setResponseOKMessage(response.data.message)
                setResponseOK(true)
                setResponseError(false)
            }
            setIsLoading(false)
closeNavMenu();
        }).catch(error => {
            setResponseErrorMessage(error.response.data.message)
            setResponseError(true)
            setResponseOK(false)

            setIsLoading(false)
closeNavMenu();
        })
    }

    const columns = [
        {
            name: "Number",
            label: "S/N",
            options: {
                filter: false,
                sort: false,
            }
        },
        {
            name: "MatricNumber",
            label: "Mat. No",
            options: {
                filter: false,
                sort: false,
            }
        },
        {
            name: "Name",
            label: "Name ",
            options: {
                filter: false,
                sort: false,
            }
        },
        {
            name: "Score",
            label: "Score",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <>
                        {userRole === "lecturer" &&
                        <input className="ps-2" type="text" onChange={() => {
                            handleScoreOnChange(tableMeta.rowIndex)
                        }}
                               defaultValue={`${(submissions[tableMeta.rowIndex].score) == null ? '' : submissions[tableMeta.rowIndex].score}`}
                               placeholder="No score yet"
                               id={`input-score-${tableMeta.rowIndex}`}/>}
                    </>
                )
            }
        },
        {
            name: "SubmissionDate",
            label: "Submission Date",
            options: {
                filter: false,
                sort: false,
            }
        },
        {
            name: "Actions",
            options: {
                filter: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <>
                        {userRole === "lecturer" && submissions[tableMeta.rowIndex].attachments[0] &&
                        <a href={`${submissions[tableMeta.rowIndex].attachments[0]}`} target="_blank"
                           className="btn btn-primary d-print-none">Download solution</a>}
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
                Name: data.student_details.first_name + " " + data.student_details.last_name,
                Score: data.score,
                SubmissionDate: data.submission_date,
            })
            sn++;
        })
    }

    const options = {
        search: true,
        download: true,
        print: true,
        viewColumns: false,
        filter: false,
        responsive: "standard",
        tableBodyMaxHeight: '600px',
        selectableRowsHideCheckboxes: true

    };

    async function handleAssignmentScoreSubmit(e) {
        e.preventDefault()
        setIsLoading(true)

        var endpoint = '/assignments/upload-scores';
        var args2 = {
            headers: {
                'Authorization': userToken,
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

                setTimeout(() => {
                    window.location.reload(false);
                }, 3000)
            }
            setIsLoading(false)
closeNavMenu();
        }).catch(error => {
            setResponseErrorMessage(error.response.data.message)
            setResponseError(true)
            setResponseOK(false)

            setIsLoading(false)
closeNavMenu();
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
                {userRole == "lecturer" &&
                <Link to={'/assignment-list'} className="btn btn-primary">Back to assignments</Link>}
            </div>

            <MUIDataTable
                className="mb-1"
                title={"Assignment Submissions"}
                data={data2}
                columns={columns}
                options={options}
                pagination
            />

            <div className="pb-4 bg-white mb-6 card shadow align-items-start">
                {userRole == "lecturer" &&
                <button className="btn btn-success" onClick={submitScoresArray}>Update Scores</button>}
            </div>

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
                                assignmentDocumentURI && (
                                    <a className="btn btn-primary" href={assignmentDocumentURI} target="_blank">
                                        View Assignment Attachment
                                    </a>)
                            }
                        </div>
                        <div id="firstAssignText">
                            <div>
                                <strong> Title: {assignment.assignment_title}</strong> <br/>
                                <strong> Course: {assignment.course_code}</strong> <br/>
                                Assigned Date: {assignment.creation_date} <br/>
                                <strong>Due Date: {assignment.due_date}</strong> <br/>
                                <strong>Description:</strong> <br/>
                                <div>{assignment.assignment_description}</div>

                            </div>
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
                        <p className="pb-0 pt-1">Upload the CSV file having the assignment scores <span
                            className='text-danger'>(only comma-delimited CSV files are allowed)</span>.</p>
                    </div>
                    <form onSubmit={handleAssignmentScoreSubmit}>
                        <input type="file" id="assignment-score-file-input" className="form-control mb-3" required/>
                        <input className="btn btn-primary" type="submit" value="Submit Scores"/>
                    </form>

                    <br/>
                    <br/>
                    <br/>
                    <a href={scoreCSVSampleURL} className="btn-warning p-2 ps-3" target="_blank">Click here to download
                        scores CSV file
                        sample</a>
                </div>
            </div>

        </div>
    );
};

export default SubmittedAssignments;
