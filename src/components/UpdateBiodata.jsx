import React, { useEffect, useState, useRef} from "react";
import "../CSS/SearchCase.css";
import NewVisit from "./NewVisit";


function PatientTable(props) {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showTable, setShowTable] = useState(true)
  const [index, setIndex] = useState(0)
  const fullNameRef = useRef();
  const emailRef = useRef();
  const phoneNumberRef = useRef();
  const addressRef = useRef();
  const dobRef = useRef();
  const ageRef = useRef();
  const illnessRef = useRef();
  const genderRef = useRef();

  const handleRegistrationNumberClick = (patient,index) => {
    setSelectedPatient(patient);
    setShowTable(false)
    props.setShowSearch(false)
    setIndex(index)
     
  };

  function handleSubmit(event) {
    event.preventDefault();
    if( phoneNumberRef.current.value>9999999999||phoneNumberRef.current.value<1000000000)
    {
      window.alert("Invalid Phone number...!")
      return
    }
    const data = {formData:{
      registrationNumber: selectedPatient.registrationNumber,
      fullName: fullNameRef.current.value,
      email: emailRef.current.value,
      phoneNumber: phoneNumberRef.current.value,
      address: addressRef.current.value,
      age:ageRef.current.value,
      dob: dobRef.current.value,
      illness: illnessRef.current.value,
      gender: genderRef.current.value,
      visits:selectedPatient.visits
    },index:index};
     
     
    const res = window.electronAPI.updatePatient(data)
    if(res){
      window.alert("Data updated succesful")
      console.log(res)
    } 
  }

  function handleClick(){
    setShowTable(true);
    props.setShowSearch(true)
    setSelectedPatient(null)
  }
  return (
    <>
      {selectedPatient && (
        <>
         
          <button onClick={()=>handleClick()} className="backButton">Go Back</button>
            <div className="container">
        <div className="title">Registration</div>
        <div className="content">
          <form onSubmit={handleSubmit}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Full Name</span>
                <input type="text" placeholder="Enter name" ref={fullNameRef}  defaultValue={selectedPatient.fullName} required />
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input type="text" placeholder="Enter email" ref={emailRef}   defaultValue={selectedPatient.email}/>
              </div>
              <div className="input-box">
                <span className="details">Phone Number</span>
                <input type="number" placeholder="Enter number" ref={phoneNumberRef}   defaultValue={selectedPatient.phoneNumber} required />
              </div>
              <div className="input-box">
                <span className="details">Address</span>
                <input type="text" placeholder="Enter Address" ref={addressRef}  defaultValue={selectedPatient.address} required />
              </div>
              <div className="input-box">
                <span className="details">Date of Birth</span>
                <input type="date" ref={dobRef}  defaultValue={selectedPatient.dob} required />
              </div>
              <div className="input-box">
                <span className="details">Age</span>
                <input type="text" ref={ageRef}  defaultValue={selectedPatient.age} required />
              </div>
              <div className="input-box">
                <span className="details">Illness</span>
                <input
                  type="text"
                  placeholder="Describe the illness briefly"
                  ref={illnessRef}
                  defaultValue={selectedPatient.illness}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Gender</span>
                <select name="gender" ref={genderRef}  defaultValue={selectedPatient.gender.toLowerCase()} required>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="button">
              <input type="submit" value="Save" />
            </div>
          </form>
        </div>
      </div>
       
        </>
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
            <tr key={index}>
              <td onClick={() => handleRegistrationNumberClick(patient,index)}>
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
export default function UpdateBiodata() {
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
  </div>)}
          <PatientTable patients={filteredPatients} setShowSearch = {setShowSearch} />
         
        <div className="previousVisits"></div>
      </div>
    </>
  );
}
