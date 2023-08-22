import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import Layout from "./../components/Layout/Layout";
import {BsFillBagHeartFill } from "react-icons/bs";
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";

const ShowAllProduct = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [cart, setCart] = useCart();

    //getall products
    const getAllProducts = async () => {
        try {
        const { data } = await axios.get("/api/v1/product/get-product");
        setProducts(data.products);
        } catch (error) {
        console.log(error);
        toast.error("Something Went Wrong");
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <Layout title={"All Products"}>
            <div className="container">
            <div className="text-center">
            <div className="product-heading">
                <h1>All Product</h1>
            </div>
            <div className="d-flex flex-wrap mt-4">
            {products?.map((p) => (
                <div className="card m-2 product-box"  key={p._id}>
                    <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        className=" card-img-top"
                        alt={p.name}
                    />
                    <div className="card-body">
                        <div className="card-name-price">
                            <h5 className=" name-product">{p.name}</h5>
                            <p className="card-text product-quantity">
                            {p.quantity}
                            </p>
                            <h5 className="card-title product-price">
                            {p.price.toLocaleString("US", {
                                style: "currency",
                                currency: "USD",
                            })}
                            </h5>
                        </div>
                        <div className="card-name-price">
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
        </div>
        </Layout>
        
    );
};

export default ShowAllProduct