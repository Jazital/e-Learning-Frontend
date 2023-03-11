import React, {useEffect, useState} from "react";
import { Modal} from "react-bootstrap";

import "../CSS/Home.css";
import ScaleLoader from "rayloading/lib/ScaleLoader";
import axios from "axios";


const TimeTable = () => {
    localStorage.setItem('page_title', 'Lecture Timetable');

    const BACKEND_BASE_URL = "http://elearning-backend.local/api/v1";
    // const BACKEND_BASE_URL = "https://pandagiantltd.com/e-learning-backend-api/api/v1";
    let endpoint = ''

    let userToken = localStorage.getItem('userToken') || '';
    let args = {
        headers: {
            'Token': userToken,
        },
    }
    endpoint = '/lecture-timetable/fetch';

    const [timetable, setTimetable] = useState([])
    const [timetable2, setTimetable2] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const loadingModal = (isOpen = false) => {
        return (
            <Modal show={isOpen}>
                <ScaleLoader color="#ffffff" size="18px" margin="4px" />
            </Modal>
        );
    };

    useEffect(() => {
        fetchTimetable();
    }, [])

    const fetchTimetable = async () => {
        await axios.get(
            BACKEND_BASE_URL + endpoint,
            args
        ).then(response => {
            if (response.data.code === 'timetable_fetched') {
                setTimetable(response.data.data.lecture_timetable)
            }
            setIsLoading(false)
            setTimetable2(response.data.data.lecture_timetable)
        }).catch(error => {
            setIsLoading(false)
        })
    }

    return (
        <div>
            {loadingModal(isLoading)}
            {(timetable2.length > 0) && (timetable2.map((data) => {
               return <img src={data} key={Math.random()} alt="" className="m-2 timetable-img" />
            }))}
            <br />
        </div>
    );
};

export default TimeTable;

