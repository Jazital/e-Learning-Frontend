import React from "react"
import MUIDataTable from "mui-datatables";

import {Link} from 'react-router-dom';


const CourseReg = () => {
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
    name: "Units",
    label: "Units",
    options: {
    filter: true,
    sort: false,
    }
    },
    {
    name: "Course_Code",
    label: "Course Code",
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
     

    ];

    const re = "registered"; 
   
    const data = [
    { Number: "1",Course: "Introduction to Computer", Units: "4", Course_Code:  "CSC 101", Status: re },
    { Number: "2",Course: "Introduction to Computer", Units: "4", Course_Code:  "CSC 101", Status: re  },
    { Number: "3",Course: "Introduction to Computer", Units: "4", Course_Code:  "CSC 101", Status: re  },
    { Number: "4",Course: "Introduction to Computer", Units: "4", Course_Code:  "CSC 101", Status: re  },
    
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

export default CourseReg;

