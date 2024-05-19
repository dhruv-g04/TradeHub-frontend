import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";

function Sell() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        _id: "",
        name: "",
        username: "",
        wishList: [],
        sellList: []
    });
    const [data, setData] = useState({
        owner: "",
        contact: "",
        address: "",
        pincode: "",
        category: "",
        model: "",
        price: "",
        description: "",
        img: null
    });

    function handleChange(event) {
        const { name, value } = event.target;
        if (name === "img") {
            const imageFile = event.target.files[0];
            setData((prevValue) => {
                return {
                    ...prevValue,
                    [name]: imageFile, // Update the state with the selected image file
                };
            });
        }
        else {
            setData((prevvalue) => {
                return {
                    ...prevvalue,
                    [name]: value
                };
            });
        }
    };

    const callAboutUser = async () => {
        try {
            const res = await fetch(process.env.REACT_APP_BACKEND_URL + "api/aboutuser", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
            });
            const data = await res.json();
            if (data)
                setUser(data);
            else {
                window.alert("Please Login!");
                navigate("/login");
            }
            if (!res.status === 200) {
                window.alert("Please Login!");
                navigate("/login");
                // throw new Error(res.error);
            }
        }
        catch (err) {
            window.alert("Please Login!");
            navigate("/login");
            // console.log(err);
        }
    }

    const addProduct = async (item) => {//To add product in sell list
        const Data = {
            userID: user._id,
            item: item
        }
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                    // ,Authorization: `Bearer ${tokens}`
                }
            };

            await axios.post(
                process.env.REACT_APP_BACKEND_URL + "api/product/selllist", Data, config
            );

            // window.alert("Product has been added to sell list");

        } catch (error) {
            navigate("/login");
            // console.log(error.response.data);
        }

    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        callAboutUser();
        try {
            const response = await axios.post(process.env.REACT_APP_BACKEND_URL + 'api/product/sell', data, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                await addProduct(response.data.item);
                alert(response.data.message);
            }
            window.location.reload();
        } catch (error) {
            // console.log('Error uploading data:', error);
            alert('Fill all required fields');
        };
    };
    const confirmAdd = (event) => {
        if (window.confirm("Press OK to confirm")) {
            handleSubmit(event);
        }
    }
    useEffect(() => {
        callAboutUser();
    }, []);
    return (
        <section>
            <Header />
            <section id="form-details" className="section-p1">
                <div className="proHead">
                    <h2>#sell_it</h2>
                </div>
                <div className="Box">
                    <form>
                        <p style={{ color: 'red', fontWeight: 'bold' }}>*Required Feild</p>
                        <h4>Personal Details</h4>
                        <input type="text" name="owner" placeholder="*Owner's Name" onChange={handleChange} value={data.owner} required></input>
                        <input type="tel" name="contact" placeholder="*Contact No." pattern="[0-9]{10}" maxLength="10" onChange={handleChange} value={data.contact} required></input>
                        <input type="text" name="address" placeholder="Address" onChange={handleChange} value={data.address}></input>
                        <input type="text" name="pincode" placeholder="Pincode" pattern="[0-9]{6}" maxLength="6" onChange={handleChange} value={data.pincode}></input>

                        <h4>Product Details</h4>
                        <input type="text" name="category" placeholder="*Category" onChange={handleChange} value={data.category} required></input>
                        <input type="text" name="model" placeholder="*Model" onChange={handleChange} value={data.model} required></input>
                        <input type="number" name="price" placeholder="*Price (in Rs)" onChange={handleChange} value={data.price} required></input>
                        <textarea type="text" name="description" rows="4" cols="65%" placeholder="Description" onChange={handleChange} value={data.description}></textarea>
                        <label htmlFor="file-input">*Select an Image</label>
                        <input
                            type="file"
                            id="file-input"
                            accept="image/*"
                            name="img"
                            onChange={handleChange}
                        />
                        <button onClick={confirmAdd} className="normal">Submit</button>
                    </form>
                    <img src="/images/sell_it.png" alt="Deal" />
                </div>
            </section>
            <Footer />
        </section>
    )
}

export default Sell;