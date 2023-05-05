import React, { useRef } from 'react'
import '../CSS/LogoutButton.css'
import { useHistory } from 'react-router-dom';


export default function LogoutButton() {
const navigate = useHistory();
const text = useRef();

function handleLogout(){
  console.log("React",text.current.value)
  // window.electronAPI.setTitle(text.current.value)  
  // navigate.push("/")
}
    

  return (
    <>
        <div className="mainLogout">
          <div className="dataInput">
            <input type="text" ref={text} />
          </div>
            <div className="button" onClick={handleLogout}>
                Logout
            </div>
        </div>
    </>
  )
}
