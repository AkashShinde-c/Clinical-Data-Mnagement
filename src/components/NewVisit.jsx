import React, { useEffect, useRef, useState } from "react";
import "../CSS/NewVisit.css";

function NewVisit(props) {
  const dateRef = useRef();
  const doctorRef = useRef();
  const diagnosisRef = useRef();
  const medicationRef = useRef();
  const examinationRef = useRef();
  const consultingRef = useRef();
  const injectionRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();

  const ivRef = useRef();
  const [visits, setVisits] = useState([]);
  const [visitNo, setVisitNo] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredVisits, setFilteredVisits] = useState([]);

  useEffect(() => {
    visitHandle();
  }, []);

  const handleStartDateChange = () => {
    setStartDate(startDateRef.current.value);
  };
  
  const handleEndDateChange = () => {
    setEndDate(endDateRef.current.value);
  };
  

  async function visitHandle() {
    const data = await window.electronAPI.getVisit(
      props.patient.registrationNumber
    );
    setVisitNo(data.length + 1);
    
    setVisits(data);
    setFilteredVisits(data)
  }

  const handleSave = () => {
    if (doctorRef.current.value) {
      const visitData = {
        regNo: props.patient.registrationNumber,
        date: dateRef.current.value,
        doctor: doctorRef.current.value,
        diagnosis: diagnosisRef.current.value,
        medication: medicationRef.current.value,
        examination: examinationRef.current.value,
        consulting: consultingRef.current.value,
        injection: injectionRef.current.value,
        iv: ivRef.current.value,
      };
      
      if (window.electronAPI.addVisit(visitData)) {
        window.alert("Visit added successfully");
      } else {
        window.alert("Unknown error occured");
      }
    } else {
      window.alert("All fields are required");
    }
  };

  function filterVisitsByDate() {
    // Convert the start and end dates to Date objects
    const start = startDateRef.current.value;
    const end = endDateRef.current.value;
     if(!start||!end)return;
    // Filter the visits array based on the date range
    const filteredVisitsData = visits.filter((visit) => {
      const visitDate = visit.date;
      return visitDate >= start && visitDate <= end;
    });
     setFilteredVisits(filteredVisitsData)
    
  }
  

  return (
    <div className="newVisitContainer">
      <div className="table">
        <div className="regNo">{props.patient.registrationNumber}</div>
        <div className="pName">{props.patient.fullName}</div>
        <div className="pIll">{props.patient.illness} </div>
      </div>
      {/* <p>Registration Number: </p>
      <p>Name: </p>
      <p>Illness: </p> */}
      <div className="addVisit">
        <div className="input-box">
          <span className="details">Visit No </span>
          {/* <input type="text" placeholder="Enter Address" required /> */}
          <span style={{ backgroundColor: "skyblue" }}>{visitNo}</span>
        </div>

        <div className="input-box">
          <span className="details">Date</span>
          <input
            type="date"
            required
            ref={dateRef}
            defaultValue={new Date().toISOString().substr(0, 10)}
          />
        </div>
        <div className="input-box">
          <span className="details">Docter</span>
          <input type="text" required ref={doctorRef} />
        </div>
        <div className="input-box">
          <span className="details">Diagnosis</span>
          <input type="text" required ref={diagnosisRef} />
        </div>
        <div className="input-box">
          <span className="details">Medication</span>
          <input type="text" required ref={medicationRef} />
        </div>
        <div className="input-box" style={{ marginTop: "1rem" }}>
          <span className="details">Examination</span>
          <input
            type="text"
            ref={examinationRef}
            required
            style={{ height: "5rem", textAlign: "left", verticalAlign: "top" }}
          />
        </div>
        <div className="input-box">
          <div className="feesBox">
            <div className="fees-box">
              <span className="feeDetails">Consulting</span>
              <input type="text" required ref={consultingRef} />
            </div>
            <div className="fees-box">
              <span className="feeDetails">Injection</span>
              <input type="text" required ref={injectionRef} />
            </div>
            <div className="fees-box" style={{ marginTop: ".5rem" }}>
              <span className="feeDetails">IV</span>
              <input type="text" required ref={ivRef} />
            </div>
          </div>
        </div>
        <div className="input-box">
          <button
            style={{
              backgroundColor: "green",
              height: "3rem",
              width: "6rem",
              color: "white",
              fontWeight: "bold",
              borderRadius: "6px",
            }}
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>

      <div className="tableContainer">
        <div className="filter">
          <span>Filter </span>
          <input type="date" name="" id="" ref={startDateRef} onChange={handleStartDateChange}/>
          <span> To </span>
          <input type="date" name="" id="" ref={endDateRef} onChange={handleEndDateChange}/>
          <button onClick={filterVisitsByDate} className="btn">Apply</button>
        </div>

        <table>
          <thead style={{position:'sticky',top:'4rem'}}>
            <tr>
              <th>No</th>
              <th>Doctor</th>
              <th>Diagnosis</th>
              <th>Medication</th>
              <th>Examination</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredVisits.map((data, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.doctor}</td>
                <td>{data.diagnosis}</td>
                <td>{data.medication}</td>
                <td>{data.examination}</td>
                <td>{data.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NewVisit;
