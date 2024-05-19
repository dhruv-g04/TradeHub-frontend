import React from "react";
import Card from "./Card";

function Grid(props) {
    function makeCard(product) {
        return (
            <Card key={product._id} product={product} />
        )
    }
    const products=props.prodList;
    // console.log(props);
    return (
        <section id="products" className="section-p1">
            <div className="proHead">
                <h2>{props.heading}</h2>
            </div>
            <div className="grid">
                {products.map(makeCard)}
            </div>
        </section>
    )
}

export default Grid;