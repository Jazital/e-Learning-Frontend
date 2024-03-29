import React, {useEffect, useState} from "react";
import {Modal} from "react-bootstrap";

import "../CSS/Home.css";
import ScaleLoader from "rayloading/lib/ScaleLoader";
import axios from "axios";
import {JazitalBackendBaseURL} from "../helpers/Constants";
import {closeNavMenu, openNavMenu} from "../helpers/Constants";

const TimeTable = () => {
    localStorage.setItem('page_title', 'Lecture Timetable');

    const BACKEND_BASE_URL = JazitalBackendBaseURL;
    let endpoint = ''

    let userToken = localStorage.getItem('userToken') || '';
    let args = {
        headers: {
            'Authorization': 'Bearer ' + userToken,
        },
    }
    endpoint = '/lecture-timetable/fetch';
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
        setTimeout(() => {
            fetchTimetable();
        }, 2000)
    }, [])

    const fetchTimetable = async () => {
        await axios.get(
            BACKEND_BASE_URL + endpoint,
            args
        ).then(response => {
            if (response.data.code === 'timetable_fetched') {
                setTimetable2(response.data.data.lecture_timetable)
            }
            setIsLoading(false)
            closeNavMenu();

        }).catch(error => {
            setIsLoading(false)
            closeNavMenu();
        })
    }

    return (
        <div>
            {loadingModal(isLoading)}
            {(Array.isArray(timetable2)) && (timetable2.map((data, index) => {
                return <img src={data} key={index} alt="" className="m-2 timetable-img" />
            }))}
            <br />
        </div>
    );
};

export default TimeTable;

