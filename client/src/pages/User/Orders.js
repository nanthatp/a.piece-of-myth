import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import LayoutAdmin from "./../../components/Layout/LayoutAdmin";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const groupAndCountItems = (order) => {
    const groupedItems = order.products.reduce((result, item) => {
      if (!result[item._id]) {
        result[item._id] = { ...item, count: 0 };
      }
      result[item._id].count++;
      return result;
    }, {});
  
    return Object.values(groupedItems);
  };
  
  return (
    <>
    <LayoutAdmin title={"My Orders"}>
    <div className="row dashboard">
        <div className="col-md-3">
        <UserMenu />
        </div>
        <div className="col py-3">
        <h1 className="text-center">All Orders</h1>
        {orders?.map((o, i) => {
          return (
            <div className="border shadow" key={o._id}>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Status</th>
                    <th scope="col">Buyer</th>
                    <th scope="col">Date</th>
                    <th scope="col">Payment</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Tracking</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{i + 1}</td>
                    <td>{o?.status}</td>
                    <td>{o?.buyer?.name}</td>
                    <td>{moment(o?.createdAt).format("YYYY-MM-DD hh:mm:ss")}</td>
                    <td>{o?.payment.success ? "Success" : "Failed"}</td>
                    <td>{o?.products?.length}</td>
                    <td>{o?.tracking}</td>
                  </tr>
                </tbody>
              </table>
              <div className="container">
                {groupAndCountItems(o).map((p, i) => (
                  <div className="row mb-2 p-3 card flex-row" key={p._id}>
                    <div className="col-md-4">
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                        width="130px"
                        height={"160px"}
                      />
                    </div>
                    <div className="col-md-8">
                      <p>{p.name}</p>
                      <p>Price : ${p.price * p.count}</p>
                      <p>Quantity: {p.count}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        </div>

    </div>
    </LayoutAdmin>
    </>
    
);
  
};

export default Orders;