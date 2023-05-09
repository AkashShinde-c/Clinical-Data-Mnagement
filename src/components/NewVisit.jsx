import React, { useEffect, useRef, useState } from "react";
import "../CSS/NewVisit.css";
import {AiFillFilePdf} from "react-icons/ai";

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
  const rmtRef = useRef();
  const uptRef = useRef();
  const rbsRef = useRef();
  const investigationRef = useRef();
  const procedureRef = useRef();
  const ecgRef = useRef();
  const uristripsRef = useRef();

  const ivRef = useRef();
  const [visits, setVisits] = useState([]);
  const [visitNo, setVisitNo] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [Total, setTotal] = useState(0);
  const [filteredVisits, setFilteredVisits] = useState([]);

  useEffect(() => {
    visitHandle();
  }, []);

  let total = 0;

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
    setFilteredVisits(data);
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
        rmt: rmtRef.current.value,
        upt: uptRef.current.value,
        rbs: rbsRef.current.value,
        investigation: investigationRef.current.value,
        procedure: procedureRef.current.value,
        ecg: ecgRef.current.value,
        uristrips: uristripsRef.current.value,
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
    if (!start || !end) return;
    // Filter the visits array based on the date range
    const filteredVisitsData = visits.filter((visit) => {
      const visitDate = visit.date;
      return visitDate >= start && visitDate <= end;
    });
    setFilteredVisits(filteredVisitsData);
  }

  function calTotal() {
    console.log(rmtRef.current.value)
    setTotal(898);
    console.log(Total)
     total =
      parseInt(rmtRef.current.value) +
      parseInt(uptRef.current.value) +
      parseInt(rbsRef.current.value) +
      parseInt(investigationRef.current.value) +
      parseInt(procedureRef.current.value) +
      parseInt(ecgRef.current.value) +
      parseInt(uristripsRef.current.value);
    console.log(Total)
      setTotal(total)
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
            style={{
              height: "4.5rem",
              textAlign: "left",
              verticalAlign: "top",
            }}
          />
        </div>
        <div className="input-box">
          <div className="feesBox">
            <div className="fees-box">
              <span className="feeDetails">Consulting</span>
              <input
                type="number"
                required
                ref={consultingRef}
                defaultValue={0}
                step="100"
                // onChange={calTotal}
              />
            </div>
            <div className="fees-box">
              <span className="feeDetails">Injection</span>
              <input
                type="number"
                required
                ref={injectionRef}
                defaultValue={0}
                step="100"
                // onChange={calTotal}
              />
            </div>
            <div className="fees-box">
              <span className="feeDetails">IV</span>
              <input
                type="number"
                required
                ref={ivRef}
                defaultValue={0}
                step="100"
                // onChange={calTotal}
              />
            </div>
            <div className="fees-box">
              <span className="feeDetails">RMT</span>
              <input
                type="number"
                required
                ref={rmtRef}
                defaultValue={0}
                step="100"
                // onChange={calTotal}
              />
            </div>
            <div className="fees-box">
              <span className="feeDetails">UPT</span>
              <input
                type="number"
                required
                ref={uptRef}
                defaultValue={0}
                step="100"
                // onChange={calTotal}
              />
            </div>
            <div className="fees-box">
              <span className="feeDetails">RBS</span>
              <input
                type="number"
                required
                ref={rbsRef}
                defaultValue={0}
                step="100"
                // onChange={calTotal}
              />
            </div>
            <div className="fees-box">
              <span className="feeDetails">Investigation</span>
              <input
                type="number"
                required
                ref={investigationRef}
                defaultValue={0}
                step="100"
                // onChange={calTotal}
              />
            </div>
            <div className="fees-box">
              <span className="feeDetails">Procedure</span>
              <input
                type="number"
                required
                ref={procedureRef}
                defaultValue={0}
                step="100"
                // onChange={calTotal}
              />
            </div>
            <div className="fees-box">
              <span className="feeDetails">ECG</span>
              <input
                type="number"
                required
                ref={ecgRef}
                defaultValue={0}
                step="100"
                // onChange={calTotal}
              />
            </div>
            <div className="fees-box">
              <span className="feeDetails">URISTRIPS</span>
              <input
                type="number"
                required
                ref={uristripsRef}
                defaultValue={0}
                step="100"
                // onClick={calTotal}
              />
            </div>
          </div>
        </div>
        <div
          className="input-box"
          style={{
            width: "-webkit-fill-available",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <div className="input-box">
            <button onClick={calTotal}>Total </button>
            <input
              type="number"
              name=""
              id=""
              style={{ marginRight: "0.5rem" }}
              defaultValue={total}
            />
            {Total}
          </div>
          <button
            style={{
              backgroundColor: "green",
              height: "2rem",
              width: "-webkit-fill-available",
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
          <input
            type="date"
            name=""
            id=""
            ref={startDateRef}
            onChange={handleStartDateChange}
          />
          <span> To </span>
          <input
            type="date"
            name=""
            id=""
            ref={endDateRef}
            onChange={handleEndDateChange}
          />
          <button onClick={filterVisitsByDate} className="btn">
            Apply
          </button>
        </div>

        <table>
          <thead style={{ position: "sticky", top: "4rem" }}>
            <tr>
              <th>No</th>
              <th>Doctor</th>
              <th>Diagnosis</th>
              <th>Medication</th>
              <th>Examination</th>
              <th>Date</th>
              <th>Report</th>
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
                <td style={{width:'2rem',cursor:'pointer',}} onClick={props.pdf}><AiFillFilePdf style={{color: 'red',marginLeft:'1rem'}}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NewVisit;
