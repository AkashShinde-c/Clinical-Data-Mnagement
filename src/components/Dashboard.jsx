import React, { useState } from "react";
import "../CSS/Dashboard.css"
import CasePaper from "./CasePaper";
import SearchCase from "./SearchCase";
import { useHistory } from 'react-router-dom';
import ViewAllVisits from "./ViewAllVisits";

export default function Dashboard() {
  const navigate = useHistory();
  const [showCasePaper, setShowCasePaper] = useState(false);
  const [showSearchCase, setShowSearchCase] = useState(false);
  const [showAllVisits, setShowAllVisits] = useState(false);

  function handleNewCase(){
    setShowCasePaper(true);
    setShowSearchCase(false);
    setShowAllVisits(false);
  }

  function handleSearchCase(){
    setShowCasePaper(false);
    setShowSearchCase(true);
    setShowAllVisits(false);
  }

  function handleViewAllVisits(){
    setShowCasePaper(false);
    setShowSearchCase(false);
    setShowAllVisits(true);
  }

  function handleLogout(){
    navigate.push("/");
  }

  return (
    <>
      <div className="mainDashboard">
        <div className="leftPart">
          <div className="dashboardButton" onClick={handleNewCase}>New Case </div>
          <div className="dashboardButton" onClick={handleSearchCase}>Search Case</div>
          <div className="dashboardButton" onClick={handleViewAllVisits}>View All Visits</div>
          <div className="dashboardButton">Delete Case</div>
          <div className="dashboardButton" onClick={handleLogout}>Log-Out</div>
        </div>
        <div className="rightPart">
        {showCasePaper && (
          
            <CasePaper></CasePaper>
         
        )}
        {showSearchCase && (
          
          <SearchCase></SearchCase>
       
      )}
      {showAllVisits && (<ViewAllVisits></ViewAllVisits>)}
         </div>
      </div>
    </>
  );
}
