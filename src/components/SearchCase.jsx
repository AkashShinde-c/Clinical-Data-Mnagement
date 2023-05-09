import React, { useEffect, useState } from "react";
import "../CSS/SearchCase.css";
import NewVisit from "./NewVisit";


function PatientTable(props) {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showTable, setShowTable] = useState(true)

  const handleRegistrationNumberClick = (patient) => {
    setSelectedPatient(patient);
    setShowTable(false)
    props.setShowSearch(false)
    console.log(patient.fullName);
  };

  function handleClick(){
    setShowTable(true);
    props.setShowSearch(true)
    setSelectedPatient(null)
  }
  return (
    <>
      {selectedPatient && (
        <div className="newVisitContainer">
          <button onClick={()=>handleClick()} className="backButton">Go Back</button>
          <NewVisit patient={selectedPatient} pdf = {props.pdf} />
        </div>
      )}
      {showTable &&
        (
        <div>
           <div className="newVisit">
        <table>
        <thead>
          <tr>
            <th>Registration Number</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Date of Birth</th>
            <th>Age</th>
            <th>Illness</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {props.patients.map((patient, index) => (
            <tr key={index} onClick={() => handleRegistrationNumberClick(patient)} style={{cursor:'pointer'}}>
              <td >
                {patient.registrationNumber || ""}
              </td>
              <td>{patient.fullName}</td>
              <td>{patient.email}</td>
              <td>{patient.phoneNumber}</td>
              <td>{patient.address}</td>
              <td>{patient.dob}</td>
              <td>{patient.age}</td>
              <td>{patient.illness}</td>
              <td>{patient.gender}</td>
            </tr>
          ))}
        </tbody>
      </table></div>
      </div>
      )
      }
      
    </>
  );
}
export default function SearchCase(props) {
  const [patients, setPatients] = useState([]);
  const [showSearch, setShowSearch] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    handleClick();
  }, []);

  async function handleClick() {
    const data = await window.electronAPI.getPatients();
    setPatients(data);
  }

  function handleSearch(event) {
    setSearchQuery(event.target.value);
  }

  const filteredPatients = patients.filter((patient) =>
    patient.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  async function exportCsv(){
    if(window.electronAPI.convertToCsv()){
      window.alert("Data exported successfully")
    }
  }
  return (
    <>
      <div className="searchContainer">
      {showSearch && (<div className="searchBox">
    <div className="search-box">
      <span>Search </span>
      <input
        type="text"
        placeholder="Enter Name"
        value={searchQuery}
        onChange={handleSearch}
      />
    </div>
    <div className="search-box">
      <span onClick={exportCsv}>Export to CSV </span>
       
    </div>
    <div className="search-box">
      <span onClick={window.electronAPI.importCSV}>Import Spreadsheet</span>
       
    </div>
  </div>)}
       

          <PatientTable patients={filteredPatients} setShowSearch = {setShowSearch} pdf = {props.pdf}/>
         
        <div className="previousVisits"></div>
      </div>
    </>
  );
}
