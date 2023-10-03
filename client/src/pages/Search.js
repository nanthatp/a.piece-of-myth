import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";
import {BsFillBagHeartFill } from "react-icons/bs";
import "../styles/Search.css";

const Search = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();
    const [cart, setCart] = useCart();

    return (
        <Layout title={"Search results"}>
        <div className="container">
            <div className="text-center">
            <h1>Search Results</h1>
            <h6>
                {values?.results.length < 1
                ? "No Products Found"
                : `Found ${values?.results.length}`}
            </h6>
            <section className="product-list-Detail">
                <div className="product-container ">
                <div className="d-flex flex-wrap">
                {values?.results.map((p) => (
                <div className="card m-2 product-box"  key={p._id}>
                    <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        className=" card-img-top"
                        alt={p.name}
                    />
                    <div className="card-body-search">
                    <div className="card-name-price-search">
                    <h5 className=" name-product">{p.name}</h5>
                    <p className="card-text product-quantity">
                        {p.quantity} in stock
                    </p>
                    <h5 className="card-title product-price">
                        {p.price.toLocaleString("US", {
                        style: "currency",
                        currency: "USD",
                        })}
                    </h5>
                    </div>
                    <div className="card-name-price-search">
                    <button
                        className="btn-add"
                        onClick={() => {
                            setCart([...cart, p]);
                            localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p])
                            );
                            toast.success("Item Added to cart");
                        }}
                        >
                        <BsFillBagHeartFill/> Add to Cart
                        </button>
                        <button
                        className="btn-details"
                        onClick={() => navigate(`/product/${p.slug}`)}
                        >
                        More Details
                        </button>
                    </div>
                </div>
                    
                </div>
                ))}
            </div>
                </div>
            </section>
            
            </div>
        </div>
        </Layout>
    );
};

export default Search;