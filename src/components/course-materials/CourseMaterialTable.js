import React, {useEffect, useState} from "react"
import MUIDataTable from "mui-datatables";

import axios from "axios";
import {Modal} from "react-bootstrap";
import ScaleLoader from "rayloading/lib/ScaleLoader";
import {Link} from 'react-router-dom';
import {JazitalBackendBaseURL} from "../helpers/Constants";
import {closeNavMenu, openNavMenu} from "../helpers/Constants";

function toTitleCase(string) {
    var sentence = string.toLowerCase().split(" ");
    for (var i = 0; i < sentence.length; i++) {
        sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }
    document.write(sentence.join(" "));
    return sentence;
}


const CourseMaterialTable = (props) => {
    const BACKEND_BASE_URL = JazitalBackendBaseURL;
    let endpoint = ''
    let args = {}

    let userToken = localStorage.getItem('userToken');

    if (props.courseID) {
        args = {
            headers: {
                'Authorization': 'Bearer ' + userToken,
            },
            params: {
                'course_id': props.courseID,
            }
        }
    }
    else {
        args = {
            headers: {
                'Authorization': 'Bearer ' + userToken,
            },
        }
    }

    const [documents, setDocuments] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [fileURI, setFileURI] = useState(null)
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
        endpoint = '/lecture-documents/fetch-all-lecture-materials';

        await axios.get(
            BACKEND_BASE_URL + endpoint,
            args
        ).then(response => {
            // console.log(response)
            if (response.data.code === 'lecture_document_fetched') {
                setDocuments(response.data.data.lecture_document)
            }
            setIsLoading(false)
            closeNavMenu();

        }).catch(error => {
            setIsLoading(false)
            closeNavMenu();
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
            name: "DocumentType",
            label: "TYPE",
            options: {
                filter: false,
                sort: false,
            }
        },

        {
            name: "ACTION",
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <>
                        <Link to={`/course-material/view/${documents[tableMeta.rowIndex].lecture_doc_id}`}
                              className="btn btn-primary" onClick={() => {
                        }}>view</Link>
                    </>
                )
            }
        },

    ];

    let data2 = []
    if (documents.length > 0) {
        let sn = 1;
        documents.forEach((data) => {
            data2.push({
                Number: sn,
                Title: data.document_title,
                // Format: data.document_format.format_name,
                Course: data.course_code,
                // FileURL: data.attachments[0],
                DocumentType: data.document_type.type_name.replace("_", " "),
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
        tableBodyMaxHeight: '400px',
        selectableRowsHideCheckboxes: true

    };

    return (
        <div>
            {loadingModal(isLoading)}
            <MUIDataTable
                title={"Lecturer Documents"}
                data={data2}
                columns={columns}
                options={options}
            />
        </div>
    );
};

export default CourseMaterialTable;

