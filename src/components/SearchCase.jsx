import React from "react";
import "../CSS/SearchCase.css";

function PatientTable(props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Registration Number</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Address</th>
          <th>Date of Birth</th>
          <th>Illness</th>
          <th>Gender</th>
        </tr>
      </thead>
      <tbody>
        {props.patients.map((patient, index) => (
          <tr key={index}>
            <td>{patient.registrationNumber || ""}</td>
            <td>{patient.fullName}</td>
            <td>{patient.email}</td>
            <td>{patient.phoneNumber}</td>
            <td>{patient.address}</td>
            <td>{patient.dob}</td>
            <td>{patient.illness}</td>
            <td>{patient.gender}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function SearchCase() {
  const [patients, setPatients] = React.useState([]);

  async function handleClick() {
    const data = await window.electronAPI.getPatients();
    setPatients(data);
  }

  return (
    <>
      <div className="searchContainer">
        <div className="searchBox">
          <div className="search-box">
            <span onClick={handleClick}>Search </span>
            <input type="text" placeholder="Enter Name" />
          </div>
        </div>
        <div className="newVisit">
          <PatientTable patients={patients} />
        </div>
        <div className="previousVisits"></div>
      </div>
    </>
  );
}
