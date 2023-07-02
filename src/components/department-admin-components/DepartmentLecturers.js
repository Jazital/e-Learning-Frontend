import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import "../CSS/Home.css";
import axios from "axios";
import {Modal} from "react-bootstrap";
import ScaleLoader from "rayloading/lib/ScaleLoader";
import {JazitalBackendBaseURL} from "../helpers/Constants";
import {closeNavMenu, openNavMenu} from "../helpers/Constants";

const DepartmentLecturers = () => {
    localStorage.setItem('page_title', 'Department Lecturers');
    let userToken = localStorage.getItem('userToken') || '';
    let departmentID = localStorage.getItem('department');
    const [lecturers, setLecturers] = useState([])
    const [tableLecturers, setTableLecturers] = useState([])
    const [selectedSemester, setSelectedSemester] = useState("first-semester")

    const [responseOK, setResponseOK] = useState(null);
    const [responseOKMessage, setResponseOKMessage] = useState('');
    const [responseError, setResponseError] = useState(null);
    const [responseErrorMessage, setResponseErrorMessage] = useState('');

    const BACKEND_BASE_URL = JazitalBackendBaseURL;
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
closeNavMenu();
        }).catch(error => {
            setIsLoading(false)
closeNavMenu();
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

    const handleLecturerDelete = async (lecturer_id) => {
        setIsLoading(true)

        endpoint = '/users/delete';

        let args2 = {
            headers: {
                'Token': userToken,
                'Content-Type': 'multipart/form-data',
            },
            params: {
                lecturer_id: lecturer_id
            }
        }

        await axios.delete(
            BACKEND_BASE_URL + endpoint,
            args2
        ).then(response => {
            if (response.data.code === 'user_deleted') {
                setResponseOKMessage(response.data.message)
                setResponseOK(true)
                setResponseError(false)

                setTimeout(() => {
                    window.location.reload(false);
                }, 1000)
            }
            else {
                setResponseErrorMessage(response.data.message)
                setResponseError(true)
                setResponseOK(false)
            }
            setIsLoading(false)
closeNavMenu();

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
closeNavMenu();
        })
    }

    return (
        <>
            {loadingModal(isLoading)}

             {responseOK && <div className="alert alert-success col-12">
                {responseOKMessage}
            </div>}

            {responseError && <div className="alert alert-danger col-12">
                {responseErrorMessage}
            </div>}

            <div className="col-lg-12">
            <div className="row my-3">
            </div>
                <div className="row mb-3">
                    <div className="col-12 col-lg-6">
                        <Link className="btn btn-primary"to={`/add-new-user`}>Add New Lecturer</Link> 
                    </div>
                    <div className="col-12 col-lg-6 text-right">
                        <input className="form-control" onChange={filterLecturerOnchange} type="search"
                               id="course-ajax-search-input" placeholder="Search lecturers..." />
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
                                <td>
                                    {/* <Link className="btn btn-primary"to={`/modify-user-details/${lecturer.id}`}>Modify details</Link>  */}
                                <Link className="btn btn-danger" to={`#`} onClick={()=>{handleLecturerDelete(lecturer.id)}}>Delete lecturer</Link></td>
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
