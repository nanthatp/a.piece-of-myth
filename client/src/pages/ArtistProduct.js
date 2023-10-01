import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CategoryProductStyles.css";
import "../styles/Homepage.css";
import {BsFillBagHeartFill } from "react-icons/bs";

const ArtistProduct = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    const [products, setProducts] = useState([]);
    const [preproducts, setPreproducts] = useState([]);
    const [artist, setArtist] = useState([]);

    
    useEffect(() => {
        if (params?.slug) getProductsByArtist();
    }, [params?.slug]);

    useEffect(() => {
        if (params?.slug) getPreProductsByArtist();
    }, [params?.slug]);
    const getProductsByArtist = async () => {
        try {
        const { data } = await axios.get(
            `/api/v1/product/product-artist/${params.slug}`
        );
        setProducts(data?.products);
        setArtist(data?.artist);
        } catch (error) {
        console.log(error);
        }
    };

    const getPreProductsByArtist = async () => {
        try {
        const { data } = await axios.get(
            `/api/v1/preproduct/preproduct-artist/${params.slug}`
        );
        setPreproducts(data?.preproducts);
        setArtist(data?.artist);
        } catch (error) {
        console.log(error);
        }
    };

    return (
        <Layout>
        <div className="container mt-3 category">
            <h4 className="text-center">Artist - {artist?.name}</h4>
            <h6 className="text-center">{products?.length + preproducts?.length} result found </h6>
            <div className="row">
            <div className="col-md-9 offset-1">
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
                
                {/* <div className="m-2 p-3">
                {products && products.length < total && (
                <button
                    className="btn btn-warning"
                    onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                    }}
                >
                    {loading ? "Loading ..." : "Loadmore"}
                </button>
                )}
            </div> */}
            </div>
            </div>
        </div>
        </Layout>
    );
};

export default ArtistProduct