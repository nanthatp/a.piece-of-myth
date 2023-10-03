import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CategoryProductStyles.css";
import "../styles/Homepage.css";
import {BsFillBagHeartFill } from "react-icons/bs";

const CategoryProduct = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    const [products, setProducts] = useState([]);
    const [preproducts, setPreproducts] = useState([]);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        if (params?.slug) getPrductsByCat();
        if (params?.slug) getPreProductsByCat();
    }, [params?.slug]);
    const getPrductsByCat = async () => {
        try {
        const { data } = await axios.get(
            `/api/v1/product/product-category/${params.slug}`
        );
        setProducts(data?.products);
        setCategory(data?.category);
        } catch (error) {
        console.log(error);
        }
    };

    const getPreProductsByCat = async () => {
        try {
        const { data } = await axios.get(
            `/api/v1/preproduct/preproduct-category/${params.slug}`
        );
        setPreproducts(data?.preproducts);
        setCategory(data?.category);
        } catch (error) {
        console.log(error);
        }
    };

    return (
        <Layout>
        <div className="container category">
            <h4 className="text-center">Category - {category?.name}</h4>
            <h6 className="text-center">{products?.length + preproducts?.length} result found </h6>
            <div className="row">
                <div className="d-flex flex-wrap">
                {products?.map((p) => (
                    <div className="carousel-item active card m-2 product-box"  key={p._id}>
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

                {preproducts?.map((p) => (
                    <div className="carousel-item active card m-2 product-box"  key={p._id}>
                        <img
                        src={`/api/v1/preproduct/preproduct-photo/${p._id}`}
                        className=" card-img-top"
                        alt={p.name}
                        />
                        <div className="card-body">
                            <div className="card-name-price">
                                <h5 className=" name-product">{p.name}</h5>
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
                                onClick={() => navigate(`/preproduct/${p.slug}`)}
                            >
                                <BsFillBagHeartFill/> Pre-Order Now
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

export default CategoryProduct;