import React, { useState } from "react";
import "../CSS/Dashboard.css";
import CasePaper from "./CasePaper";
import SearchCase from "./SearchCase";
import { useHistory } from "react-router-dom";
import ViewAllVisits from "./ViewAllVisits";
import UpdateBiodata from "./UpdateBiodata";
import GeneratePDF from "./GeneratePDF";

export default function Dashboard() {
  const navigate = useHistory();
  const [showCasePaper, setShowCasePaper] = useState(false);
  const [showSearchCase, setShowSearchCase] = useState(false);
  const [showAllVisits, setShowAllVisits] = useState(false);
  const [showBiodata, setShowBiodata] = useState(false);
  const [showPDF, setShowPDF] = useState(false);

  function handleNewCase() {
    setShowCasePaper(true);
    setShowSearchCase(false);
    setShowAllVisits(false);
    setShowBiodata(false);
    setShowPDF(false);
  }

  function handleSearchCase() {
    setShowCasePaper(false);
    setShowSearchCase(true);
    setShowAllVisits(false);
    setShowBiodata(false);
    setShowPDF(false);
  }

  function handleViewAllVisits() {
    setShowCasePaper(false);
    setShowSearchCase(false);
    setShowAllVisits(true);
    setShowBiodata(false);
    setShowPDF(false);
  }
  function handleUpdateBiodata() {
    setShowCasePaper(false);
    setShowSearchCase(false);
    setShowAllVisits(false);
    setShowBiodata(true);
    setShowPDF(false);
  }
  function handleShowPDF() {
    setShowCasePaper(false);
    setShowSearchCase(false);
    setShowAllVisits(false);
    setShowBiodata(false);
    setShowPDF(true);
  }

  function handleLogout() {
    navigate.push("/");
  }

  return (
    <>
      <div className="mainDashboard">
        <div className="leftPart">
          <div className="dashboardButton" onClick={handleNewCase}>
            New Case{" "}
          </div>
          <div className="dashboardButton" onClick={handleSearchCase}>
            Search Case
          </div>
          <div className="dashboardButton" onClick={handleViewAllVisits}>
            View All Visits
          </div>
          <div className="dashboardButton" onClick={handleUpdateBiodata}>
          Update Biodata
          </div>
          <div className="dashboardButton" onClick={handleShowPDF}>Delete Case</div>
          <div className="dashboardButton" onClick={handleLogout}>
            Log-Out
          </div>
        </div>
        <div className="rightPart">
          {showCasePaper && <CasePaper></CasePaper>}
          {showSearchCase && <SearchCase pdf = {handleShowPDF}></SearchCase>}
          {showAllVisits && <ViewAllVisits></ViewAllVisits>}
          {showBiodata && <UpdateBiodata></UpdateBiodata>}
          {showPDF && <GeneratePDF></GeneratePDF>}
        </div>
      </div>
    </>
  );
}
