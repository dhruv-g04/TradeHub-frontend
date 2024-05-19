import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
function Signup() {
    const navigate = useNavigate();
    const [signupText, setSignupText] = useState({
        name: "",
        username: "",
        password: ""
    });
    function handleChange(event) {
        const { name, value } = event.target;
        setSignupText((prevvalue) => {
            return {
                ...prevvalue,
                [name]: value
            };
        });
    }
    const register = async (event) => {
        event.preventDefault();
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            };
            const { data } = await axios.post(
                "http://localhost:4000/api/signup", signupText, config
            );
            // console.log(data);
            window.alert(data.message);
            if (data.message === "Registration successful") {
                localStorage.setItem("userInfo", JSON.stringify(data));
                navigate("/");
            }
        } catch (error) {
            if (error.response) {
                const statusCode = error.response.status;
                // console.log("Error status code:", statusCode);
                if (statusCode === 409) {
                    window.alert("User already exists.");
                } else{
                    window.alert("Some Error message");
                    console.log("Error message:", error);
                } 
            } else {
                window.alert("Error Occurred");
                console.log("Error message:", error);
            }
            
        }
        
    };
    return (
        <div>
            <div className="container">
                <img src="/images/login.jpg" alt="Sign Up" />
                <div className="sub-container">
                    <h2>
                        Sign Up
                    </h2>
                    <form >
                        <input
                            onChange={handleChange}
                            name="name"
                            type="text"
                            value={signupText.name}
                            placeholder="Full Name"
                        />
                        <input
                            onChange={handleChange}
                            name="username"
                            type="text"
                            value={signupText.username}
                            placeholder="User Name"
                        />
                        <input
                            onChange={handleChange}
                            name="password"
                            type="password"
                            value={signupText.password}
                            placeholder="Password"
                        />
                        <button type="submit" onClick={register} className="normal">Sign Up</button>
                        <p>Already a member? <a href="/login">Login</a></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;