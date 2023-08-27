import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";

const { Option } = Select;

function AdminPreorder() {
    const [status, setStatus] = useState([
        "Not Process",
        "Processing",
        "Shipped",
        "deliverd",
        "cancel",
    ]);
    const [changeStatus, setCHangeStatus] = useState("");
    const [preorders, setPreorders] = useState([]);
    const [auth, setAuth] = useAuth();
    const getPreOrders = async () => {
        try {
        const { data } = await axios.get("/api/v1/auth/all-preorders");
        setPreorders(data);
        } catch (error) {
        console.log(error);
        }
    };

    useEffect(() => {
        if (auth?.token) getPreOrders();
    }, [auth?.token]);

    const handleChange = async (preorderId, value) => {
        try {
        const { data } = await axios.put(`/api/v1/auth/preorder-status/${preorderId}`, {
            status: value,
        });
        getPreOrders();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Layout title={"All Orders Data"}>
        <div className="row dashboard">
            <div className="col-md-3">
            <AdminMenu />
            </div>
            <div className="col-md-9">
            <h1 className="text-center">All Pre-Orders</h1>
            {preorders?.map((o, i) => {
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
                        <td>{moment(o?.createdAt).format('YYYY-MM-DD hh:mm:ss')}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.quantity}</td>
                        </tr>
                    </tbody>
                    </table>
                    <div className="container">
                    {o?.preproduct?.map((p, i) => (
                        <div className="row mb-2 p-3 card flex-row" key={p._id}>
                        <div className="col-md-4">
                            <img
                            src={`/api/v1/preproduct/preproduct-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            // width="100px"
                            // height={"100px"}
                            />
                        </div>
                        <div className="col-md-8">
                            <p>{p.name}</p>
                            <p>{p.description.substring(0, 30)}</p>
                            <p>Price : {p.price}</p>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
                );
            })}
            </div>
        </div>
        </Layout>
    );
}

export default AdminPreorder