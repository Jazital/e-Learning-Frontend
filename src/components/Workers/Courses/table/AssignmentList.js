import React from "react"
import MUIDataTable from "mui-datatables";

import {Link} from 'react-router-dom';

const SubmittedAssignment = () => {

    const clickHandler = (event) => {
        console.log(event.target)
    }

    const columns = [
        {
            // cell:(row) => <button onClick={clickHandler} id={row.ID}>Action</button>,
            cell: (row) => <button onClick={clickHandler} id="1">Action</button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },

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
            name: "DateGiven",
            label: "Date Given",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "DueDate",
            label: "Due Date",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "Status",
            label: "Status",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "MatricNo",
            label: "Matric No",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "Action",
            label: "Action",
            options: {
                filter: true,
                sort: false,

            }
        },
    ];


    const data = [
        {
            Number: "1",
            Course: `CSC 411 ${1 + 4}`,
            DateGiven: "24-03-2022 04:30PM",
            DueDate: "24-03-2022 04:30PM",
            Status: "open",
            MatricNo: "6656",
            Action: "View, Download, Upload Score"
        },
        {
            Number: "2",
            Course: `CSC 411 ${7 + 9}`,
            DateGiven: "24-03-2022 04:30PM",
            DueDate: "24-03-2022 04:30PM",
            Status: "open",
            MatricNo: "6656",
            Action: "View, Download, Upload Score"
        },
        {
            Number: "3",
            Course: `CSC 411 ${6 + 5}`,
            DateGiven: "24-03-2022 04:30PM",
            DueDate: "24-03-2022 04:30PM",
            Status: "open",
            MatricNo: "6656",
            Action: "View, Download, Upload Score"
        },
        {
            Number: "4",
            Course: `CSC 411 ${9 * 8}`,
            DateGiven: "24-03-2022 04:30PM",
            DueDate: "24-03-2022 04:30PM",
            Status: "open",
            MatricNo: "6656",
            Action: "View, Download, Upload Score"
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

export default SubmittedAssignment;

