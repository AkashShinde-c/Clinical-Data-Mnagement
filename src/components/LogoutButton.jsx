import React from 'react'
import '../CSS/LogoutButton.css'
import { useHistory } from 'react-router-dom';


export default function LogoutButton() {
const navigate = useHistory();

function handleLogout(){
    navigate.push("/")
}
    

  return (
    <>
        <div className="mainLogout">
            <div className="button" onClick={handleLogout}>
                Logout
            </div>
        </div>
    </>
  )
}
