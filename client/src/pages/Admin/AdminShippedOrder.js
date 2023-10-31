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
import{BsFillPencilFill, BsCheckCircleFill} from 'react-icons/bs';
import {Modal} from 'antd';
import TrackingForm from "../../components/Form/TrackingForm";
import Swal from 'sweetalert2';
const { Option } = Select;

function AdminShippedOrder() {
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
    const [tracking, setTracking] = useState("");
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState(null);
    const [updatedTracking, setUpdatedTracking] = useState("");
    const getOrders = async () => {
        try {
        const { data } = await axios.get("/api/v1/auth/all-shipped-orders");
        setOrders(data);
        } catch (error) {
        console.log(error);
        }
    };

        //update order
        const handleUpdate = async (e) => {
            e.preventDefault();
            // if (tracking === "") {
            //     Swal.fire({
            //         position: 'top-center',
            //         icon: 'warning',
            //         title: 'Warning!',
            //         text: 'Please enter Tracking',
            //         showConfirmButton: false,
            //         timer: 3000
            //     });
            //     return;
            // }
            
            try {
            const { data } = await axios.put(
                `/api/v1/auth/update-order/${selected._id}`,
                { tracking: updatedTracking }
            );
            if (data?.success) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Updated!',
                    text: 'Tracking has been updated.',
                    showConfirmButton: false,
                    timer: 3500
                })
                setSelected(null);
                setUpdatedTracking("");
                setVisible(false);
                getOrders();
            } else {
                toast.error(data.message);
            }
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
            <LayoutAdmin title={"All Orders Data"}>
        <div className="row dashboard">
            <div className="col-md-3">
            <AdminMenu />
            </div>
            <div className="col py-3">
            <h1 className="text-center">All Shipped Orders - {orders.length}</h1>
            <div className="d-flex justify-content-center btn-group mr-2" role="group">
                <button className="btn-process" 
                onClick={() => navigate(`/dashboard/admin/orders`)}
                >
                    Not Process
                </button>
                <button className="btn-process" 
                onClick={() => navigate(`/dashboard/admin/orders-process`)}
                >
                    Processing
                </button>
                <button className="btn-process" 
                onClick={() => navigate(`/dashboard/admin/orders-shipped`)}
                disabled
                >
                    Shipped
                </button>
                <button className="btn-process" 
                onClick={() => navigate(`/dashboard/admin/orders-deliverd`)}
                >
                    Delivered
                </button>
                <button className="btn-process" 
                onClick={() => navigate(`/dashboard/admin/orders-cancel`)}
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
                    <div className="border shadow" key={o._id}>
                    <table className="table">
                        <thead>
                        <tr className="order-table">
                            <th scope="col">#</th>
                            <th scope="col">Status</th>
                            <th scope="col">Buyer</th>
                            <th scope="col">date</th>
                            <th scope="col">Payment</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">tracking</th>
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
                            <td>
                            <button 
                                className='btn-edit-tack ms-2' 
                                onClick={() => {
                                setVisible(true);
                                setUpdatedTracking(o.tracking);
                                setSelected(o);
                                }}
                            >
                                {o.tracking === "No Tracking" ? <BsFillPencilFill style={{ fontSize: '25px' }} /> : <BsCheckCircleFill color="#0DA574" style={{  fontSize: '25px' }}/> }
                            </button>
                            </td>
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
                                width="100%"
                                height="200px"
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
            <Modal 
                onCancel={() => setVisible(false)}
                footer={null}
                visible={visible}
            > 
                <TrackingForm
                    value={updatedTracking}
                    setValue={setUpdatedTracking}
                    handleSubmit={handleUpdate}
                />
            </Modal>
        </div>
        </LayoutAdmin>
        <Pagination/>
        </>
        
    );
}

export default AdminShippedOrder