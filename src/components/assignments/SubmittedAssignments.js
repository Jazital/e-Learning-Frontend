import React, {useEffect, useState} from "react"
import MUIDataTable from "mui-datatables";

import {Link, useParams} from 'react-router-dom';
import {Modal} from "react-bootstrap";
import ScaleLoader from "rayloading/lib/ScaleLoader";
import axios from "axios";


const SubmittedAssignments = () => {
    const {assignment_id} = useParams();


    localStorage.setItem('page_title', 'Assignment Submissions');
    let userRole = localStorage.getItem('userRole');
    const [responseOK, setResponseOK] = useState(null);
    const [responseOKMessage, setResponseOKMessage] = useState('');
    const [responseError, setResponseError] = useState(null);
    const [responseErrorMessage, setResponseErrorMessage] = useState('');

    const [submissionResponse, setSubmissionResponse] = useState({
        status: '', //success or error
        message: ''
    }); // either success or failed

    const BACKEND_BASE_URL = "http://elearning-backend.local/api/v1";
    // const BACKEND_BASE_URL = "https://pandagiantltd.com/e-learning-backend-api/api/v1";


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
                        {userRole === "lecturer" && <Link to={`/${submissions[tableMeta.rowIndex].attachments[0].file_uri}`} className="btn btn-primary">Download attachment</Link>}
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
            if (response.data.code === 'assignment_submitted') {
                setSubmissionResponse({
                    status: 'success',
                    message: response.data.message
                })
                setIsLoading(false)
            }
            setIsLoading(false)
            // console.log(response.data.data.lecture_assignment)
            // console.log(response)
        }).catch(error => {
            setSubmissionResponse({
                status: 'error',
                message: error.response.data.message
            })
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

            <div className='Formdiv main-body-card col-xl-6 col-lg-6 col-sm-12 d-flex flex-column m-3 p-3'>
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
            </div>

             <MUIDataTable
                title={"Assignment Submissions"}
                data={data2}
                columns={columns}
                options={options}
                pagination
            /> 
        </div>
    );
};

export default SubmittedAssignments;
