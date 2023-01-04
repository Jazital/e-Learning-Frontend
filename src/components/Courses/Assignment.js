import React from 'react'
import "../CSS/Home.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import coursematerial from "../images/Vectorcourses.png"



function Assignment() {
  return (
    <div className='the col-xl-10 col-lg-12 col-sm-12'>
        
        <Card border="light" className='asgn1 main-body-card col-xl-6 col-lg-12 col-sm-12'> 
        <div >
            <div className="centercoursetext">
                    <img className="center-image"
                    src={coursematerial}
                    />
                    <p id="indicator">Open</p>
            </div>

            <div id="firstAssignText">
              <p>

                 <strong> Course: CSC 401 - Human Computer Interaction </strong> <br/>
                  Assigned Date: 25-01-2022 <br/>
                  <strong>Due Date: 30-01-2022</strong> <br/>
                  Lecturer: Dr. Charles A. <br/>
                  Submission Status: <strong id="Red-color"> NOT SUBMITTED </strong>  <br/>
              </p>

            </div>
               <div className="centercoursetext">
               <Button variant="secondary" size="lg">
                  Download Assignment
                </Button>
               </div>
          </div>
          </Card>
            

        <div className='Formdiv main-body-card col-xl-6 col-lg-6 col-sm-12"'>
            <div className="centercoursetext">

            <p>Select or drag and drop your assignment file here to upload</p>
            </div>
              <InputGroup className="mb-3">
              <Form.Control
                placeholder="File"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <Button variant="outline-secondary dark" id="bttn button-addon2">
                Select
              </Button>
            </InputGroup>
        </div>

     </div>
  )
}

export default Assignment