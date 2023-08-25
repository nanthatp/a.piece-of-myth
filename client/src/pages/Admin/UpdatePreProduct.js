import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { DatePicker, Select, TimePicker } from 'antd';
import { useNavigate, useParams } from "react-router-dom";
import moment from 'moment';

const { Option } = Select;
const UpdatePreProduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [members, setMembers] = useState([]);
    const [artists, setArtists] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");  
    const [photo, setPhoto] = useState("");
    const [artist, setArtist] = useState("");
    const [member, setMember] = useState("");
    const [id, setId] = useState("");
    const [until ,setUntil] = useState();
    const [date, setDate] = useState();
    const [timing, setTimings] = useState();
    const [isAvailable,setIsAvailable] = useState();

    //get single product
    const getSinglePreProduct = async () => {
        try {
            const { data } = await axios.get(
                `/api/v1/preproduct/get-preproduct/${params.slug}`
            );
            setName(data.preproduct.name);
            setId(data.preproduct._id);
            setDescription(data.preproduct.description);
            setPrice(data.preproduct.price);
            setCategory(data.preproduct.category._id);
            setArtist(data.preproduct.artist);
            setUntil(data.preproduct.until);
            setMember(data.preproduct.member);
            
        }catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getSinglePreProduct();
        //eslint-disable-next-line
    }, []);



    //get all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/get-category");
            if (data?.success) {
            setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting category");
        }
    }; 

    //get all artist
    const getAllArtist = async () => {
        try {
            const { data } = await axios.get("/api/v1/artist/get-artist");
            if (data?.success) {
            setArtists(data?.artists);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting artist");
        }
    }; 

    //get all member
    const getAllMember = async () => {
        try {
            const { data } = await axios.get("/api/v1/member/get-member");
            if (data?.success) {
            setMembers(data?.member);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting member");
        }
    }; 


    useEffect(() => {
        getAllCategory();
        getAllArtist();
        getAllMember();
    }, []);

    //update product function
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const preproductData = new FormData();
            preproductData.append("name", name);
            preproductData.append("description", description);
            preproductData.append("price", price);
            preproductData.append("category", category);
            photo && preproductData.append("photo", photo);
            preproductData.append("artist", artist);
            preproductData.append("member", member);
            preproductData.append("until", until);
            const { data } = axios.put(
                `/api/v1/preproduct/update-preproduct/${id}`,
                preproductData
            );
            if (data?.success) {
                toast.error(data?.message);
            } else {
                toast.success("Pre-order Product Updated Successfully");
                navigate("/dashboard/admin/preproduct");
            }
        } catch (error) {
        console.log(error);
        toast.error("something went wrong");
        }
    };

    //delete a product
    const handleDelete = async () => {
        try {
            let answer = window.prompt("Are You Sure want to delete this Pre-order product ? ");
            if (!answer) return;
            const { data } = await axios.delete(
                `/api/v1/preproduct/delete-preproduct/${id}`
            );
            toast.success("Pre-Order Product Deleted Succfully");
            navigate("/dashboard/admin/preproduct");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout title={"Dashboard - Update Category"}>
            <div className="row dashboard">
            <div className="col-md-3">
                <AdminMenu />
            </div>
            <div className="col-sm text-center">
                <h1>Manage Pre-Order Product</h1>
                <div className="container product-form">
                <div className="row justify-content-center new-product">
                <h2>New Pre-Order Product</h2>
                </div>
                
            </div>
                <div className="container text-center  create-product">
                    <div className="row justify-content-evenly">
                    <div className="col-4 add-photo">
                        <div className="mb-3">
                            <label className="btn-upload-photo col-md-12">
                                {photo ? photo.name : "Upload Photo"}
                                <input
                                    type="file"
                                    name="photo"
                                    accept="image/*"
                                    onChange={(e) => setPhoto(e.target.files[0])}
                                    hidden
                                />
                            </label>
                        </div>
                        <div className="mb-3">
                            {photo ? (
                                <div className="text-center">
                                    <img
                                        src={URL.createObjectURL(photo)}
                                        alt="preproduct_photo"
                                        height={"200px"}
                                        className="img img-responsive"
                                    />
                                </div>
                            
                            ) : (
                                <div className="text-center">
                                    <img
                                    src={`/api/v1/preproduct/preproduct-photo/${id}`}
                                    alt="preproduct_photo"
                                    height={"200px"}
                                    className="img img-responsive"
                                    />
                                </div>
                            )}
                        </div>
                        </div>
                    <div className="col-4">
                        <div className="mb-3">
                                <textarea
                                    type="text"
                                    value={name}
                                    placeholder="write a name"
                                    className="form-control"
                                    onChange={(e) => setName(e.target.value)}
                                />
                        </div>

                        <div className="mb-3">
                            <input
                                type="number"
                                value={price}
                                placeholder="write a Price"
                                className="form-control"
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <Select
                            bordered={false}
                            placeholder="Select a Artist"
                            size="medium"
                            showSearch
                            className="form-select mb-3"
                            onChange={(value) => {
                                setArtist(value);
                            }}
                            value={artist}
                        >
                            {artists?.map((c) => (
                                <Option key={c._id} value={c._id}>
                                    {c.name}
                                </Option>
                            ))}
                        </Select>

                        <Select
                            bordered={false}
                            placeholder="Select a Category"
                            size="medium"
                            showSearch
                            className="form-select mb-3"
                            onChange={(value) => {
                                setCategory(value);
                            }}
                            value={category}
                        >
                            {categories?.map((c) => (
                                <op key={c._id} value={c._id}>
                                    {c.name}
                                </op>
                            ))}
                        </Select>
                        </div>

                        <div className="col-4">
                        <div className="mb-3">
                            <textarea
                                type="text"
                                value={description}
                                placeholder="write a description"
                                className="form-control"
                                onChange={(e) => setDescription(e)}
                            />
                        </div>
                        
                        <Select
                            bordered={false}
                            placeholder="Select a Member"
                            size="medium"
                            showSearch
                            className="form-select mb-3"
                            onChange={(value) => {
                                setMember(value);
                            }}
                            value={member}
                        >
                            {members?.map((c) => (
                                <Option key={c._id} value={c._id}>
                                    {c.name}
                                </Option>
                            ))}
                        </Select>
                        <div className="d-flex flex-column">
                            <DatePicker format= 'YYYY-MM-DD ' className='m-2'
                            onChange={(values) => setUntil(moment(values))}/>
                            <TimePicker className='m-2' format= 'HH:mm' onChange={(values) => setUntil(
                                moment(values))}/>
                            <label>CurrentDateTime: {moment(until).format('YYYY-MM-DD hh:mm')}</label>
                        </div>
                        </div>
                        <div className="mb-3">
                            <button className="btn-update-product" onClick={handleUpdate}>
                            UPDATE Pre-Order PRODUCT
                            </button>
                        </div>
                        <div className="mb-3">
                            <button className="btn-delete-product" onClick={handleDelete}>
                            DELETE Pre-Oreder PRODUCT
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        
    </Layout>
    )
}

export default UpdatePreProduct