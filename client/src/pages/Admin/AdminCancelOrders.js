import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import LayoutAdmin from "./../../components/Layout/LayoutAdmin";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
import Pagination from "../../components/Pagination";
const { Option } = Select;

function AdminCancelOrders() {
    const navigate = useNavigate();
    const params = useParams();
    const [status, setStatus] = useState([
        "Not_Process",
        "Processing",
        "Shipped",
        "deliverd",
        "cancel",
    ]);
    const [changeStatus, setCHangeStatus] = useState("");
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();
    const getOrders = async () => {
        try {
        const { data } = await axios.get("/api/v1/auth/all-cancel-orders");
        setOrders(data);
        } catch (error) {
        console.log(error);
        }
    };

    // const getOrdersBystatus = async () => {
    //     try {
    //     const { data } = await axios.get(`/api/v1/auth/get-preorder-by-status/${params.status}`);
    //     setOrders(data);
    //     } catch (error) {
    //     console.log(error);
    //     }
    // };

    useEffect(() => {
        if (auth?.token) getOrders();
        // if (auth?.token) getOrdersBystatus();
    }, [auth?.token]);

    const handleChange = async (orderId, value) => {
        try {
        const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
            status: value,
        });
        getOrders();
        } catch (error) {
        console.log(error);
        }
    };

    // ======= Pagination ======//
    



    // ======= Pagination ======//
    return (
        <>
            <LayoutAdmin title={"All Orders Data"}>
        <div className="row dashboard">
            <div className="col-md-3">
            <AdminMenu />
            </div>
            <div className="col py-3">
            <h1 className="text-center">All Cancel Orders - {orders.length}</h1>
            <div className="btn-group mr-2" role="group">
                <button className="btn btn-secondary" 
                onClick={() => navigate(`/dashboard/admin/orders`)}
                >
                    Not_Process
                </button>
                <button className="btn btn-secondary" 
                onClick={() => navigate(`/dashboard/admin/orders-process`)}
                >
                    Processing
                </button>
                <button className="btn btn-secondary" 
                onClick={() => navigate(`/dashboard/admin/orders-shipped`)}
                >
                    Shipped
                </button>
                <button className="btn btn-secondary" 
                onClick={() => navigate(`/dashboard/admin/orders-deliverd`)}
                >
                    Deliverd
                </button>
                <button className="btn btn-secondary" 
                onClick={() => navigate(`/dashboard/admin/orders-cancel`)}
                disabled
                >
                    Cancel
                </button>
            </div>
            {/* <div className="btn-group">
                <a href="/dashboard/admin/orders/Not_Process" className="btn btn-primary">Not_Process</a>
                <a href="/dashboard/admin/orders/Processing" className="btn btn-primary">Processing</a>
                <a href="/dashboard/admin/orders/Shipped" className="btn btn-primary">Shipped</a>
                <a href="/dashboard/admin/orders/deliverd" className="btn btn-primary">deliverd</a>
                <a href="/dashboard/admin/orders/cancel" className="btn btn-primary">cancel</a>
            </div> */}
            {orders?.map((o, i) => {
                return (
                <div className="border shadow">
                    <table className="table">
                    <thead >
                        <tr className="order-table">
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col"> date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                        </tr>
                    </thead>
                    <tbody className="order-admin">
                        <tr>
                        <td>{i + 1}</td>
                        <td>
                            <Select
                            bordered={false}
                            onChange={(value) => handleChange(o._id, value)}
                            defaultValue={o?.status}
                            >
                            {status.map((s, i) => (
                                <Option key={i} value={s}>
                                {s}
                                </Option>
                            ))}
                            </Select>
                        </td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createAt).format('YYYY-MM-DD hh:mm:ss')}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                        </tr>
                    </tbody>
                    </table>
                    <div className="container">
                    {o?.products?.map((p, i) => (
                        <div className="row mb-2 p-3 card flex-row" key={p._id}>
                        <div className="col-md-4">
                            <img
                            src={`/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            
                            />
                        </div>
                        <div className="col-md-8">
                            <p>{p.name}</p>
                            {/* <p>{p.description.substring(0, 30)}</p> */}
                            <p>Price : ${p.price}</p>
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
        <Pagination/>
        </>
        
    );
}

export default AdminCancelOrders