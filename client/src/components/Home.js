import React, {useState, useEffect, useContext} from 'react'
import { NavLink } from "react-router-dom";

import { UserContext } from "../App"

const Home = () => {
    const [userData, setUserData] = useState({name:"", email:"", phone:"", message:""});
    

    
    const {state, dispatch} = useContext(UserContext)

    

    const userContact = async () =>{
        try {
            const res = await fetch ('/getdata', {
                method: 'GET',
                headers:{
                    "Content-Type" : "application/json"
                },
            });

            const data = await res.json();
            
            setUserData({...userData, name:data.name, email:data.email, phone:data.phone});


            if(!res.status === 200){
                const error = new Error(res.error);
                throw error;
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
       userContact();
    }, [])

    const handleInputs = (e) =>{
        const name = e.target.name;
        const value = e.target.value;

        setUserData({...userData, [name]:value });
    }

    const sendMessage = async (e) =>{
        e.preventDefault();

        const {name, email, phone, message}= userData;

        const res = await fetch('/contact',{
            method:'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                name, email, phone, message
            })
        });

        const data = await res.json();

        if(!data){
            console.log("Message not sent");
        }
        else{
            alert("Message sent")
            setUserData({...userData, message:""});
        }
    }


    
    const Loginbutton= () =>{
        
        if(state){
            return <div> 
                <button ><NavLink className="btn" to="/signout">Logout</NavLink></button>      
            </div>
        }
        else{
            return <div>  
                    <button ><NavLink className="btn" to="/signin">Login</NavLink></button>
                    
                </div>
        }
    
    }


    return (
        

        <>

        <header className="header">

            <div id="menu-btn" className="fas fa-bars"></div>

            <NavLink className="logo" to="/"> <span>The Wheel</span> Deal </NavLink>
        

            <nav className="navbar">
                <NavLink  to="/">Home</NavLink>
                <NavLink  to="/exploreSaleCars">Explore Cars for Sale</NavLink>
                <NavLink  to="/exploreRentCars">Explore Cars for Rent</NavLink>
                <a href="#services">Services</a>
                <a href="#contact">Contact</a>
            </nav>
            <div id="login-btn">
                    <Loginbutton />
            </div>

        </header> 


        

<section className="home" id="home">

<h3 data-speed="-2" className="home-parallax">Find your car</h3>
<h4 data-speed="-2" className="home-paralla">Travel hassle-free</h4>

<img data-speed="5" className="home-parallax" src="/image/home-img1.png" alt=""/>
<NavLink className="btn" to="/exploreSaleCars">Explore Cars for Sale</NavLink>{" "}
<NavLink className="btn" to="/exploreRentCars">Explore Cars for Rent</NavLink>

</section>

<section className="icons-container">

<div className="icons">
    <i className="fas fa-home"></i>
    <div className="content">
        <h3>7+</h3>
        <p>Branches</p>
    </div>
</div>

<div className="icons">
    <i className="fas fa-car"></i>
    <div className="content">
        <h3>460+</h3>
        <p>Cars sold</p>
    </div>
</div>

<div className="icons">
    <i className="fas fa-users"></i>
    <div className="content">
        <h3>410+</h3>
        <p>Happy clients</p>
    </div>
</div>

<div className="icons">
    <i className="fas fa-car"></i>
    <div className="content">
        <h3>560+</h3>
        <p>New cars</p>
    </div>
</div>

</section>

<section className="services" id="services">

<h1 className="heading"> Our <span>Services</span> </h1>

<div className="box-container">

    <div className="box">
        <i className="fas fa-car"></i>
        <h3>Buy your dream car</h3>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis, nisi.</p>
        <button className="btn"><NavLink to="/buycar">Check Cars</NavLink></button>
    </div>

    <div className="box">
        <i className="fas fa-car"></i>
        <h3>Rent A Car</h3>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis, nisi.</p>
        <button className="btn"><NavLink to="/rentcar">Check Cars</NavLink></button>
    </div>


    <div className="box">
    <i className="fas fa-car"></i>
        <h3>Sale your old car</h3>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis, nisi.</p>
        <button className="btn"><NavLink to="/saleyourcar">Check Cars</NavLink></button>
    </div>

</div>

</section>





<section className="contact" id="contact">

<h1 className="heading"><span>Contact</span> us</h1>

<div className="row">

    {/* <iframe className="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30153.788252261566!2d72.82321484621745!3d19.141690214227783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63aceef0c69%3A0x2aa80cf2287dfa3b!2sJogeshwari%20West%2C%20Mumbai%2C%20Maharashtra%20400047!5e0!3m2!1sen!2sin!4v1632137920043!5m2!1sen!2sin" allowFullScreen="" loading="lazy"></iframe> */}

    <form method="POST">
        <h3>get in touch</h3>
        <input type="text" name="name" value={userData.name} onChange={handleInputs} placeholder="your name" className="box"/>
        <input type="email" name="email" value={userData.email} onChange={handleInputs} placeholder="your email" className="box"/>
        <input type="tel" name="phone" value={userData.phone} onChange={handleInputs} placeholder="your phone" className="box"/>
        <textarea placeholder="your message" name="message" value={userData.message} onChange={handleInputs} className="box" cols="30" rows="10"></textarea>
        <input type="submit" value="send message" onClick={sendMessage} className="btn"/>
    </form>

</div>

</section>

<section className="footer" id="footer">

<div className="box-container">

    <div className="box">
        <h3>Our Branches</h3>
        <a href="#"> <i className="fas fa-map-marker-alt"></i> Dhaka </a>
        <a href="#"> <i className="fas fa-map-marker-alt"></i> Chittagong </a>
        <a href="#"> <i className="fas fa-map-marker-alt"></i> Barisal </a>
        <a href="#"> <i className="fas fa-map-marker-alt"></i> Rajshahi </a>
        <a href="#"> <i className="fas fa-map-marker-alt"></i> Cox's Bazar </a>
    </div>

    <div className="box">
        <h3>Quick Links</h3>
        <a href="#"> <i className="fas fa-arrow-right"></i> Home </a>
        <a href="#"> <i className="fas fa-arrow-right"></i> Vehicles </a>
        <a href="#"> <i className="fas fa-arrow-right"></i> Services </a>
        <a href="#"> <i className="fas fa-arrow-right"></i> Featured </a>
        <a href="#"> <i className="fas fa-arrow-right"></i> Reviews </a>
        <a href="#"> <i className="fas fa-arrow-right"></i> Contact </a>
    </div>

    <div className="box">
        <h3>Contact Info</h3>
        <a href="#"> <i className="fas fa-phone"></i> +8801610698192 </a>
        <a href="#"> <i className="fas fa-phone"></i> +880-234-785 </a>
        <a href="#"> <i className="fas fa-envelope"></i> admin@gmail.com </a>
        <a href="#"> <i className="fas fa-map-marker-alt"></i> Dhaka, Bangladesh - 1229</a>
    </div>

    <div className="box">
        <h3>Contact Info</h3>
        <a href="https://www.facebook.com/maymuna.rukaiya"> <i className="fab fa-facebook-f"></i> Facebook </a>
        <a href="#"> <i className="fab fa-twitter"></i> Twitter </a>
        <a href="#"> <i className="fab fa-instagram"></i> Instagram </a>
        <a href="#"> <i className="fab fa-linkedin"></i> Linkedin </a>
        <a href="#"> <i className="fab fa-pinterest"></i> Pinterest </a>
    </div>

</div>

<div className="credit"> Created by Maymuna Rukaiya || All Rights Reserved </div>

</section>





        </>
    )
    
}



export default Home
