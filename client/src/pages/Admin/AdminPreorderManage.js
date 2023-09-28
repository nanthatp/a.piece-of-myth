import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import AdminMenu from '../../components/Layout/AdminMenu';
import LayoutAdmin from "./../../components/Layout/LayoutAdmin";
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";
import moment from 'moment';
import { Select } from "antd";

const { Option } = Select;

function AdminPreorderManage() {
    const params = useParams();
    const navigate = useNavigate();
const [preproducts, setPreproducts] = useState([]);
const [preproduct, setPreproduct] = useState("");

//get all pre-order preproducts
const getAllPreProducts = async () => {
    try {
    const { data } = await axios.get("/api/v1/preproduct/get-preproduct");
    setPreproducts(data.preproducts);
    } catch (error) {
    console.log(error);
    toast.error("Something Went Wrong");
    }
};

useEffect(() => {
    getAllPreProducts();
}, []);

  return (
    <LayoutAdmin title={"All Orders Data"}>
        <div className="row dashboard">
            <div className="col-md-3">
            <AdminMenu />
            </div>
            <div className="col-md-9">
            <h1 className="text-center">Pre-Orders Management</h1>
            {preproducts?.map((o, i) => {
                return (
                <div className="border shadow">
                    <table className="table">
                    <thead >
                        <tr className="order-table">
                        <th scope="col">#</th>
                        <th scope="col">Pre-Order Product</th>
                        {/* <th scope="col">date</th> */}
                        {/* <th scope="col">Quantity</th> */}
                        <th scope="col">   </th>
                        </tr>
                    </thead>
                     <tbody className="order-admin">
                        <tr>
                        <td>{i + 1}</td> 
                         {/* <td>
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
                        </td>  */}
                        <td>{o?.name}</td>
                        {/* <td>{moment(o?.createdAt).format('YYYY-MM-DD hh:mm:ss')}</td> */}
                        {/* <td>{o?.quantity}</td> */}
                        <td><button
                            className="btn-add-Pre-Order-List"
                            onClick={() => navigate(`/dashboard/admin/preorder/${o._id}`)}
                            >
                             Pre-Order List
                        </button></td>
                        </tr>
                    </tbody> 
                    </table>
                    <div className="container">
                    {o?.preproduct?.map((o, i) => (
                        <div className="row mb-2 p-3 card flex-row" key={o._id}>
                        <div className="col-md-4">
                            <img
                            src={`/api/v1/preproduct/preproduct-photo/${o._id}`}
                            className="card-img-top"
                            alt={o.name}
                            width="100px"
                            height={"100px"}
                            />
                        </div>
                        <div className="col-md-8">
                            <p>{o.name}</p>
                            <p>{o.description.substring(0, 30)}</p>
                            <p>Price : {o.price}</p>
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
  )
}

export default AdminPreorderManage