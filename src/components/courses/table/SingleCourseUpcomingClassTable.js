import React from "react"
import MUIDataTable from "mui-datatables";

import {Link} from 'react-router-dom';


const SingleCourseUpcomingClassTable = (props) => {
    if (props.courseID) {
        // A course ID would be passed, so we fetch the upcoming lectures for that course alone
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
        /*{
            name: "LectureURL",
            label: "Lecture URL",
            options: {
                filter: true,
                sort: false,
            }
        },*/
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
            name: "Actions",
            options: {
                filter: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <>
                        <a href="#" className="btn btn-primary">Attend</a>
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
            Platform: "Google Meet",
            // LectureURL: "https://meet.google.com/gtw-3fhk",
            Status: "pending",
            DateTime: "24-03-2022 04:30PM",
            Action: "Attend Lecture"
        },
        {
            Number: "2",
            Course: "CSC 401",
            Platform: "Google Meet",
            // LectureURL: "https://meet.google.com/gtw-3fhk",
            Status: "pending",
            DateTime: "24-03-2022 04:30PM",
            Action: "Attend Lecture"
        },
        {
            Number: "3",
            Course: "CSC 401",
            Platform: "Google Meet",
            // LectureURL: "https://meet.google.com/gtw-3fhk",
            Status: "pending",
            DateTime: "24-03-2022 04:30PM",
            Action: "Attend Lecture"
        }

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

export default SingleCourseUpcomingClassTable;

