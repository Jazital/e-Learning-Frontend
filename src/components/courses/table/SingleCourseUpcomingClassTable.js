import React, {useEffect, useState} from "react"
import MUIDataTable from "mui-datatables";

import {Link} from 'react-router-dom';
import axios from "axios";
import {Modal} from "react-bootstrap";
import ScaleLoader from "rayloading/lib/ScaleLoader";
import {JazitalBackendBaseURL} from "../../helpers/Constants";

const SingleCourseUpcomingClassTable = (props) => {
    let userToken = localStorage.getItem('userToken') || '';
    let userRole = localStorage.getItem('userRole');
    const [responseOK, setResponseOK] = useState(null);
    const [responseOKMessage, setResponseOKMessage] = useState('');
    const [responseError, setResponseError] = useState(null);
    const [responseErrorMessage, setResponseErrorMessage] = useState('');

    const [lectures, setLectures] = useState([])
    const [attendanceSubmitted, setAttendanceSubmitted] = useState(false)

    const BACKEND_BASE_URL = JazitalBackendBaseURL;
    let endpoint = ''
    let args = ''

    useEffect(() => {
        setTimeout(() => {
            fetchLectures();
        }, 2000)
    }, [])

    if (props.courseCode) {
        let courseCode = props.courseCode;
        // A course ID would be passed, so we fetch the upcoming lectures for that course alone
        //URL for fetch with course ID here
        endpoint = '/lectures/fetch-by-course-code';

        args = {
            headers: {
                'Token': userToken,
            },
            params: {
                'course_code': courseCode
            },
        }
    }
    if (props.courseID) {
        let courseID = props.courseID;
        // A course ID would be passed, so we fetch the upcoming lectures for that course alone
        //URL for fetch with course ID here
        endpoint = '/lectures/fetch-by-course-id';

        args = {
            headers: {
                'Token': userToken,
            },
            params: {
                'course_id': courseID
            },
        }
    }

    const [isLoading, setIsLoading] = useState(true);
    const loadingModal = (isOpen = false) => {
        return (
            <Modal show={isOpen}>
                <ScaleLoader color="#ffffff" size="18px" margin="4px" />
            </Modal>
        );
    };

    const fetchLectures = () => {
        // Making request to backend API
        axios.get(
            BACKEND_BASE_URL + endpoint,
            args
        ).then((res) => {
            if (res.data.code && res.data.code === "lecture_fetched") {
                setLectures(res.data.data.lectures);
            }
            setIsLoading(false)
        }).catch(error => {
            setIsLoading(false)
        })
    }

    const attendLecture = async (lectureId) => {
        // Making request to backend API
        endpoint = '/lecture-attendance/add';
        args = {
            headers: {
                'Token': userToken,
            },
        }
        let data = {
            'lecture_id': lectureId,
            // lecturer_id: lecturerID, // TODO: Add lecturer ID conditionally so that it can query only the lecturer's
            // virtual classroom
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
            // console.log(res)

        }).catch(error => {
            setIsLoading(false)
            // console.log(error)
        })
    }

    const modifyLecture = (lectureId) => {
        console.log("Modify lecture clicked")
    }

    const deleteLecture = async (lectureId) => {

        setIsLoading(true)

        endpoint = '/lectures/delete';

        let args2 = {
            headers: {
                'Token': userToken,
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
                    // window.location.reload(false);
                }, 2000)
            }
            else {
                setResponseErrorMessage(response.data.message)
                setResponseError(true)
                setResponseOK(false)
            }
            setIsLoading(false)

            // console.log(response.data.data)
        }).catch(error => {
            // console.error(error)
            if (error.response.data.message) {
                setResponseErrorMessage(error.response.data.message)
                setResponseError(true)
                setResponseOK(false)
            }
            else {
                setResponseErrorMessage("Sorry, we cannot create the virtual classroom at the moment. Please try again later.")
                setResponseError(true)
                setResponseOK(false)
            }

            setIsLoading(false)
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
            name: "Course",
            label: "COURSE",
            options: {
                filter: false,
                sort: false,
            }
        },
        {
            name: "Platform",
            label: "PLATFORM",
            options: {
                filter: false,
                sort: false,
            }
        },
        {
            name: "DateTime",
            label: "DATE",
            options: {
                filter: false,
                sort: false,
            }
        },
        {
            name: "ACTION",
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <>
                        {userRole == "student" && <a href={lectures[tableMeta.rowIndex].lecture_url} onClick={() => {
                            setIsLoading(true);
                            return attendLecture(lectures[tableMeta.rowIndex].lecture_id)
                        }}
                                                     className="btn btn-primary">Attend</a>}
                        {userRole == "lecturer" && <a href={lectures[tableMeta.rowIndex].lecture_url} onClick={() => {
                            setIsLoading(true);
                            return attendLecture(lectures[tableMeta.rowIndex].lecture_id)
                        }}
                                                      className="btn btn-primary">Start</a>}
                        {/*{userRole=="lecturer" &&<a href={lectures[tableMeta.rowIndex].lecture_url} onClick={() =>  {
                         setIsLoading(true);
                         return modifyLecture(lectures[tableMeta.rowIndex].lecture_id)
                         }}
                         className="btn btn-warning">Modify</a>}*/}
                        {userRole === "lecturer" && <a href={`#`}

                                                       onClick={()=>{deleteLecture(lectures[tableMeta.rowIndex].lecture_id)}}

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
                Course: data.course_code,
                Platform: (data.lecture_platform).replace("-", " "),
                // LectureURL: data.lecture_url,
                Status: "pending",
                DateTime: data.lecture_date,
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

            {responseOK && <div className="alert alert-success col-11">
                {responseOKMessage}
            </div>}

            {responseError && <div className="alert alert-danger col-11">
                {responseErrorMessage}
            </div>}

            {data2 &&
            <MUIDataTable
                title={"Upcoming Lecturers"}
                data={data2}
                columns={columns}
                options={options}
            />
            }
        </div>
    );
};

export default SingleCourseUpcomingClassTable;

