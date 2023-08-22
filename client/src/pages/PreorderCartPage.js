import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { AiFillWarning } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";
import DropIn from "braintree-web-drop-in-react";
import {BsFillBagHeartFill } from "react-icons/bs";


function PreorderCartPage() {
    const params = useParams();
    const [auth, setAuth] = useAuth();
    const [precart, setPreCart] = useCart();
    const [quantity, setQuantity] = useState(1);
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    const [preproduct, setPreproduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const navigate = useNavigate();

     //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/preproduct/braintreepreorder/token");
      console.log("data1 = ",data);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };


  // handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const preorderItem = JSON.parse(localStorage.getItem('preorderItem'));
      const { data } = await axios.post("/api/v1/preproduct/braintreepreoder/payment", {
        nonce,
        preorderItem,
      });
      setLoading(false);
      localStorage.removeItem("preorderItem");
      setPreCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
//getPre-order Product
const getPreProduct = async () => {
    try {
    const { data } = await axios.get(
        `/api/v1/preproduct/get-preproduct/${params.slug}`
    );
    setPreproduct(data?.preproduct);
    } catch (error) {
    console.log(error);
    }
};
useEffect(() => {
  localStorage.setItem(
    "preorderItem",
    JSON.stringify({
      ...preproduct,
      quantity : 1
    })
);
}, [preproduct]);
useEffect(() => {
  getToken();
}, [auth?.token]);
//initalp details
useEffect(() => {
    if (params?.slug) getPreProduct();
}, [params?.slug]);
  return (
    <Layout>
    <div className="row container product-details">
                <div className="col-md-6">
                    <img
                        src={`/api/v1/preproduct/preproduct-photo/${preproduct._id}`}
                        className="card-img-top"
                        alt={preproduct.name}
                        
                    />
                </div>
                <div className="col-md-6 product-details-info">
                    <h1 className="text-center">Pre-order </h1>
                    <h2 className="text-center">{preproduct.name}</h2>
                    <hr />
                    <h6>Description : {preproduct.description}</h6>
                    <h6>
                        Price :
                        {preproduct?.price?.toLocaleString("US", {
                        style: "currency",
                        currency: "USD",
                        })}
                    </h6>
                    {/* <h6>Sold : {preproduct.quantity}</h6> */}
                    <h6>Category : {preproduct?.category?.name}</h6>
                    
                    <div className="mb-3">
                            <h6>Quantity : </h6>
                            <input
                                type="number"
                                value={quantity}
                                placeholder="write a Quantity"
                                className="form-control"
                                onChange={(e) => {
                                  setQuantity(e.target.value)
                                  localStorage.setItem(
                                    "preorderItem",
                                    JSON.stringify({
                                      ...preproduct,
                                      quantity: e.target.value
                                    })
                                );
                                }}
                            />
                        </div>

                        <div>
                          Total: {quantity*preproduct.price}
                        </div>
                    
                        {auth?.user?.address ? (
                    <>
                    <div className="mb-3">
                        <h6>Current Address : {auth?.user?.address} {auth?.user?.province} {auth?.user?.postalcode}</h6>
                        <button
                        className="btn btn-outline-warning"
                        onClick={() => navigate("/dashboard/user/profile")}
                        >
                        Update Address
                        </button>
                    </div>
                    </>
                ) : (
                    <div className="mb-3">
                    {auth?.token ? (
                        <button
                        className="btn btn-outline-warning"
                        onClick={() => navigate("/dashboard/user/profile")}
                        >
                        Update Address
                        </button>
                    ) : (
                        <button
                        className="btn btn-outline-warning"
                        onClick={() =>
                            navigate("/login", {
                            state: "/",
                            })
                        }
                        >
                        Plase Login to checkout
                        </button>
                    )}
                    </div>
                )}

                    {/* <button
                        className="btn-add-detail"
                        onClick={() => {
                            localStorage.setItem(
                                "preorderItem",
                                JSON.stringify({
                                  ...preproduct,
                                  quantity
                                })
                            );
                        }}
                        > 
                            <BsFillBagHeartFill/>PRE-ORDER
                    </button> */}
                    <div className="mt-2">
                {!clientToken || !auth?.token ? (
                  <div>test</div>
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn-add-detail"
                      onClick={handlePayment}
                      disabled={loading || !instance }
                    >
                      {loading ? "Processing ...." : "PRE-ORDER"}
                    </button>
                  </>
                )}
              </div>
                </div>
            </div>
        <hr />

        
                
            
            
            
        
        </Layout>
  )
}

export default PreorderCartPage;