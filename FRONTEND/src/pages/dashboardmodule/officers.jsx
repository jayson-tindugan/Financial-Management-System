import React from 'react'
import { Link } from "react-router-dom";
import "../../assets/css/global.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Button , Form , Table   } from 'react-bootstrap';
import Header from "../../components/reusable-components/header.jsx";

function officers() {
  return (
    <div>
      <Header />
        <div className="main-content">
            <div className="col1">
                {/* Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/><path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                    </svg>

                {/* Greeting */}
                <h3>Hi <b>Admin</b></h3>

                {/* Org.Name */}
                <div className="orgname">
                    <h3>Builders of Innovative Technologist Society</h3>
                </div>
                {/* Page Buttons */}
                <ButtonGroup style={{ gap:"5px"}}>
                    <Link to="/students">
                        <Button variant="secondary" style={{ background:"#526051", }}>Total Student Page
                        </Button>
                    </Link>
                    <Link to="/moduleadmin">
                        <Button variant="secondary" style={{ background:"#3E433E" }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
                          </svg>
                          Go Back to Dashbaord</Button>
                    </Link>
                    <Link to="/expenses">
                        <Button variant="secondary" style={{ background:"#21401E" }}>Expenses Page</Button>
                    </Link>
                </ButtonGroup>
            </div>
            <div className='col3'>
                <div className='row6'>
                <h1>OFFICERS</h1>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" style={{ color:"#ffffff" }} fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                </svg>
                </div>

                <div className='tb1'>
                
                <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>First Name</th>
                        <th>Student No.</th>
                        <th>Section</th>
                        <th>Contact</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Mark Gacer</td>
                        <td>202010392</td>
                        <td>BSIT-4D</td>
                        <td>09123456789</td>
                        <td>Paid</td>
                      </tr>
                      <tr>
                        <td>NULL</td>
                        <td>NULL</td>
                        <td>NULL</td>
                        <td>NULL</td>
                        <td>NULL</td>
                      </tr>
                      <tr>
                        <td>NULL</td>
                        <td>NULL</td>
                        <td>NULL</td>
                        <td>NULL</td>
                        <td>NULL</td>
                      </tr>
                      <tr>
                        <td>NULL</td>
                        <td>NULL</td>
                        <td>NULL</td>
                        <td>NULL</td>
                        <td>NULL</td>
                      </tr>
                      <tr>
                        <td>NULL</td>
                        <td>NULL</td>
                        <td>NULL</td>
                        <td>NULL</td>
                        <td>NULL</td>
                      </tr>
                    </tbody>
                </Table>
                
                </div>
            </div>
        </div>
    </div>
  )
}

export default officers