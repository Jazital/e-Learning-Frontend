import React, {useEffect, useState} from "react"
import MUIDataTable from "mui-datatables";

import {Link, useParams} from 'react-router-dom';
import {Modal} from "react-bootstrap";
import ScaleLoader from "rayloading/lib/ScaleLoader";
import axios from "axios";
import {JazitalBackendBaseURL} from "../helpers/Constants";
import {closeNavMenu, openNavMenu} from "../helpers/Constants";


const AssignmentList = () => {
    localStorage.setItem('page_title', 'Assignments');
    let userRole = localStorage.getItem('userRole');
    const [responseOK, setResponseOK] = useState(null);
    const [responseOKMessage, setResponseOKMessage] = useState('');
    const [responseError, setResponseError] = useState(null);
    const [responseErrorMessage, setResponseErrorMessage] = useState('');

    const {course_id} = useParams();

    const BACKEND_BASE_URL = JazitalBackendBaseURL;
    let endpoint = ''
    let args = {}

    let userToken = localStorage.getItem('userToken') || '';

    if (course_id) {
        args = {
            headers: {
                'Authorization': 'Bearer ' + userToken,
            },
            params: {
                'course_id': course_id,
            }
        }
        endpoint = '/assignments/fetch-by-course-id';
    } else {
        args = {
            headers: {
                'Authorization': 'Bearer ' + userToken,
            },
        }
        endpoint = '/assignments/fetch-all-assignments';
    }

    const [assignments, setAssignments] = useState([])
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
            fetchAssignments();
        }, 2000)
    }, [])

    const fetchAssignments = async () => {

        await axios.get(
            BACKEND_BASE_URL + endpoint,
            args
        ).then(response => {
            // console.log(response)
            if (response.data.code === 'assignment_fetched') {
                setAssignments(response.data.data.lecture_assignments)
            }
            setIsLoading(false)
            closeNavMenu();
        }).catch(error => {
            setIsLoading(false)
            closeNavMenu();
        })
    }

    const handleAssignmentDelete = async (assignmentID) => {
        setIsLoading(true)

        endpoint = '/assignments/delete';

        let args2 = {
            headers: {
                'Authorization': 'Bearer ' + userToken,
                'Content-Type': 'multipart/form-data',
            },
            params: {
                assignment_id: assignmentID
            }
        }

        await axios.delete(
            BACKEND_BASE_URL + endpoint,
            args2
        ).then(response => {
            if (response.data.code === 'assignment_deleted') {
                setResponseOKMessage(response.data.message)
                setResponseOK(true)
                setResponseError(false)

                setTimeout(() => {
                    window.location.reload(false);
                }, 2000)
            } else {
                setResponseErrorMessage(response.data.message)
                setResponseError(true)
                setResponseOK(false)
            }
            setIsLoading(false)
            closeNavMenu();

        }).catch(error => {
            // console.error(error)
            if (error.response.data.message) {
                setResponseErrorMessage(error.response.data.message)
                setResponseError(true)
                setResponseOK(false)
            } else {
                setResponseErrorMessage("Sorry, we cannot create the virtual classroom at the moment. Please try again later.")
                setResponseError(true)
                setResponseOK(false)
            }

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
            name: "Title",
            label: "Title",
            options: {
                filter: false,
                sort: false,
            }
        },
        {
            name: "Course",
            label: "Courses",
            options: {
                filter: false,
                sort: false,
            }
        },
        {
            name: "Status",
            label: "Status",
            options: {
                filter: false,
                sort: false,
            }
        },
        {
            name: "DueDate",
            label: "Due Date",
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
                        {userRole === "student" &&
                        <Link to={`/assignment/${assignments[tableMeta.rowIndex].assignment_id}`}
                              className="btn btn-primary">view</Link>}

                        {userRole === "lecturer" &&
                        <Link to={`/assignment/submissions/${assignments[tableMeta.rowIndex].assignment_id}`}
                              className="btn btn-primary">score & submissions</Link>}

                        {/*{userRole === "lecturer" && <Link to={`/assignment/edit/${assignments[tableMeta.rowIndex].assignment_id}`} className="btn btn-warning">modify</Link>}*/}

                        {userRole === "lecturer" && <Link to={`#`} className="btn btn-danger"
                                                          onClick={() => {
                                                              handleAssignmentDelete(assignments[tableMeta.rowIndex].assignment_id)
                                                          }}>delete</Link>}
                    </>
                )
            }
        },
    ];

    let data2 = []
    if (assignments.length > 0) {
        let sn = 1;
        assignments.forEach((data) => {
            data2.push({
                Number: sn,
                Title: data.assignment_title,
                Course: data.course_code,
                Status: "open",
                DueDate: data.due_date,
                // Lecturer: "Dr. E. Dayo",
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
                <Link to={'/new-assignment'} className="btn btn-primary">New Assignment</Link>}
            </div>
            <MUIDataTable
                title={"Assignments"}
                data={data2}
                columns={columns}
                options={options}
                pagination
            />
        </div>
    );
};

export default AssignmentList;

