import React from "react"
import MUIDataTable from "mui-datatables";

import {Link} from 'react-router-dom';


const CourseMaterialTable = (props) => {
    if (props.courseID) {
        // A course ID was passed, so we fetch the course materials for the passed course ID; else we fetch all the
        // course materials for all courses.
        //This is passed in SingleCourseMaterial.js
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
            name: "Format",
            label: "Format",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Course",
            label: "Course",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "DocumentType",
            label: "Document Type",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Lecturer",
            label: "Lecturer",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Actions",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <>
                        <a href="#" className="btn btn-primary pb-2">Download</a>
                        {/*<FormControlLabel*/}
                        {/*    label=""*/}
                        {/*    value={value}*/}
                        {/*    control={<TextField value={value} />}*/}
                        {/*    onChange={event => updateValue(event.target.value)}*/}
                        {/*/>*/}
                    </>
                )
            }
        },
    ];

    const data = [
        {
            Number: "1",
            Format: "PDF",
            Course: "CSC 401",
            DocumentType: "Journal",
            Lecturer: "Dr. Ibe Ken",
        },
        {
            Number: "2",
            Format: "PDF",
            Course: "GES 101",
            DocumentType: "Handout",
            Lecturer: "Mr. Joel T.",
        },
        {
            Number: "3",
            Format: "MP4",
            Course: "BCH 302",
            DocumentType: "Journal",
            Lecturer: "Dr. Ibe Ken",
        },
        {
            Number: "4",
            Format: "PDF",
            Course: "CSC 401",
            DocumentType: "Journal",
            Lecturer: "Dr. Ibe Ken",
        },
        {
            Number: "5",
            Format: "PDF",
            Course: "CSC 401",
            DocumentType: "Journal",
            Lecturer: "Dr. Ibe Ken",
        },


    ];

    const options = {
        filterType: 'checkbox',
    };

    return (
        <div>
            <MUIDataTable
                // title={"Upcoming Lecturers"}
                data={data}
                columns={columns}
                options={options}
            />
        </div>
    );
};

export default CourseMaterialTable;

