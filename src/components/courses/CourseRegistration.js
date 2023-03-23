import React, {useEffect, useState} from "react";
import "../CSS/Home.css";
import axios from "axios";
import {Modal} from "react-bootstrap";
import ScaleLoader from "rayloading/lib/ScaleLoader";
import MUIDataTable from "mui-datatables";
import {JazitalBackendBaseURL} from "../helpers/Constants";

const CourseRegistration = () => {
    localStorage.setItem('page_title', 'Course Registration');
    let userToken = localStorage.getItem('userToken') || '';
    const [responseOK, setResponseOK] = useState(null);
    const [responseOKMessage, setResponseOKMessage] = useState('');
    const [responseError, setResponseError] = useState(null);
    const [responseErrorMessage, setResponseErrorMessage] = useState('');
    const [courses, setCourses] = useState([])
    const [tableCourses, setTableCourses] = useState([])
    const [selectedSemester, setSelectedSemester] = useState("first-semester")

    const BACKEND_BASE_URL = JazitalBackendBaseURL;
    let endpoint = ''
    let args = ''

    useEffect(() => {
        setTimeout(() => {
            fetchAllCourses();
        }, 2000)
    }, [])

    const [isLoading, setIsLoading] = useState(true);

    const loadingModal = (isOpen = false) => {
        return (
            <Modal show={isOpen}>
                <ScaleLoader color="#ffffff" size="18px" margin="4px" />
            </Modal>
        );
    };

    const fetchAllCourses = () => {
        setIsLoading(true);
        endpoint = '/courses/all';
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
            if (res.data.code && res.data.code === "courses_fetched") {
                setCourses(res.data.data.courses);
                setTableCourses(res.data.data.courses);
            }
            setIsLoading(false)
            // console.log(res.data)
        }).catch(error => {
            setIsLoading(false)
            // console.error(error)
        })
    }

    const submitRegistredCourses = async (e) => {
        e.preventDefault();

        setIsLoading(true)

        endpoint = '/courses/enrol-courses-by-course-code';

        var items = document.getElementsByName("selectedCourses[]");

      var arr=[];
      for (var i = 0; i < items.length; i++) {
         if (items[i].type == "checkbox" && items[i].checked == true){
            arr.push(items[i].value);
         }
      }

        var data = {
            "course_codes": arr
        };

        let args = {
            headers: {
                'Token': userToken,
            },
        }

        await axios.post(
            BACKEND_BASE_URL + endpoint,
            data,
            args
        ).then(response => {
            if (response.data.code == 'courses_enrolled') {
                setResponseOKMessage(response.data.message)
                setResponseOK(true)
                setResponseError(false)
            }
            setIsLoading(false)

            // console.log(response.data)
        }).catch(error => {
            // console.error(error)
            if(error.response.data.message){
                setResponseErrorMessage(error.response.data.message)
                setResponseError(true)
                setResponseOK(false)
            }
            else{
                setResponseErrorMessage("Sorry, we cannot create the virtual classroom at the moment. Please try again later.")
                setResponseError(true)
                setResponseOK(false)
            }

            setIsLoading(false)
        })
    }


    const handleSemesterOnchange = (e) => {
        // setIsLoading(true)
        var newSemester = e.target.value;
        setSelectedSemester(newSemester);
        // console.log(newSemester)

        // var newFilter =
        // setTableCourses()


        // var searchQuery = e.target.value;
        // var newCourses = courses.filter(course => {
        //     return ((course.course_code.toLowerCase().includes(searchQuery.toLowerCase()))&&(course.course_semester.semester_slug.lowerCase().includes(selectedSemester.toLowerCase())));
        // })
        // setIsLoading(false)
    }

    const filterCoursesOnchange = (e) => {
        var searchQuery = e.target.value;
        var newCourses = courses.filter(course => {
            // return course.course_code.toLowerCase().includes(searchQuery.toLowerCase());

            return ((course.course_code.toLowerCase().includes(searchQuery.toLowerCase()))&&(course.course_semester.semester_slug.toLowerCase().includes(selectedSemester.toLowerCase())));
    })

        setTableCourses(newCourses);
    }


    function toggleCheckboxes(source) {
        var checkboxes = document.getElementsByName('foo');
        for (var checkbox in checkboxes)
            checkbox.checked = source.checked;
    }

    function handleMasterCheckboxClicked(e) {
        var isMasterChecked = e.target.checked;
        var allCoursesCheckboxes = document.querySelectorAll(".courses-checkbox");

        if (isMasterChecked) {
            for (var i = 0; i < allCoursesCheckboxes.length; i++) {
                var courseCheckbox = document.querySelector(".courses-checkbox").item(i);
                console.log(courseCheckbox)
                // courseCheckbox.checked = true;
            }
        }
    }

    return (
        <>
            {loadingModal(isLoading)}
            <div className="col-lg-12">
            <div className="row my-3">
                <h4 className="text-danger" >*** Please note that clicking on the submit button replace your currently enrolled courses with the selected courses ***</h4>
            </div>

            {responseOK && <div className="alert alert-success col-11">
                    {responseOKMessage}
                </div>}

                {responseError && <div className="alert alert-danger col-11">
                    {responseErrorMessage}
                </div>}

                <div className="row mb-3">
                    <div className="col-12 col-lg-6">
                        {/* <select onChange={handleSemesterOnchange} className="form-control col-md-5 col-12">
                            <option value="first-semester">First Semester</option>
                            <option value="second-semester">Second Semester</option>
                        </select> */}

                    </div>
                    <div className="col-12 col-lg-6 text-right">
                        <input className="form-control" onChange={filterCoursesOnchange} type="search"
                               id="course-ajax-search-input" placeholder="Search courses..." />
                    </div>
                </div>
                <form onSubmit={submitRegistredCourses}>
                    <table
                        className="table table-borderless table-hover table-responsive table-striped table-">
                        <thead>
                        <td></td>
                        <td>S/N</td>
                        <td>Code</td>
                        <td>Title</td>
                        <td>Unit</td>
                        <td>Semester</td>
                        </thead>
                        <tbody>
                            {/* {course.course_semester.semester_slug.toLowerCase().includes(selectedSemester.toLowerCase()) && */}
                        {tableCourses.map((course, index) =>  (
                            <tr key={index}>
                                <td><input className="form-check courses-checkbox" name="selectedCourses[]"
                                           value={course.course_code}
                                           type="checkbox" id="selectedCourses" /></td>
                                <td>{index + 1}</td>
                                <td>{course.course_code}</td>
                                <td>{course.course_title}</td>
                                <td>{course.course_unit}</td>
                                <td>{course.course_semester.semester_name}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <button type="submit" className="btn btn-primary mt-3">Register Courses</button>
                </form>
            </div>
        </>
    );
};

export default CourseRegistration;
