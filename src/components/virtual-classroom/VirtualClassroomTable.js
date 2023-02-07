import React, {useEffect, useState} from "react"
import MUIDataTable from "mui-datatables";
import {Modal} from "react-bootstrap";
import ScaleLoader from "rayloading/lib/ScaleLoader";
import axios from "axios";

const VirtualClassroomTable = (props) => {
    const BACKEND_BASE_URL = "http://elearning-backend.local/api/v1";
    let endpoint = ''
    let args = {}

    let userToken = localStorage.getItem('userToken') || '';

    if (props.courseID) {
        args = {
            headers: {
                'Token': userToken,
            },
            params: {
                'course_id': props.courseID,
            }
        }
        endpoint = '/lectures/fetch-by-course-id';
    }
    else {
        args = {
            headers: {
                'Token': userToken,
            },
        }
        endpoint = '/lectures/fetch-student-upcoming-lectures';
    }
    const [lectures, setLectures] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const loadingModal = (isOpen = false) => {
        return (
            <Modal show={isOpen}>
                <ScaleLoader color="#ffffff" size="18px" margin="4px" />
            </Modal>
        );
    };

    useEffect(() => {
        fetchLectures();
    }, [])

    const fetchLectures = async () => {


        await axios.get(
            BACKEND_BASE_URL + endpoint,
            args
        ).then(response => {
            if(response.data.code === 'lecture_fetched'){
                setLectures(response.data.data.lectures)
            }
            setIsLoading(false)
        }).catch(error => {
            console.error(error)
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
            name: "Course",
            label: "Courses",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Platform",
            label: "Platform",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "LectureURL",
            label: "Lecture URL",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "Status",
            label: "Status",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "DateTime",
            label: "Date & Time",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "Actions",
            options: {
                filter: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <>
                        <a href="https://www.youtube.com/watch?v=DE8KYo_g96A" className="btn btn-primary">Attend</a>
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
                Platform: data.lecture_platform.replace("-", " "),
                LectureURL: data.lecture_url,
                Status: "pending",
                DateTime: data.lecture_date,
                Action: "Attend"
            })
            sn++;
        })
    }

    const options = {
        filterType: 'checkbox',
    };

    return (
        <div>
            {loadingModal(isLoading)}
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
