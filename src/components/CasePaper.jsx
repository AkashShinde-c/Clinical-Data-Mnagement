import { React, useRef } from "react";
import "../CSS/CasePaper.css";

export default function CasePaper() {
  const fullNameRef = useRef();
  const emailRef = useRef();
  const phoneNumberRef = useRef();
  const addressRef = useRef();
  const dobRef = useRef();
  const illnessRef = useRef();
  const genderRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    const registrationNumber = localStorage.getItem("registrationNumber") || 1000;
    const formData = {
      registrationNumber: registrationNumber,
      fullName: fullNameRef.current.value,
      email: emailRef.current.value,
      phoneNumber: phoneNumberRef.current.value,
      address: addressRef.current.value,
      dob: dobRef.current.value,
      illness: illnessRef.current.value,
      gender: genderRef.current.value,
      visits:[]
    };
    localStorage.setItem("registrationNumber", parseInt(registrationNumber) + 1);
    console.log(formData);
    const res = window.electronAPI.setTitle(formData)
    if(res){
      window.alert("Registration succesful")
    } 
  }

  return (
    <>
      <div className="container">
        <div className="title">Registration</div>
        <div className="content">
          <form onSubmit={handleSubmit}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Full Name</span>
                <input type="text" placeholder="Enter name" ref={fullNameRef} required />
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input type="text" placeholder="Enter email" ref={emailRef} />
              </div>
              <div className="input-box">
                <span className="details">Phone Number</span>
                <input type="text" placeholder="Enter number" ref={phoneNumberRef} required />
              </div>
              <div className="input-box">
                <span className="details">Address</span>
                <input type="text" placeholder="Enter Address" ref={addressRef} required />
              </div>
              <div className="input-box">
                <span className="details">Date of Birth</span>
                <input type="date" ref={dobRef} required />
              </div>
              <div className="input-box">
                <span className="details">Illness</span>
                <input
                  type="text"
                  placeholder="Describe the illness briefly"
                  ref={illnessRef}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Gender</span>
                <select name="gender" ref={genderRef} required>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="button">
              <input type="submit" value="Register" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
