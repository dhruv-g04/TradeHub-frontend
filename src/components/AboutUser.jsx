import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";
// import Grid from "./Grid";
import SellTable from "./SellListTable";
function CustomerDetails() {
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
        (<div id="box">
            < Header />
            <section className="section-p1">
                <div class="info-box">
                    <h2 className="info-heading">Personal Information</h2>

                    <div class="text-start personalInfo">
                        <h4> <strong>Name: </strong> {user.name} </h4>
                        <h4> <strong>User Name: </strong>  {user.username}</h4>

                    </div>
                </div>
            </section>

            {/* {user.wishList.length ? <Grid heading="Your WishList" prodList={user.wishList} /> : null} */}

            <SellTable heading="Your Ads" list={user.sellList} />
            <Footer />
        </div>)
    )
}
export default CustomerDetails;