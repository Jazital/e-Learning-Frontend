import React from "react"
import MUIDataTable from "mui-datatables";

import {Link} from 'react-router-dom';


const VirtualClassroomTable = () => {
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
            name: "Platform",
            label: "Platform",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "LectureURL",
            label: "Lecture URL",
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
            name: "DateTime",
            label: "Date & Time",
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
            Course: "CSC 401",
            Platform: "Google Meet",
            LectureURL: "https://meet.google.com/gtw-3fhk",
            Status: "pending",
            DateTime: "24-03-2022 04:30PM",
            Action: "Attend"
        },
        {
            Number: "2",
            Course: "BCH 302",
            Platform: "Google Meet",
            LectureURL: "https://meet.google.com/gtw-3fhk",
            Status: "pending",
            DateTime: "24-03-2022 04:30PM",
            Action: "Attend"
        },
        {
            Number: "3",
            Course: "POL 204",
            Platform: "Google Meet",
            LectureURL: "https://meet.google.com/gtw-3fhk",
            Status: "pending",
            DateTime: "24-03-2022 04:30PM",
            Action: "Attend"
        },
        {
            Number: "4",
            Course: "GST 302",
            Platform: "Google Meet",
            LectureURL: "https://meet.google.com/gtw-3fhk",
            Status: "pending",
            DateTime: "24-03-2022 04:30PM",
            Action: "Attend"
        },
        {
            Number: "5",
            Course: "ECO 301",
            Platform: "Google Meet",
            LectureURL: "https://meet.google.com/gtw-3fhk",
            Status: "pending",
            DateTime: "24-03-2022 04:30PM",
            Action: "Attend"
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

export default VirtualClassroomTable;

