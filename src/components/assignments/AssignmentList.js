import React from "react"
import MUIDataTable from "mui-datatables";

import {Link} from 'react-router-dom';


const AssignmentList = () => {
    const clickHandler = (e, id) => {
        e.preventDefault();
        console.log("Row Id", id);
    };
    localStorage.setItem('page_title', 'Assignments');
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
            name: "Course",
            label: "Courses",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "DueDate",
            label: "Due Date",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Status",
            label: "Status",
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
                customBodyRender: (value, tableMeta, updateValue) => (
                    <>
                        <Link to="/assignment/3554" className="btn btn-primary">view</Link>
                        <a href="#" className="btn btn-primary">submit</a>

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
            Course: "CSC 401",
            DueDate: "24-03-2022 04:30PM",
            Status: "open",
            Lecturer: "Dr. E. Dayo",
        },
        {
            Number: "2",
            Course: "CSC 401",
            DueDate: "24-03-2022 04:30PM",
            Status: "open",
            Lecturer: "Dr. E. Dayo",
        },
        {
            Number: "3",
            Course: "CSC 401",
            DueDate: "24-03-2022 04:30PM",
            Status: "closed",
            Lecturer: "Dr. E. Dayo",
        },
        {
            Number: "4",
            Course: "CSC 401",
            DueDate: "24-03-2022 04:30PM",
            Status: "closed",
            Lecturer: "Dr. E. Dayo",
        },

    ];

    const options = {
        filterType: 'checkbox',
    };

    return (
        <div>
            <MUIDataTable
                title={"All Assignment"}
                data={data}
                columns={columns}
                options={options}
                pagination
            />
        </div>
    );
};

export default AssignmentList;

