import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { BsFillBagHeartFill } from "react-icons/bs";
import "../styles/ProductDetailsStyles.css";
import "../styles/Homepage.css";

const ProductDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [auth, setAuth] = useAuth();

    //initalp details
    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug]);
    //getProduct
    const getProduct = async () => {
        try {
        const { data } = await axios.get(
            `/api/v1/product/get-product/${params.slug}`
        );
        setProduct(data?.product);
        getSimilarProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
        console.log(error);
        }
    };
    //get similar product
    const getSimilarProduct = async (pid, cid) => {
        try {
        const { data } = await axios.get(
            `/api/v1/product/related-product/${pid}/${cid}`
        );
        setRelatedProducts(data?.products);
        } catch (error) {
        console.log(error);
        }
    };
    let wordQuantity = "";
    let outOfStock = product.quantity;
        if (outOfStock<1) {
            wordQuantity = "out of stock";
        } else {
            wordQuantity = product.quantity;
        }
    return (
        <Layout>
            <div className="row container product-details">
                <div className="col-md-6">
                    <img
                        src={`/api/v1/product/product-photo/${product._id}`}
                        className="card-img-top"
                        alt={product.name}
                        width="320" height="480"
                    />
                </div>
                <div className="col-md-6 product-details-info">
                    <h1 className="text-center">Product Details</h1>
                    <hr />
                    <h6>Name : {product.name}</h6>
                    <h6>Description : {product.description}</h6>
                    <h6>
                        Price :
                        {product?.price?.toLocaleString("US", {
                        style: "currency",
                        currency: "USD",
                        })}
                    </h6>
                    <h6>quantity : {wordQuantity } </h6>
                    <h6>Category : {product?.category?.name}</h6>
                    <button
                        className="btn-add-detail"
                        onClick={() => {
                            setCart([...cart, product]);
                            localStorage.setItem(
                                "cart",
                                JSON.stringify([...cart, product])
                            );
                            toast.success("Item Added to cart");
                        }}
                        > 
                            <BsFillBagHeartFill/>Add to Cart
                    </button>
                </div>
            </div>
        <hr />

        <div className="row container similar-products">
            <h4>More Products</h4>
            {relatedProducts.length < 1 && (
            <p className="text-center">No Similar Products found</p>
            )}
            <section className="product-list">
            <div className="product-container ">
            <div className="d-flex wrap">
            {relatedProducts?.map((p) => (
                <div className="card m-2 product-box" key={p._id}>
                <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                />
                <div className="card-body">
                    <div className="card-name-price">
                    <h5 className=" name-product">{p.name}</h5>
                    <p className="card-text product-quantity">
                        quantity: {p.quantity}
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
                        disabled={wordQuantity === "out of stock"
                        || auth?.user?.role === 1}
                        onClick={() => {
                            if (product.quantity === 0) {
                                console.log("ไม่ขาย!!!")
                                 
                            } else {
                                setCart([...cart, p]);
                                localStorage.setItem(
                                "cart",
                                JSON.stringify([...cart, p])
                                );
                                toast.success("Item Added to cart");
                                
                            }
                            // setCart([...cart, p]);
                            // localStorage.setItem(
                            // "cart",
                            // JSON.stringify([...cart, p])
                            // );
                            // toast.success("Item Added to cart");
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
        </Layout>
    );
};

export default ProductDetails;