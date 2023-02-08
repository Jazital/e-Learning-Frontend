import React, {useEffect, useState} from "react"
import MUIDataTable from "mui-datatables";

import {Link, useParams} from 'react-router-dom';
import {Modal} from "react-bootstrap";
import ScaleLoader from "rayloading/lib/ScaleLoader";
import axios from "axios";


const AssignmentList = () => {
    /*const clickHandler = (e, id) => {
     e.preventDefault();
     console.log("Row Id", id);
     };*/
    localStorage.setItem('page_title', 'Assignments');

    const {course_id} = useParams();

    const BACKEND_BASE_URL = "http://elearning-backend.local/api/v1";
    let endpoint = ''
    let args = {}

    let userToken = localStorage.getItem('userToken') || '';

    if (course_id) {
        args = {
            headers: {
                'Token': userToken,
            },
            params: {
                'course_id': course_id,
            }
        }
        endpoint = '/assignments/fetch-by-course-id';
    }
    else {
        args = {
            headers: {
                'Token': userToken,
            },
        }
        endpoint = '/assignments/fetch-all-assignments';
    }

    const [assignments, setAssignments] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const loadingModal = (isOpen = false) => {
        return (
            <Modal show={isOpen}>
                <ScaleLoader color="#ffffff" size="18px" margin="4px" />
            </Modal>
        );
    };

    useEffect(() => {
        fetchAssignments();
    }, [])

    const fetchAssignments = async () => {

        await axios.get(
            BACKEND_BASE_URL + endpoint,
            args
        ).then(response => {
            if(response.data.code === 'assignment_fetched'){
                setAssignments(response.data.data.lecture_assignments)
            }
            setIsLoading(false)
            // console.log(response)
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
            name: "Course",
            label: "Courses",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Status",
            label: "Status",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "DueDate",
            label: "Due Date",
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
                        <Link to="/assignment/226" className="btn btn-primary">view</Link>
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
                Course: data.course_code,
                Status: "open",
                DueDate: data.due_date,
                // Lecturer: "Dr. E. Dayo",
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
                title={"All Assignment"}
                data={data2}
                columns={columns}
                options={options}
                pagination
            />
        </div>
    );
};

export default AssignmentList;

