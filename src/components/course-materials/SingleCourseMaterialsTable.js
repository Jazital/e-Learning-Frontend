import React from "react"
import MUIDataTable from "mui-datatables";

import {Link} from 'react-router-dom';


const SingleCourseMaterialsTable = (props) => {

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
            name: "Title",
            label: "Title",
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
            Title: "Introduction to computer",
            DocumentType: "Journal",
            Lecturer: "Dr. Ibe Ken",
        },
        {
            Number: "2",
            Format: "PDF",
            Title: "Generations of computer",
            DocumentType: "Handout",
            Lecturer: "Mr. Joel T.",
        },
        {
            Number: "3",
            Format: "MP4",
            Title: "Data structures and algorithms",
            DocumentType: "Journal",
            Lecturer: "Dr. Ibe Ken",
        },
        {
            Number: "4",
            Format: "PDF",
            Title: "Data structures and algorithms",
            DocumentType: "Journal",
            Lecturer: "Dr. Ibe Ken",
        },
        {
            Number: "5",
            Format: "PDF",
            Title: "Data structures and algorithms",
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

export default SingleCourseMaterialsTable;

