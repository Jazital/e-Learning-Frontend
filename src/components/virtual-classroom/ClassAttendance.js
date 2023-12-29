import React, {useEffect, useState} from "react"
import MUIDataTable from "mui-datatables";

import {Link, useParams} from 'react-router-dom';
import {Modal} from "react-bootstrap";
import ScaleLoader from "rayloading/lib/ScaleLoader";
import axios from "axios";
import {JazitalBackendBaseURL} from "../helpers/Constants";
import {closeNavMenu, openNavMenu} from "../helpers/Constants";

const LectureAttendance = () => {
    localStorage.setItem('page_title', 'Lecture Attendance');
    let userRole = localStorage.getItem('userRole');
    const [responseOK, setResponseOK] = useState(null);
    const [responseOKMessage, setResponseOKMessage] = useState('');
    const [responseError, setResponseError] = useState(null);
    const [responseErrorMessage, setResponseErrorMessage] = useState('');

    const {lecture_id} = useParams();

    const BACKEND_BASE_URL = JazitalBackendBaseURL;
    let endpoint = ''
    let args = {}

    let userToken = localStorage.getItem('userToken') || '';

    if (lecture_id) {
        args = {
            headers: {
                'Authorization': 'Bearer ' + userToken,
            },
            params: {
                'lecture_id': lecture_id,
            }
        }

    }
    else {
        // If lecture ID is not found
        args = {
            headers: {
                'Authorization': 'Bearer ' + userToken,
            },
            params: {
                'lecture_id': 0,
            }
        }
    }

    endpoint = '/lecture-attendance/fetch';

    const [attendance, setAttendance] = useState([])
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
            fetchAttendance();
        }, 2000)
    }, [])

    const fetchAttendance = async () => {
        await axios.get(
            BACKEND_BASE_URL + endpoint,
            args
        ).then(response => {
            // console.log(response)
            if (response.data.code === 'attendance_fetched') {
                setAttendance(response.data.data)
            }
            setIsLoading(false)
            closeNavMenu();
        }).catch(error => {
            // console.log(error)
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
            name: "Matric",
            label: "Matric No.",
            options: {
                filter: false,
                sort: false,
            }
        },
        {
            name: "Name",
            label: "Name",
            options: {
                filter: false,
                sort: false,
            }
        },
        {
            name: "Date",
            label: "Date",
            options: {
                filter: false,
                sort: false,
            }
        },
    ];

    let data2 = []
    if (attendance.length > 0) {
        let sn = 1;
        attendance.forEach((data) => {
            data2.push({
                Number: sn,
                Matric: data.db_student_info.matric_number,
                Name: data.db_student_info.first_name + " " + data.db_student_info.last_name,
                Date: data.date_attended,
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
                <Link to={'/virtual-classrooms'} className="btn btn-primary">Back To Lectures</Link>}
            </div>
            <MUIDataTable
                title={"attendance"}
                data={data2}
                columns={columns}
                options={options}
                pagination
            />
        </div>
    );
};

export default LectureAttendance;

