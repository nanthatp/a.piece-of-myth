import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
import LayoutAdmin from "./../../components/Layout/LayoutAdmin";
import {commonrequest} from "../../Services/ApiCall";
import {BASE_URL} from "../../Services/helper";
import{BsArrowLeftCircleFill} from 'react-icons/bs';
const { Option } = Select;

function AdminProcessingPreorder() {
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
    const [preorders, setPreorders] = useState([]);
    const [ preorder, setPreorder ] = useState("");
    const [auth, setAuth] = useAuth();
    const getPreOrders = async () => {
        try {
        const { data } = await axios.get(`/api/v1/auth/preorder-preproduct-processing/${params.preproduct}`);
        setPreorders(data);
        } catch (error) {
        console.log(error);
        }
    };

    useEffect(() => {
        if (auth?.token) getPreOrders();
    }, [auth?.token]);

    const handleChange = async (preorderId, email, value) => {
        try {
        const { data } = await axios.put(`/api/v1/auth/preorder-status/${preorderId}`, {
            status: value,
            email : email,
        });
        getPreOrders();
        } catch (error) {
            console.log(error);
        }
    };

    const exporttocsvfunc = async()=>{
        console.log("params =",params)
        return await commonrequest("GET",`${BASE_URL}/api/v1/preproduct/preorder-export-processing/${params.preproduct}`,"");
    }

     // export Preorder
    const exportPreorder = async()=>{
    const response = await exporttocsvfunc();
    if(response.status === 200){
      window.open(response.data.downloadUrl,"blank")
    }else{
      toast.error("error !")
    }
  }
    return (
        <LayoutAdmin title={"All Orders Data"}>
        <div className="row dashboard">
            <div className="col-md-3">
            <AdminMenu />
            </div>
            <div className="col-md-9">
            <div className="col-md-3 d-flex ">
                    
                    <button
                        className="btn"
                        onClick={() => navigate(`/dashboard/admin/preorder`)}
                        >
                            <BsArrowLeftCircleFill color="#0DA574" style={{ fontSize: '50px' }}/>
                        </button>
                            
                </div>
            <h1 className="text-center">All Processing Pre-Orders - {preorder.length}</h1>
            <div className=" d-flex justify-content-center btn-group mr-2" role="group">
                <button className="btn-process" 
                onClick={() => navigate(`/dashboard/admin/preorder/${params.preproduct}`)}
                >
                    Not Process
                </button>
                <button className="btn-process" 
                onClick={() => navigate(`/dashboard/admin/preorder-processing/${params.preproduct}`)}
                disabled
                >
                    Processing
                </button>
                <button className="btn-process" 
                onClick={() => navigate(`/dashboard/admin/preorder-shipped/${params.preproduct}`)}
                >
                    Shipped
                </button>
                <button className="btn-process" 
                onClick={() => navigate(`/dashboard/admin/preorder-deliverd/${params.preproduct}`)}
                >
                    Delivered
                </button>
                <button className="btn-process" 
                onClick={() => navigate(`/dashboard/admin/preorder-cancel/${params.preproduct}`)}
                >
                    Cancel
                </button>
            </div>
            <div className="col-md-3">
                <button className="btn-csv" onClick={exportPreorder}
                disabled = {preorders.length <= 0}>
                    export to CSV
                </button>
            </div>
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
                            onChange={(value) => handleChange(o._id, o.email, value)}
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
    );
}

export default AdminProcessingPreorder