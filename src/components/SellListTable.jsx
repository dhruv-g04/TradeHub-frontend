import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate ,Link} from 'react-router-dom';
import { MdOutlineCancel } from "react-icons/md";
import { LuIndianRupee } from "react-icons/lu";
import { BsTelephoneFill } from "react-icons/bs";
function TableRow({ product }) {
    const navigate = useNavigate();
    const [userID, setUserID] = useState();
    const navigateToProduct = () => {
        navigate(`/productlanding/${product._id}`);
    };
    const removeProduct = async () => {
        const Data = {
            userID: userID,
            item: product
        }
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };

            const resp = await axios.post(
                process.env.REACT_APP_BACKEND_URL + "api/product/remove/selllist", Data, config
            );

            window.alert(resp.data.message);
            window.location.reload();

        } catch (error) {
            navigate("/login");
            console.log(error.response.data);
        }

    }
    const confirmRemove = () => {
        if (window.confirm("Press OK to confirm")) {
            removeProduct();
        }
    }
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userInfo'));
        if (user) {
            setUserID(user._id);
        }
        else {
            navigate("/login");
        }
    }, []);
    return (
        <tr>
            <td onClick={confirmRemove}><MdOutlineCancel /></td>
            <td><img className="hoverPointer" onClick={navigateToProduct} src={process.env.PUBLIC_URL + "/uploads/" + (product.imageFilePath ? product.imageFilePath : "no-img.png")} alt="" /></td>
            <td>{product.model} {product.category}</td>
            <td>{product.seller} <BsTelephoneFill />{product.contact}</td>
            <td><span><LuIndianRupee /></span> {product.price}</td>
        </tr>
    );
}
function Table(props) {
    const proList = props.list;
    return (
        <section id="wish-list" className="section-p1">
            <div className="proHead">
                <h2>{props.heading}</h2>
                {/* <span>You Like It We Save It</span> */}
            </div>
            {proList.length === 0 ?
                <div className="section-p1 center">
                    <img  alt="..." src={process.env.PUBLIC_URL + '/images/empty_wishList.png'} />
                    <br />
                    <strong>There is nothing in your sell list</strong>
                    <p></p>
                    {/* <br /> */}
                    <Link to="/sell" className="normal removeDecoration">Publish Ad</Link>
                </div>
                :
                <table>
                    <thead>
                        <tr>
                            <td>Remove</td>
                            <td>Image</td>
                            <td>Product</td>
                            <td>Seller Details</td>
                            <td>Price</td>
                        </tr>
                    </thead>
                    <tbody>
                        {proList.map((product) => <TableRow key={product._id} product={product} />)}
                    </tbody>
                </table>}
        </section>
    )
}



export default Table;