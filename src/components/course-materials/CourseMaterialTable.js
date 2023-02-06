import React, {useEffect, useState} from "react"
import MUIDataTable from "mui-datatables";

import {Link} from 'react-router-dom';
import axios from "axios";


const CourseMaterialTable = (props) => {
    const BACKEND_BASE_URL = "http://elearning-backend.local/api/v1";
    let endpoint = ''
    let args = {}

    let userToken = localStorage.getItem('userToken') || '';

    if (props.courseID) {

        // A course ID was passed, so we fetch the course materials for the passed course ID; else we fetch all the
        // course materials for all courses.
        //This is passed in SingleCourseMaterial.js
        args = {
            headers: {
                'Token': userToken,
            },
            params: {
                'course_id': props.courseID,
            }
        }
    }
    else {
        args = {
            headers: {
                'Token': userToken,
            },
        }
    }
    const [documents, setDocuments] = useState([])


    useEffect(() => {
        fetchCourseMaterials();
    }, [])

    const fetchCourseMaterials = async () => {
        endpoint = '/lecture-documents/fetch-all-lecture-materials';

        await axios.get(
            BACKEND_BASE_URL + endpoint,
            args
        ).then(response => {

            if(response.data.code == 'lecture_document_fetched'){
                setDocuments(response.data.data.lecture_document)
            }
            // console.log(response.data.code)
        }).catch(error => {
            console.error(error)
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
            name: "Title",
            label: "TITLE",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Course",
            label: "COURSE",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Format",
            label: "FORMAT",
            options: {
                filter: true,
                sort: true,
            }
        },

        {
            name: "DocumentType",
            label: "TYPE",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "ACTION",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <>
                        <a href="#" className="btn btn-primary pb-2">Download</a>
                    </>
                )
            }
        },
    ];

    const onRowClicked = (row, event) => {
        console.log("row", row);
        // setActiveRow(row);
    };

    let data2 = []
    if (documents.length > 0) {
        let sn = 1;
        documents.forEach((data) => {
            data2.push({
                Number: sn,
                Title: data.document_title,
                Format: data.document_format.format_name,
                Course: data.course_code,
                DocumentType: data.document_type.type_name.replace("_", " "),

            })
            sn++;
        })

    }

    const options = {
        filterType: 'checkbox',
    };

    return (
        <div>
            <MUIDataTable
                // title={"Upcoming Lecturers"}
                data={data2}
                columns={columns}
                options={options}
            />
        </div>
    );
};

export default CourseMaterialTable;

