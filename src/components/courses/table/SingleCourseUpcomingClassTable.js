import React, {useEffect, useState} from "react"
import MUIDataTable from "mui-datatables";

import {Link} from 'react-router-dom';
import axios from "axios";
import {Modal} from "react-bootstrap";
import ScaleLoader from "rayloading/lib/ScaleLoader";

const SingleCourseUpcomingClassTable = (props) => {
    let userToken = localStorage.getItem('userToken') || '';
    const [lectures, setLectures] = useState([])
    const [attendanceSubmitted, setAttendanceSubmitted] = useState(false)

    const BACKEND_BASE_URL = "http://elearning-backend.local/api/v1";
    let endpoint = ''
    let args = ''

    useEffect(() => {
        fetchLectures();
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
            // console.log(res)

        }).catch(error => {
            setIsLoading(false)
            // console.log(error)
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
                        <a href={lectures[tableMeta.rowIndex].lecture_url} onClick={() =>  {
                            setIsLoading(true);
                            return attendLecture(lectures[tableMeta.rowIndex].lecture_id)
                        }}
                           className="btn btn-primary">Attend</a>
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

