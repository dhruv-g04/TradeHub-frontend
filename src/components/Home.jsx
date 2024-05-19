import React, { useEffect,useState } from 'react';
import axios from 'axios';
// import {BrowserRouter,Routes,Route} from "react-router-dom";
import Header from "./Header";
import Grid from "./Grid";
// import { cardsList } from "./data";
import Footer from "./Footer";
import Feature from "./Feature";
function Home() {  
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_URL + "api/recentproducts")
            .then((response) => {
                setProducts(response.data);
            }).catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    return (
        <div id="box">
            <Header />
            <Feature />
            <Grid heading="Recent Deal" prodList={products}/>
            <Footer />
        </div>
    )
}
export default Home;