import React, { useState } from "react";
import "../CSS/Dashboard.css";
import CasePaper from "./CasePaper";
import SearchCase from "./SearchCase";
import { useHistory } from "react-router-dom";
import ViewAllVisits from "./ViewAllVisits";
import UpdateBiodata from "./UpdateBiodata";
import GeneratePDF from "./GeneratePDF";
import {BsPersonFillAdd} from 'react-icons/bs'
import {FaSearchPlus} from 'react-icons/fa'
import {FaUserEdit} from 'react-icons/fa'
import {RiLogoutBoxRFill} from 'react-icons/ri'
import {RiDeleteBin6Fill} from 'react-icons/ri'
import {AiOutlineFolderView} from 'react-icons/ai'

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
          <h1><BsPersonFillAdd onClick={handleNewCase} style={{cursor:'pointer'}} className="dashboardButton"/></h1> 
          <span style={{color:'white', fontSize:'.8rem',marginTop:'-.9rem'}}>Registration</span>
          {/* <div className="dashboardButton" >
            New Case{" "}
          </div> */}
          <h1><FaSearchPlus className="dashboardButton" onClick={handleSearchCase}/></h1>
          <span style={{color:'white',fontSize:'.8rem',marginTop:'-.9rem'}}>Search</span>
          {/* <div className="dashboardButton" >
            Search Case
          </div> */}
          <h1><AiOutlineFolderView onClick={handleViewAllVisits} className="dashboardButton"/></h1>
          <span style={{color:'white',fontSize:'.8rem',marginTop:'-.9rem'}}>View visits</span>
          {/* <div className="dashboardButton" >
            View All Visits
          </div> */}
          <h1><FaUserEdit className="dashboardButton" onClick={handleUpdateBiodata}/></h1>
          <span style={{color:'white',fontSize:'.8rem',marginTop:'-.9rem'}}>Edit Patient</span>
          {/* <div className="dashboardButton" >
          Update Biodata
          </div> */}
          <h1><RiDeleteBin6Fill  className="dashboardButton"/></h1>
          <span style={{color:'white',fontSize:'.8rem',marginTop:'-.9rem'}}>Delete Patient</span>
          {/* <div className="dashboardButton" onClick={handleShowPDF}>Delete Case</div> */}
          <h1><RiLogoutBoxRFill className="dashboardButton"  onClick={handleLogout}/></h1>
          <span style={{color:'white',fontSize:'.8rem',marginTop:'-.9rem'}}>Logout</span>
          {/* <div className="dashboardButton" >
            Log-Out
          </div> */}
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
