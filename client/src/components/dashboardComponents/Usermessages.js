import React, { useState, useEffect, useContext } from 'react'
import { NavLink } from "react-router-dom";

import { AdminContext } from "../../App"

const Usermessages = () => {

  const { adminState } = useContext(AdminContext)

  const [allMessage, setAllMessage] = useState([]);


  const getallusers = async () => {
    try {
      const res = await fetch('/getavailableusers', {
        method: 'GET',
      });

      const users = await res.json();

      let tmsg = [];
      users.map(user => {
        if (user.messages.length > 0) {
          tmsg.push(user.messages)
        }
      })
      setAllMessage(tmsg)

    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getallusers();
  }, [])





  let messageIdFromDashBoard;
  const deleteMessage = (e) => {
    messageIdFromDashBoard = e.target.id;
      fetch("/deleteMessagefromdashboard", {
        method: "POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          messageIdFromDashBoard
        })
    })
    .then(res => res.json())
    .then(data => {
      if(data.message){
        getallusers()
        alert(data.message)
      }
      else{
        alert(data.error)
      }
    })

  }


  const Loginbutton = () => {

    if (adminState) {
      return <div>
        <button className="logoutbtnDash"><NavLink className="nav-link" to="/adminsignout">logout</NavLink></button>
      </div>
    }
    else {
      return <div>
        <button className="logoutbtnDash"><NavLink className="nav-link" to="/signin">login</NavLink></button>

      </div>
    }
  }


  return (
    <>


      <div className="sidebar">
        <div className="logo-details">
          <i className='bx bxl-c-plus-plus'></i>
          <span className="logo_name">Cars Club</span>
        </div>
        <ul className="nav-links">
          {/* <li className="active"> */}
          <li>
            <NavLink className="dashlinks" to="/dashboard">
              <i className='bx bx-grid-alt' ></i>
              <span className="allLinks_name">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="dashlinks" to="/addcars">
              <i className='bx bx-box' ></i>
              <span className="allLinks_name">Add Cars</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="dashlinks" to="/getsalecarsforadmin">
              <i className='bx bx-box' ></i>
              <span className="allLinks_name">Available SaleCars</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="dashlinks" to="/getrentcarsforadmin">
              <i className='bx bx-box' ></i>
              <span className="allLinks_name">Available RentCars</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="dashlinks" to="/salecarsreports">
              <i className='bx bx-box' ></i>
              <span className="allLinks_name">Sale Cars Income</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="dashlinks" to="/rentcarsreports">
              <i className='bx bx-box' ></i>
              <span className="allLinks_name">Rent Cars Income</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="dashlinks" to="/availableusers">
              <i className='bx bx-box' ></i>
              <span className="allLinks_name">Available Users</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="dashlinks" to="/usermessages">
              <i className='bx bx-box' ></i>
              <span className="allLinks_name">User's Messages</span>
            </NavLink>
          </li>
        </ul>

        <div className="logoutbtnDashDiv">
          <Loginbutton />
        </div>
      </div>



      <section className="home-section">
        <nav>
          <div className="sidebar-button">
            <i className='bx bx-menu sidebarBtn'></i>
            <span className="dashboard">Dashboard</span>
          </div>

          <div className="profile-details">
            {/* <img src="/image/profile.jpg" alt=""/> */}
            <span className="admin_name">Asif Anwar</span>
            <i className='bx bx-chevron-down' ></i>
          </div>
        </nav>




        <div className="salecartableDiv">

          <h1 className="heading"><span>Messages From Users</span></h1>
        </div>

        {allMessage.map((allMessages, index) =>
          <div className="userMessagesli" key={index}>
            <ul>
              {allMessages.map((displayMessage, index) =>

                <li key={displayMessage._id} style={{ wordSpacing: "2px", margin: "10px 0" }} className="d-flex flex-row justify-content-between align-items-center">

                  <span>
                    {displayMessage.name} :- {displayMessage.message}
                  </span>
                  <button className="btn mt-0" id={displayMessage._id} onClick={deleteMessage}>
                    <i id={displayMessage._id} className="fa fa-trash"></i>
                  </button>


                </li>

              )}
            </ul>
          </div>

        )}
      </section>
    </>
  )
}

export default Usermessages
