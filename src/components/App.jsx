import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import AllProduct from './AllProduct';
import Sell from './Sell';
import Login from './Login';
import SignUp from './SignUp';
import WishList from './WishList';
import ProductDetail from './ProductDetail';
import CustomerDetails from './AboutUser';
function App() {
    useEffect(() => {
        document.title = "TradeHub"
    }, [])
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/allproduct" element={<AllProduct />} />
                <Route path="/sell" element={<Sell />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route exact path="/wishlist" element={<WishList />} />
                <Route exact path="/aboutuser" element={<CustomerDetails/>} />
                {/* <PrivateRoute path="/aboutuser" component={CustomerDetails} /> */}
                <Route exact path="/productlanding/:productId" element={<ProductDetail/>} />
                {/* <Route exact path="/productlanding/:productId" element={<ProductLanding/>} /> */}
            </Routes>

        </BrowserRouter>
    );
    // return (
    //     <div id="box">
    //         <Header />
    //         <Feature />
    //         <Grid />
    //         <Footer />
    //     </div>
    // )
}
export default App;