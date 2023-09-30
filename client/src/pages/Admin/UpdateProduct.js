import React, { useEffect, useState } from 'react'
import LayoutAdmin from "./../../components/Layout/LayoutAdmin";
import AdminMenu from '../../components/Layout/AdminMenu'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const UpdateProduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [collectiongroups, setCollectiongroups] = useState([]);
    // const [members, setMembers] = useState([]);
    const [artists, setArtists] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [collectiongroup, setCollectiongroup] = useState("");
    const [quantity, setQuantity] = useState("");
    const [photo, setPhoto] = useState("");
    const [artist, setArtist] = useState("");
    // const [member, setMember] = useState("");
    const [shipping, setShipping] = useState("");
    const [id, setId] = useState("");

    //get single product
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(
                `/api/v1/product/get-product/${params.slug}`
            );
            setName(data.product.name);
            setId(data.product._id);
            setDescription(data.product.description);
            setPrice(data.product.price);
            setCategory(data.product.category._id);
            setCollectiongroup(data.product.collectiongroup);
            setQuantity(data.product.quantity);
            setShipping(data.product.shipping);
            setArtist(data.product.artist);
            // setMember(data.product.member);
            
        }catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getSingleProduct();
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

    //get all collection
    const getCollectiongroup = async () => {
        try {
            const { data } = await axios.get("/api/v1/collectiongroup/get-collectiongroup");
            if (data?.success) {
                setCollectiongroups(data?.collectiongroup);
                }
        }catch(error){
            console.log(error);
            toast.error("Something went wrong in getting collecton groups");
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
    // const getAllMember = async () => {
    //     try {
    //         const { data } = await axios.get("/api/v1/member/get-member");
    //         if (data?.success) {
    //         setMembers(data?.member);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         toast.error("Something went wrong in getting member");
    //     }
    // }; 


    useEffect(() => {
        getAllCategory();
        getCollectiongroup();
        getAllArtist();
        // getAllMember();
    }, []);

    //update product function
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("category", category);
            productData.append("collectiongroup", collectiongroup);
            productData.append("quantity", quantity);
            photo && productData.append("photo", photo);
            productData.append("artist", artist);
            // productData.append("member", member);
            const { data } = axios.put(
                `/api/v1/product/update-product/${id}`,
                productData
            );
            if (data?.success) {
                toast.error(data?.message);
            } else {
                toast.success("Product Updated Successfully");
                navigate("/dashboard/admin/products");
                window.location.reload();
            }
        } catch (error) {
        console.log(error);
        toast.error("something went wrong");
        }
    };

    //delete a product
    const handleDelete = async () => {
        try {
            let answer = window.prompt("Are You Sure want to delete this product ? ");
            if (!answer) return;
            const { data } = await axios.delete(
                `/api/v1/product/delete-product/${id}`
            );
            toast.success("Product DEleted Succfully");
            navigate("/dashboard/admin/products");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <LayoutAdmin title={"Dashboard - Update Category"}>
            <div className="row dashboard">
            <div className="col-md-3">
                <AdminMenu />
            </div>
            <div className="col-sm text-center">
                <h1>Manage Product</h1>
                <div className="container product-form">
                <div className="row justify-content-center new-product">
                <h2>New Product</h2>
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
                                        alt="product_photo"
                                        height={"200px"}
                                        className="img img-responsive"
                                    />
                                </div>
                            
                            ) : (
                                <div className="text-center">
                                    <img
                                    src={`/api/v1/product/product-photo/${id}`}
                                    alt="product_photo"
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
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        
                        <div className="mb-3">
                            <input
                                type="number"
                                value={quantity}
                                placeholder="write a quantity"
                                className="form-control"
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>
                        {/* <Select
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
                        </Select> */}

                        <Select
                            bordered={false}
                            placeholder="Select a Collection"
                            size="medium"
                            showSearch
                            className="form-select mb-3"
                            onChange={(value) => {
                                setCollectiongroup(value);
                            }}
                            value={collectiongroup}
                        >
                            {collectiongroups?.map((c) => (
                                <op key={c._id} value={c._id}>
                                    {c.name}
                                </op>
                            ))}
                        </Select>
                        {/* <div className="mb-3">
                            <Select
                                bordered={false}
                                placeholder="Select Shipping "
                                size="medium"
                                showSearch
                                className="form-select mb-3"
                                onChange={(value) => {
                                    setShipping(value);
                                }}
                                value={shipping ? "yes" : "No"}
                            >
                                <Option value="0">No</Option>
                                <Option value="1">Yes</Option>
                            </Select>
                        </div> */}
                        </div>

                        <div className="mb-3">
                            <button className="btn-update-product" onClick={handleUpdate}>
                            UPDATE PRODUCT
                            </button>
                        </div>
                        <div className="mb-3">
                            <button className="btn-delete-product" onClick={handleDelete}>
                            DELETE PRODUCT
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        
    </LayoutAdmin>
    )
}

export default UpdateProduct