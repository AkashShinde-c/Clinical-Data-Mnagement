import React, { useEffect, useState, useRef } from "react";
import "../CSS/ViewAllVisits.css";

export default function ViewAllVisits() {
  const startDateRef = useRef();
  const endDateRef = useRef();

  const [visits, setVisits] = useState([]);
  const [filteredVisits, setFilteredVisits] = useState([]);
  const [allowedDates,setAllowedDates] = useState([]);
  const [isFilter, setIsFilter] = useState(false);

  let no = 0;
  useEffect(() => {
    fetchVisits();
  }, []);

  async function fetchVisits() {
    let data = await window.electronAPI.getAllVisit();
    setVisits(data);
    setFilteredVisits(data);
  }

  function handleIncrement() {
    no += 1;
  }

  function filterVisitsByDate() {
    const start = startDateRef.current.value;
    const end = endDateRef.current.value;
    if (!start || !end) return;
    var dates = [];
    visits.map((visit) => {
        
      visit.visits.map((obj) => {
        if (obj.date >= start && obj.date <= end) dates.push(obj.date);
      });
       
      
    });
    setAllowedDates(dates)
    setIsFilter(true);
  }

  return (
    <>
      <div className="allVisitContainer">
        <div className="filter">
          <span>Filter </span>
          <input type="date" name="" id="" ref={startDateRef} />
          <span> To </span>
          <input type="date" name="" id="" ref={endDateRef} />
          <button onClick={filterVisitsByDate} className="btn">Apply</button>
          <button onClick={()=>setIsFilter(false)} className="btn" style={{ position: 'relative',left:'1rem' }}>Remove</button>
          <button onClick={window.electronAPI.importCSV} className="btn" style={{position: 'relative',left:'1.5rem'}}>Import CSV</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Date</th>
              <th>Patient Name</th>
              <th>Doctor</th>
              <th>Diagnosis</th>
              <th>Medication</th>
            </tr>
          </thead>
          <tbody>
            {isFilter && filteredVisits.map((data, i) =>
              data.visits.map(
                (visData, index) =>
                   allowedDates.includes(visData.date) && (
                    <tr key={index}>
                      <td key={index}>{no + 1}</td>
                      <td>{visData.date}</td>
                      <td>{data.fullName}</td>
                      <td>{visData.doctor}</td>
                      <td>{visData.diagnosis}</td>
                      <td>{visData.medication}</td>
                      {handleIncrement()}
                    </tr>
                  )
              )
            )}
            {!isFilter && filteredVisits.map((data, i) =>
              data.visits.map(
                (visData, index) =>
                  (
                    <tr key={index}>
                      <td key={index}>{no + 1}</td>
                      <td>{visData.date}</td>
                      <td>{data.fullName}</td>
                      <td>{visData.doctor}</td>
                      <td>{visData.diagnosis}</td>
                      <td>{visData.medication}</td>
                      {handleIncrement()}
                    </tr>
                  )
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
