import React, {useEffect, useState} from "react"
import MUIDataTable from "mui-datatables";

import axios from "axios";
import {Modal} from "react-bootstrap";
import ScaleLoader from "rayloading/lib/ScaleLoader";
import {Link, useParams} from 'react-router-dom';


const ContinuousAssessmentTable = (props) => {
    // const BACKEND_BASE_URL = "http://elearning-backend.local/api/v1";
    const BACKEND_BASE_URL = "https://pandagiantltd.com/e-learning-backend-api/api/v1";
    let endpoint = ''
    let args = {}

    let userToken = localStorage.getItem('userToken') || '';
        args = {
            headers: {
                'Token': userToken,
            },
        }
    const [assessments, setAssessments] = useState([])
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
            fetchCourseMaterials();
        }, 2000)
    }, [])

    const fetchCourseMaterials = async () => {
        endpoint = '/assessments/fetch-assessment-by-student-id';

        await axios.get(
            BACKEND_BASE_URL + endpoint,
            args
        ).then(response => {
            if (response.data.code === 'lecture_assessment_fetched') {
                setAssessments(response.data.data.assessments_fetched)
            }
            setIsLoading(false)
        
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
                filter: false,
                sort: false,
            }
        },
        {
            name: "Title",
            label: "TITLE",
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
            name: "Score",
            label: "SCORE",
            options: {
                filter: false,
                sort: false,
            }
        },
        {
            name: "Date",
            label: "DATE",
            options: {
                filter: false,
                sort: false,
            }
        },
        {
            name: "Actions",
            options: {
                filter: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <>
                        <Link to={`/assignment/${assessments[tableMeta.rowIndex].assignment_id}`} className="btn btn-primary" onClick={()=>{
                        }}>view assignment</Link>
                    </>
                )
            }
        },
    ];

    let data2 = []
    if (assessments.length > 0) {
        let sn = 1;
        assessments.forEach((data) => {
            data2.push({
                Number: sn,
                Title: data.assignment_title,
                Course: data.course_code,
                Score: data.score,
                Date: data.assigned_date,
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
        tableBodyMaxHeight:'400px',
        selectableRowsHideCheckboxes:true

    };

    return (
        <div>
            {loadingModal(isLoading)}
            <MUIDataTable
                title={"Assignments Scores"}
                data={data2}
                columns={columns}
                options={options}
            />
        </div>
    );
};

export default ContinuousAssessmentTable;
