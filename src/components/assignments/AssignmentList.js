import React from "react"
import MUIDataTable from "mui-datatables";

import {Link} from 'react-router-dom';


const AssignmentList = () => {
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
            name: "DateGiven",
            label: "Date Given",
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
            name: "Action",
            label: "Action",
            options: {
                filter: true,
                sort: true,
            }
        },
    ];


    const data = [
        {
            Number: "1",
            Course: "CSC 401",
            DateGiven: "24-03-2022 04:30PM",
            DueDate: "24-03-2022 04:30PM",
            Status: "open",
            Lecturer: "Dr. E. Dayo",
            Action: "View, Download, Upload Solution"
        },
        {
            Number: "2",
            Course: "CSC 401",
            DateGiven: "24-03-2022 04:30PM",
            DueDate: "24-03-2022 04:30PM",
            Status: "open",
            Lecturer: "Dr. E. Dayo",
            Action: "View, Download, Upload Solution"
        },
        {
            Number: "3",
            Course: "CSC 401",
            DateGiven: "24-03-2022 04:30PM",
            DueDate: "24-03-2022 04:30PM",
            Status: "open",
            Lecturer: "Dr. E. Dayo",
            Action: "View, Download, Upload Solution"
        },
        {
            Number: "4",
            Course: "CSC 401",
            DateGiven: "24-03-2022 04:30PM",
            DueDate: "24-03-2022 04:30PM",
            Status: "open",
            Lecturer: "Dr. E. Dayo",
            Action: "View, Download, Upload Solution"
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

