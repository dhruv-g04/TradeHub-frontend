import React, { useEffect } from "react";
import axios from 'axios';
import { Link,useNavigate } from "react-router-dom";
import { BsBagHeart, BsPerson } from "react-icons/bs";
function Heading() {
    const [show, setShow] = React.useState(false);
    const navigate = useNavigate();
    const callAboutUser = async () => {
        // event.preventDefault();
        try {
            const res = await fetch(process.env.REACT_APP_BACKEND_URL + "api/aboutuser", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
            });
            const data = await res.json();
            if(data)
                setShow(true);

            if (!res.status === 200) {
                throw new Error(res.error);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    const logout = async (event) => {
        event.preventDefault();
        try {
            const config = {
                withCredentials: true, // Include credentials (cookies) in the request
              };
          await axios.get(process.env.REACT_APP_BACKEND_URL + "api/logout", config);
          localStorage.removeItem("userInfo");
          window.alert("Logout Successfully");
          setShow(false);
          navigate("/login");
        } catch (error) {
          window.alert("Error Occurred");
          console.log("Error message:", error);
        }
      };

    useEffect(() => {
        callAboutUser();
    }, []);

    return (
        <section id="header">
            {/* <a id="logo" href="/"><h3><img src="images\T logo.png"/> radeHub</h3></a> */}
            <a id="logo" href="/"><h3><img src="images\TradeHub logo.png"/></h3></a>
            <div>
                <ul id="navbar">

                    <li><Link to="/" aria-current="page">Home</Link></li>
                    <li><Link to="/allproduct" aria-current="page">All Products</Link></li>
                    <li><Link to="/sell">Sell</Link></li>
                    {show ? <>
                        <li onClick={logout}>
                            <Link>
                            Logout
                            </Link>
                        </li>
                    </> : <>
                        <li><Link to="/login" >Login</Link></li>
                        <li><Link to="/signup">Sign Up</Link></li>
                    </>}
                    <li><Link to="/wishlist" ><BsBagHeart /></Link></li>
                    <li><Link to="/aboutuser" ><BsPerson /></Link></li>
                </ul>
            </div>
        </section>
    )
}

export default Heading;