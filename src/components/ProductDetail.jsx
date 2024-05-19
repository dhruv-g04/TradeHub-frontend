import React, { useEffect, useState, } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import { LuIndianRupee } from "react-icons/lu"

function ProductDetail() {
    const navigate = useNavigate();
    const param = useParams();
    const productId = param.productId;
    // console.log(productId);
    const [productData, setProductData] = useState({});
    const [tokens, setToken] = useState();
    const [userID, setUserID] = useState();


    const selectedProduct = async () => {
        try {
            const res = await axios.get(process.env.REACT_APP_BACKEND_URL + `api/product/products_by_id?id=${productId}`);
            const product = res.data;
            setProductData(product.data[0]);
            setProductData((state) => {
                return state;
            });

            if (res.status !== 200) {
                throw new Error(res.error);
            }
        }
        catch (err) {
            console.log(err);
        }
    }


    const submitProduct = async (event) => {
        event.preventDefault();
        const user = JSON.parse(localStorage.getItem('userInfo'));
        if (!user) {
            window.alert("Please Login!");
            navigate("/login");

        } else {
            setUserID(user._id);
            setToken(user.token);
            const Data = {
                userID: userID,
                item: productData
            }
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json"
                        // ,Authorization: `Bearer ${tokens}`
                    }
                };

                const resp=await axios.post(
                    process.env.REACT_APP_BACKEND_URL + "api/product/cart", Data, config
                );

                window.alert(resp.data.message);

            } catch (error) {
                navigate("/login");
                console.log(error.response.data);
            }
        };
    }
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userInfo'));
        if (user) {
            setUserID(user._id);
            setToken(user.token);
        }
        selectedProduct();
    }, []);
    return (
        <section id="single-pro">
            <Header />
            <div id="prodetails" className="section-p1">
                <div className="single-pro-img">
                    <img src={process.env.PUBLIC_URL + "/uploads/" + (productData.imageFilePath ? productData.imageFilePath : "no-img.png")} id="main-img" alt="Product" />
                </div>
                <div className="single-pro-details">
                    <div className="name">
                        <h5>{productData.category}</h5>
                        <h3>{productData.model}</h3>
                    </div>
                    <h2><LuIndianRupee />{productData.price}</h2>
                    <button onClick={submitProduct} className="normal">Add To WishList</button>
                    <h4>Product Details</h4>
                    <span>{productData.description}</span>
                    <h4>Seller Details</h4>
                    <p>Name: <span>{productData.owner}</span></p>
                    <p>Mobile no.: <span>{productData.contact}</span></p>
                    <p>Address: <span>{productData.address}</span></p>
                    <p>Pincode: <span>{productData.pincode}</span></p>
                </div>
            </div>
            <Footer />
        </section>
    )
}

export default ProductDetail;