import React from 'react'
import "../../CSS/Home.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import coursematerial from "../images/Vectorcourses.png"



function Upload_Assignment() {
  return (
    <div className='the col-xl-10 col-lg-12 col-sm-12'>
        
        <div className='Formdiv main-body-card col-xl-9 col-lg-9 col-sm-12"'>
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

            <div className="centercoursetext">
               <Button variant="secondary" size="lg">
                  Upload Assignment
                </Button>
               </div>
        </div>

     </div>
  )
}

export default Upload_Assignment