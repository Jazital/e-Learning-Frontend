import React, {useEffect, useState} from "react"
import MUIDataTable from "mui-datatables";
import {Modal} from "react-bootstrap";
import ScaleLoader from "rayloading/lib/ScaleLoader";
import axios from "axios";
import {JazitalBackendBaseURL} from "../helpers/Constants";
import {closeNavMenu, openNavMenu} from "../helpers/Constants";

const VirtualClassroomTable = (props) => {
    const BACKEND_BASE_URL = JazitalBackendBaseURL;
    let endpoint = ''
    let args = {}

    let userToken = localStorage.getItem('userToken') || '';
    let userRole = localStorage.getItem('userRole');
    const [lectures, setLectures] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [attendanceSubmitted, setAttendanceSubmitted] = useState(false)
    const [responseOK, setResponseOK] = useState(null);
    const [responseOKMessage, setResponseOKMessage] = useState('');
    const [responseError, setResponseError] = useState(null);
    const [responseErrorMessage, setResponseErrorMessage] = useState('');

    args = {
        headers: {
            'Authorization': userToken,
        },
    }
    // endpoint = '/lectures/fetch-student-upcoming-lectures';
    endpoint = '/lectures/fetch-by-course-id';

    const loadingModal = (isOpen = false) => {
        return (
            <Modal show={isOpen}>
                <ScaleLoader color="#ffffff" size="18px" margin="4px"/>
            </Modal>
        );
    };

    useEffect(() => {
        setTimeout(() => {
            fetchLectures();
        }, 2500)
    }, [])

    const fetchLectures = async () => {
        await axios.get(
            BACKEND_BASE_URL + endpoint,
            args
        ).then(response => {
            if (response.data.code === 'lecture_fetched') {
                setLectures(response.data.data.lectures)
            }
            setIsLoading(false)

            closeNavMenu();
        }).catch(error => {
            setIsLoading(false)
            closeNavMenu();
        })
    }

    const attendLecture = async (lectureId) => {
        // TODO: Call a function here that records attendance and submit to a new attendance endpoint
        // Making request to backend API
        endpoint = '/lecture-attendance/add';
        args = {
            headers: {
                'Authorization': userToken,
            },
        }
        let data = {
            'lecture_id': lectureId
        }
        await axios.post(
            BACKEND_BASE_URL + endpoint,
            data,
            args
        ).then((res) => {
            if (res.data.code && res.data.code === "attendance_submitted") {
                setAttendanceSubmitted(true)
            }
            setIsLoading(false)
            closeNavMenu();

        }).catch(error => {
            setIsLoading(false)
            closeNavMenu();
        })
    }

    // TODO: Complete modify lecture
    const modifyLecture = (lectureId) => {
       // console.log("Modify lecture clicked")
    }

    const deleteLecture = async (lectureId) => {
        setIsLoading(true)

        endpoint = '/lectures/delete';

        let args2 = {
            headers: {
                'Authorization': userToken,
                'Content-Type': 'multipart/form-data',
            },
            params: {
                lecture_id: lectureId
            }
        }

        await axios.delete(
            BACKEND_BASE_URL + endpoint,
            args2
        ).then(response => {
            if (response.data.code === 'lecture_deleted') {
                setResponseOKMessage(response.data.message)
                setResponseOK(true)
                setResponseError(false)

                setTimeout(() => {
                    window.location.reload(false);
                }, 1000)
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
                setResponseErrorMessage("Sorry, we cannot delete the virtual classroom at the moment. Please try again later.")
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
            name: "Platform",
            label: "Platform",
            options: {
                filter: false,
                sort: false,
            }
        },

        {
            name: "DateTime",
            label: "Date & Time",
            options: {
                filter: false,
                sort: false,
            }
        },
        {
            name: "Actions",
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <>
                        {userRole === "student" && <a href={lectures[tableMeta.rowIndex].lecture_url} onClick={() => {
                            setIsLoading(true);
                            return attendLecture(lectures[tableMeta.rowIndex].lecture_id)
                        }}
                                                      className="btn btn-primary">Attend</a>}
                        {userRole === "lecturer" && <a href={`./lecture/attendance/${lectures[tableMeta.rowIndex].lecture_id}`} className="btn btn-primary">View Attendance</a>}
                        {userRole === "lecturer" && <a href={lectures[tableMeta.rowIndex].lecture_url} onClick={() => {
                            setIsLoading(true);
                            return attendLecture(lectures[tableMeta.rowIndex].lecture_id)
                        }}
                                                       className="btn btn-primary">Start Lecture</a>}
                        {/*{userRole === "lecturer" && <a href={lectures[tableMeta.rowIndex].lecture_url} onClick={() => {
                         setIsLoading(true);
                         return modifyLecture(lectures[tableMeta.rowIndex].lecture_id)
                         }}
                         className="btn btn-warning">Modify</a>}*/}

                        {userRole === "lecturer" && <a href="javascript: void(0)"
                                                       onClick={() => {
                                                           deleteLecture(lectures[tableMeta.rowIndex].lecture_id)
                                                       }}
                                                       className="btn btn-danger">Delete</a>}
                    </>
                )
            }
        },
    ];

    let data2 = []
    if (lectures.length > 0) {
        let sn = 1;
        lectures.forEach((data) => {
            data2.push({
                Number: sn,
                Title: data.lecture_title,
                Course: data.course_code,
                Platform: data.lecture_platform.replace("-", " "),
                LectureURL: data.lecture_url,
                // Status: "pending",
                DateTime: data.lecture_date,
                Action: "Attend"
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
        tableBodyMaxHeight: '600px',
        selectableRowsHideCheckboxes: true

    };

    return (
        <div>
            {loadingModal(isLoading)}

            {responseOK && <div className="alert alert-success col-11">
                {responseOKMessage}
            </div>}

            {responseError && <div className="alert alert-danger col-11">
                {responseErrorMessage}
            </div>}

            <MUIDataTable
                title={"Upcoming Lecturers"}
                data={data2}
                columns={columns}
                options={options}
            />
        </div>
    );
};

export default VirtualClassroomTable;
