import React, {useEffect, useState} from "react";
import "../CSS/Home.css";
import axios from "axios";
import {Modal} from "react-bootstrap";
import ScaleLoader from "rayloading/lib/ScaleLoader";
import {Link} from "react-router-dom";

const DepartmentLecturers = () => {
    localStorage.setItem('page_title', 'Department Lecturers');
    let userToken = localStorage.getItem('userToken') || '';
    let departmentID = localStorage.getItem('department');
    const [responseOK, setResponseOK] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');
    const [lecturers, setLecturers] = useState([])
    const [tableLecturers, setTableLecturers] = useState([])
    const [selectedSemester, setSelectedSemester] = useState("first-semester")
    const BACKEND_BASE_URL = "http://elearning-backend.local/api/v1";
    // const BACKEND_BASE_URL = "https://pandagiantltd.com/e-learning-backend-api/api/v1";
    let endpoint = ''
    let args = ''

    useEffect(() => {
        setTimeout(() => {
            fetchAllDepartmentLecturers();
        }, 2000)
    }, [])

    const [isLoading, setIsLoading] = useState(true);

    const fetchAllDepartmentLecturers = () => {
        setIsLoading(true);
        endpoint = `/departmental-admin/fetch-department-lecturers?department_id=${departmentID}`;
        args = {
            headers: {
                'Token': userToken,
            },
        }
        // Making request to backend API
        axios.get(
            BACKEND_BASE_URL + endpoint,
            args
        ).then((res) => {
            if (res.data.code && res.data.code === "lecturers_fetched") {
                setLecturers(res.data.data.lecturers);
                setTableLecturers(res.data.data.lecturers);
            }
            setIsLoading(false)
            // console.log(res.data)
        }).catch(error => {
            setIsLoading(false)
            // console.error(error)
        })
    }

    const filterLecturerOnchange = (e) => {
        var searchQuery = e.target.value;
        var newLecturers = lecturers.filter(lecturer => {
            return ((lecturer.first_name.toLowerCase().includes(searchQuery.toLowerCase())) || (lecturer.last_name.toLowerCase().includes(searchQuery.toLowerCase())));
    })
        setTableLecturers(newLecturers);
    }

    const loadingModal = (isOpen = false) => {
        return (
            <Modal show={isOpen}>
                <ScaleLoader color="#ffffff" size="18px" margin="4px" />
            </Modal>
        );
    };

    return (
        <>
            {loadingModal(isLoading)}
            <div className="col-lg-12">
            <div className="row my-3">
            </div>
                <div className="row mb-3">
                <div className="col-12 col-lg-6 text-right">
                        <input className="form-control" onChange={filterLecturerOnchange} type="search"
                               id="course-ajax-search-input" placeholder="Search lecturers..." />
                    </div>
                    <div className="col-12 col-lg-6">
                    </div>
                </div>
                    <div className="table-responsive">
                    <table
                        className="table table-borderless table-hover table-striped department-lecturers-table">
                        <thead>
                        <td>S/N</td>
                        <td>First Name</td>
                        <td>Last Name</td>
                        <td>Action</td>
                        </thead>
                        <tbody>
                        {tableLecturers.map((lecturer, index) =>  (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{lecturer.first_name}</td>
                                <td>{lecturer.last_name}</td>
                                <td><Link className="btn btn-primary"to={`/department-lecturers-courses/${lecturer.id}`}>View Courses</Link> <Link className="btn btn-warning"to={`/modify-assigned-courses/${lecturer.id}`}>Assign Courses</Link> <Link className="btn btn-danger"to={`/unassigned-courses/${lecturer.id}`}>Un-assign Courses</Link></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
            </div>
        </>
    );
};

export default DepartmentLecturers;
