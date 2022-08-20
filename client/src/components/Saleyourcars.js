import React, {useState, useEffect, useContext} from 'react'
import { NavLink } from "react-router-dom";

import { UserContext } from "../App"

const Saleyourcars = () => {

    const {state, dispatch} = useContext(UserContext)


    const Loginbutton= () =>{
        
        if(state){
            return <div> 
                <button className="btn"><NavLink className="nav-link" to="/signout">Logout</NavLink></button>      
            </div>
        }
        else{
            return <div>  
                    <button className="btn"><NavLink className="nav-link" to="/signin">Login</NavLink></button>
                    
                </div>
        }
    
    }


    return (
        <>

            <header className="header">
            <div id="menu-btn" className="fas fa-bars"></div>
            <NavLink className="logo" to="/"> <span>The Wheel Deal</span> </NavLink>

            <nav className="navbar">
                <NavLink  to="/">Home</NavLink>
                <NavLink to="/buycar">Sale Cars</NavLink>
                <NavLink to="/rentcar">Rent Cars</NavLink>
            </nav>
            <div id="login-btn">
                <Loginbutton />
            </div>
            </header>

        <div className='salecartMaindiv'>
            <h1 style={{marginTop: "250px", textAlign:"center", color:"white", fontSize:"100px"}}>Coming Soon!</h1>
        </div>
        </>
    )
}

export default Saleyourcars