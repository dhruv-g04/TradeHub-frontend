import React,{useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { LuIndianRupee } from "react-icons/lu";
function Card(props) {
    const product = props.product;
    const navigate = useNavigate();
    const [userID, setUserID] = useState();
    const navigateToProduct = () => {
        navigate(`/productlanding/${product._id}`);
    };
    const submitProduct = async (event) => {
        event.preventDefault();
        const user = JSON.parse(localStorage.getItem('userInfo'));
        if (!user) {
            window.alert("Please Login!");
            navigate("/login");

        } else {
            setUserID(user._id);
            // setToken(user.token);
            const Data = {
                userID: userID,
                item: product
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
            // setToken(user.token);
        }
    }, []);
    return (
        <div className="card">
            <img className="open-card" onClick={navigateToProduct} src={process.env.PUBLIC_URL + "/uploads/" + (product.imageFilePath ? product.imageFilePath : "no-img.png")} alt="" />
            <div className="open-card des" onClick={navigateToProduct}>
                <span>{product.category}</span>
                <h5>{product.model}</h5>
                <h4><LuIndianRupee /> {product.price}</h4>
            </div>
            <div className="heart" onClick={submitProduct}>
                <AiOutlineHeart />
            </div>
        </div>
    )
}
export default Card;