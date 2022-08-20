import React, {useEffect, useContext} from 'react';
import "../dashboard.css";
import {NavLink, useHistory} from "react-router-dom";

import { AdminContext } from "../App"


const Dashboard = () => {

  const {adminState, dispatchadmin} = useContext(AdminContext)

  const history = useHistory();

  const callDashboard =  async () =>{
      try {
          const res = await fetch('/dashboard', {
            method: "GET",
            headers: {
              Accept : "application/json",
              "Content-Type" : "application/json"
            },
            credentials: "include"
          });

          const data = await res.json();

          if(!res.status === 200){
            const error = new Error(res.error);
            throw error;
          }

      } catch (error) {
        console.log(error)
        history.push("/signin");
      }
  }


  useEffect(() => {
    callDashboard();
  }, [])



const Loginbutton= () =>{
        
  if(adminState){
      return <div> 
          <button className="logoutbtnDash"><NavLink  to="/adminsignout">Logout</NavLink></button>      
      </div>
  }
  else{
      return <div>  
              <button className="logoutbtnDash"><NavLink  to="/signin">Login</NavLink></button>
              
          </div>
  }
}



    return (
        <>

  <div className="sidebar">
    <div className="logo-details">
      <i className='bx bxl-c-plus-plus'></i>
      <span className="logo_name">The Wheel Deal</span>
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
            <span className="allLinks_name">Available Sale Cars</span>
            </NavLink>
        </li>
        <li>
            <NavLink className="dashlinks" to="/getrentcarsforadmin">
            <i className='bx bx-box' ></i>
            <span className="allLinks_name">Available Rent Cars</span>
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
        <Loginbutton/>
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
        <span className="admin_name">Admin</span>
        <i className='bx bx-chevron-down' ></i>
      </div>
    </nav>
    <div className="home-content" style={{textAlign:"center"}}>
      <h1>WELCOME TO DASHBOARD</h1><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <h3>~You are now in the Admin Panel of The Wheel Deal~</h3><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <h3>To access the features of Admin, click on the sections in the Sidebar </h3><br/><br/>
      <h3>Before making any changes, check multiple times as you won't be able to recover it afterwards</h3><br/><br/>
      <h3>Customers Feedback is in User's Messages</h3><br/><br/>
      </div>

  </section>



        </>
    )
}

export default Dashboard
