import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";
import Table from "./WishListTable";
function WishList() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        _id: "",
        name: "",
        username: "",
        wishList: [],
        sellList: []
    });
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
                throw new Error(res.error);
            }
        }
        catch (err) {
            window.alert("Please Login!");
            navigate("/login");
            console.log(err);
        }
    }
    useEffect(() => {
        callAboutUser();
    }, []);
    return (
        <div>
            <Header />
            <Table heading="WishList" list={user.wishList}/>
            <Footer />
        </div>
    )
}

export default WishList;