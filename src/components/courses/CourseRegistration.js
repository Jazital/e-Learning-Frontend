import React, {useEffect, useState} from "react";
import CourseRegTable from "./table/CourseRegistrationTable";
import "../CSS/Home.css";
import axios from "axios";
import {Modal} from "react-bootstrap";
import ScaleLoader from "rayloading/lib/ScaleLoader";

const CourseRegistration = () => {
    localStorage.setItem('page_title', 'Course Registration');
    let userToken = localStorage.getItem('userToken') || '';
    const [courses, setCourses] = useState([])
    const BACKEND_BASE_URL = "http://elearning-backend.local/api/v1";
    let endpoint = ''
    let args = ''

    useEffect(() => {
        fetchLectures();
    }, [])
    const [isLoading, setIsLoading] = useState(true);

    const loadingModal = (isOpen = false) => {
        return (
            <Modal show={isOpen}>
                <ScaleLoader color="#ffffff" size="18px" margin="4px" />
            </Modal>
        );
    };

    const fetchLectures = () => {
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
            if (res.data.code && res.data.code === "lecture_fetched") {
                setLectures(res.data.data.lectures);
            }
            setIsLoading(false)
        }).catch(error => {
            setIsLoading(false)
        })
    }


    return (
        <div>
            <CourseRegTable />
            <button className="btn btn-primary mt-3">Register Courses</button>
        </div>
    );
};

export default CourseRegistration;
