import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { Link,useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { IoMdRemove } from "react-icons/io";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";
import DropIn from "braintree-web-drop-in-react";

const CartPage = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    //total price
    const totalPrice = () => {
        try {
        let total = 0;
        cart?.map((item) => {
            total = total + item.price;
        });
        return total.toLocaleString("US", {
            style: "currency",
            currency: "USD",
        });
        } catch (error) {
        console.log(error);
        }
    };

    //detele item
    const removeCartItem = (pid) => {
        try {
        let myCart = [...cart];
        let index = myCart.findIndex((item) => item._id === pid);
        myCart.splice(index, 1);
        setCart(myCart);
        localStorage.setItem("cart", JSON.stringify(myCart));
        } catch (error) {
        console.log(error);
        }
    };

     //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      alert(error.response.data);
      console.log(error);
      setLoading(false);
    }
  };

  // Create a function to group and count similar items
  const groupAndCountItems = (cart) => {
    const groupedItems = cart.reduce((result, item) => {
      if (!result[item._id]) {
        result[item._id] = { ...item, count: 0 };
      }
      result[item._id].count++;
      return result;
    }, {});

    return Object.values(groupedItems);
  };

  const groupedCartItems = groupAndCountItems(cart);

    return (
        <Layout>
        <div className=" cart-page">
            <div className="row">
            <div className="col-md-12">
                <h1 className="text-center bg-light p-2 mb-1">
                {!auth?.user
                    ? "Hello Guest"
                    : `Hello  ${auth?.token && auth?.user?.name}`}
                <p className="text-center">
                    {cart?.length
                    ? `You have ${cart.length} items in your cart ${
                        auth?.token ? "" : "please login to checkout !"
                        }`
                    : " Your Cart Is Empty"}
                </p>
                </h1>
            </div>
            </div>
            <div className="container ">
            <div className="row ">
                <div className="col-md-7  p-0 m-0">
                {groupedCartItems?.map((p) => (
                    <div className="row card flex-row" key={p._id}>
                    <div className="col-md-4">
                        <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                        width="140px"
                        height={"140px"}
                        />
                    </div>
                    <div className="col-md-4">
                        <p>{p.name}</p>
                        {/* <p>{p.description.substring(0, 30)}</p> */}
                        <p>Price : ${p.price}</p>
                        <p>Quantity: {p.count}</p>
                    </div>
                    <div className="col-md-4 cart-remove-btn">
                        <button
                        className="btn btn-success add-cart-btn"
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p])
                          );
                          toast.success("Item Added to cart");
                        }}
                        >
                        <IoMdAdd style={{ fontSize: '20px' }}/>
                        </button>
                        <button
                        className="btn btn-danger add-cart-btn"
                        onClick={() => removeCartItem(p._id)}
                        >
                        <IoMdRemove style={{ fontSize: '20px' }}/>
                        </button>
                    </div>
                    </div>
                ))}
                </div>
                <div className="col-md-4 mb-4 cart-summary ">
                <h2>Cart Summary</h2>
                <p>Total | Checkout | Payment</p>
                <hr />
                <h4>Total : {totalPrice()} </h4>
                {auth?.user?.address ? (
                    <>
                    <div className="mb-3">
                        <h4>Current Address</h4>
                        <h5>{auth?.user?.address} {auth?.user?.province} {auth?.user?.postalcode}</h5>
                        <button
                        className="btn-cart"
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
                        className="btn-cart"
                        onClick={() => navigate("/dashboard/user/profile")}
                        >
                        Update Address
                        </button>
                    ) : (
                        <button
                        className="btn-cart"
                        onClick={() =>
                            navigate("/login", {
                            state: "/cart",
                            })
                        }
                        >
                        Please Login to Checkout
                        </button>
                    )}
                    </div>
                )}

                <div className="col-md-8 mb-4 pay">
                <div className="mt-3">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
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
                        || auth?.user?.role === 1}
                    >
                    {loading ? "Processing ...." : "Make Payment"} 
                    </button>
                  </>
                )}
              </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </Layout>
    );
};

export default CartPage;