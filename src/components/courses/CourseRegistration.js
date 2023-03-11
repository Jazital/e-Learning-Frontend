import React, {useEffect, useState} from "react";
import "../CSS/Home.css";
import axios from "axios";
import {Modal} from "react-bootstrap";
import ScaleLoader from "rayloading/lib/ScaleLoader";
import MUIDataTable from "mui-datatables";

const CourseRegistration = () => {
    localStorage.setItem('page_title', 'Course Registration');
    let userToken = localStorage.getItem('userToken') || '';
    const [responseOK, setResponseOK] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');
    const [courses, setCourses] = useState([])
    const [tableCourses, setTableCourses] = useState([])
    const [selectedSemester, setSelectedSemester] = useState("first-semester")
    const BACKEND_BASE_URL = "http://elearning-backend.local/api/v1";
    // const BACKEND_BASE_URL = "https://pandagiantltd.com/e-learning-backend-api/api/v1";
    let endpoint = ''
    let args = ''

    useEffect(() => {
        fetchAllCourses();
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
            if (response.data.code === 'courses_enrolled') {
                setResponseMessage(response.data.message)
                setResponseOK(true)
            }
            setIsLoading(false)

            console.log(response.data)
        }).catch(error => {
            console.error(error)
            if(error.response.data.message){
                setResponseMessage(error.response.data.message)
                setResponseOK(false)
            }
            else{
                setResponseMessage("Sorry, we cannot create the virtual classroom at the moment. Please try again later.")
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
                <div className="row mb-3">
                    <div className="col-12 col-lg-6">
                        {/*<div>*/}
                        {/*    <input type="checkbox" onClick={toggleCheckboxes(this)} /> Toggle All<br />*/}

                        {/*    <input type="checkbox" name="foo" value="bar1" />*/}
                        {/*    <input type="checkbox" name="foo" value="bar2" />*/}
                        {/*    <input type="checkbox" name="foo" value="bar3" />*/}
                        {/*    <input type="checkbox" name="foo" value="bar4" />*/}
                        {/*</div>*/}

                        <select onChange={handleSemesterOnchange} className="form-control col-md-5 col-12">
                            <option value="first-semester">First Semester</option>
                            <option value="second-semester">Second Semester</option>
                        </select>

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
                        <td><input className="form-check" onClick={handleMasterCheckboxClicked} type="checkbox"
                                   id="toggleAllCourses" /></td>
                        <td>S/N</td>
                        <td>Code</td>
                        <td>Title</td>
                        <td>Department</td>
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
                                <td>{course.course_department.department_name}</td>
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
