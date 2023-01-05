import React from "react"
import MUIDataTable from "mui-datatables";

import {Link} from 'react-router-dom';


const AssignmentList = () => {
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
    name: "Lecturer",
    label: "Lecturer",
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
    { Number: "1",Course: "CSC 401", DateGiven: "24-03-2022 04:30PM", DueDate:  "24-03-2022 04:30PM", Status: "open", Lecturer: "Dr. E. Dayo", Action: "View, Download, Upload Solution"  },
    { Number: "1",Course: "CSC 401", DateGiven: "24-03-2022 04:30PM", DueDate:  "24-03-2022 04:30PM", Status: "open", Lecturer: "Dr. E. Dayo", Action: "View, Download, Upload Solution"  },
    { Number: "1",Course: "CSC 401", DateGiven: "24-03-2022 04:30PM", DueDate:  "24-03-2022 04:30PM", Status: "open", Lecturer: "Dr. E. Dayo", Action: "View, Download, Upload Solution"  },
    { Number: "1",Course: "CSC 401", DateGiven: "24-03-2022 04:30PM", DueDate:  "24-03-2022 04:30PM", Status: "open", Lecturer: "Dr. E. Dayo", Action: "View, Download, Upload Solution"  },
    
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

