import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
    const navigate = useNavigate();
    const [loginText, setLoginText] = React.useState({
        username: "",
        password: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setLoginText((prevvalue) => {
            return {
                ...prevvalue,
                [name]: value
            };
        });
    }
    // \\\\\\\\\\\\\\\\\/
    const clickLogin = async (event) => {
        event.preventDefault();
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            };
            const { data } = await axios.post(
                "http://localhost:4000/api/login",
                loginText,
                config
            );
            if (data.error) {
                window.alert(data.error);
            } else {
                localStorage.setItem("userInfo", JSON.stringify(data));
                window.alert("Login successful");
                navigate("/");
            }
        } catch (error) {
            const statusCode = error.response.status;
            if (statusCode === 401) {
                window.alert("Invalid Username or Password");
            }
            else {
                alert("Error occurred");
                console.log(error);
            }
        }
    };
    return (
        <div>
            <div className="container">
                <img src="/images/login4.png" alt="No img available" />
                <div className="sub-container">
                    <h2>
                        Login
                    </h2>
                    <form >
                        <input
                            onChange={handleChange}
                            name="username"
                            type="text"
                            value={loginText.username}
                            placeholder="User Name"
                        />
                        <input
                            onChange={handleChange}
                            name="password"
                            type="password"
                            value={loginText.password}
                            placeholder="Password"
                        />
                        <button onClick={clickLogin} className="normal">Login</button>
                    </form>
                    <p>Not a member? <a href="/signup">Sign Up</a> Now</p>
                </div>
            </div>
        </div>
    )
}

export default Login;