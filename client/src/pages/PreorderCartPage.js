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
import moment from 'moment';


function PreorderCartPage() {
    const params = useParams();
    const [auth, setAuth] = useAuth();
    const [precart, setPreCart] = useCart();
    const [quantity, setQuantity] = useState(1);
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    const [preproduct, setPreproduct] = useState({});
    const [relatedPreproducts, setRelatedPreroducts] = useState([]);
    const [until , setUntil] = useState("");
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
        email: auth?.user?.email
      });
      setLoading(false);
      localStorage.removeItem("preorderItem");
      setPreCart([]);
      navigate("/dashboard/user/preorders");
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
    if (params?.slug) getPreproduct();
}, [params?.slug]);

//getProduct
const getPreproduct = async () => {
  try {
  const { data } = await axios.get(
      `/api/v1/preproduct/get-preproduct/${params.slug}`
  );
  setPreproduct(data?.preproduct);
  getSimilarPreproduct(data?.preproduct._id, data?.preproduct.category._id);
  } catch (error) {
  console.log(error);
  }
};
//get similar product
const getSimilarPreproduct = async (pid, cid) => {
  try {
  const { data } = await axios.get(
      `/api/v1/preproduct/related-preproduct/${pid}/${cid}`
  );
  setRelatedPreroducts(data?.preproducts);
  } catch (error) {
  console.log(error);
  }
};
//get single product
const getSinglePreProduct = async () => {
  try {
      const { data } = await axios.get(
          `/api/v1/preproduct/get-preproduct/${params.slug}`
      );
      setUntil(data.preproduct.until);
      
  }catch (error) {
      console.log(error);
  }
};

function disableButton (until){
  let currentDate = new Date()
  let endDate = new Date(until)
  console.log("currentDate = ", currentDate)
  console.log("endDate = ", endDate-currentDate)
  if (endDate - currentDate < 0){
    return true
  }
  return false;
}

useEffect(() => {
  getSinglePreProduct();
  
  //eslint-disable-next-line
}, []);
  return (
    <Layout>
    <div className="row container product-details">
                <div className="col-md-6">
                    <img
                        src={`/api/v1/preproduct/preproduct-photo/${preproduct._id}`}
                        className="card-img-top"
                        alt={preproduct.name}
                        width="320" height="480"
                        
                    />
                </div>
                <div className="col-md-6 product-details-info">
                    <h1 className="text-center">Pre-order </h1>
                    <h2 className="text-center">{preproduct.name}</h2>
                    <hr />
                    <h3>Time Limit : {moment(until).locale('th').format('YYYY-MM-DD hh:mm')}</h3>
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
                    <div className="col-md-6 mb-4">
                    <div className="mb-3">
                      <h6>Quantity : </h6>
                      <input
                          type="number"
                          value={quantity}
                          placeholder="Quantity"
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

                        <div>
                          Total:${quantity*preproduct.price} 
                        </div>
                    </div>
                    </div>

                    <div className="col-md-6 mb-4">
                         
                    {auth?.user?.address ? (
                    <>
                    <div className="mb-3">
                        <h6>Current Address : {auth?.user?.address} {auth?.user?.province} {auth?.user?.postalcode}</h6>
                        <button
                        className="btn-pre"
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
                        Please Login to checkout
                        </button>
                    )}
                    </div>
                )}
                    </div>
                 

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

                <div className="col-md-6 mb-4">
                <div className="mt-3">
                {!clientToken || !auth?.token ? (
                  <div>payment loading...</div>
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        // paypal: {
                        //   flow: "vault",
                        // },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn-add-payment"
                      onClick={handlePayment}
                      disabled={loading   
                        ||!instance 
                        || !auth?.user?.address 
                        ||!auth?.user?.postalcode 
                        || !auth?.user?.province 
                        || auth?.user?.role === 1
                        ||disableButton (preproduct.until)}
                    >
                      {loading ? "Processing ...." : "PRE ORDER NOW"}
                    </button>
                  </>
                )}
              </div>
                </div>
                </div>
            </div>
        <hr />

        
                
            
            
        <div className="row container similar-products">
            <h4>More Pre-Order Products</h4>
            {relatedPreproducts.length < 1 && (
            <p className="text-center">No Similar Products found</p>
            )}
            <section className="product-list-detail">
            <div className="product-container ">
            <div className="d-flex wrap">
            {relatedPreproducts?.map((p) => (
                <div className="card m-2 product-box" key={p._id}>
                <img
                    src={`/api/v1/preproduct/preproduct-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width="320" height="480"
                />
                <div className="card-body">
                    <div className="card-name-price">
                    <h5 className=" name-product">{p.name}</h5>
                    <p className="card-text product-quantity">
                      End : {moment(p.until).locale('th').format('YYYY-MM-DD hh:mm')}
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
                        disabled={auth?.user?.role === 1 ||disableButton (p.until)}
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
            </section>
            
        </div>    
        
        </Layout>
  )
}

export default PreorderCartPage;