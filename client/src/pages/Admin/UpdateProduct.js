import React, { useEffect, useState } from 'react'
import LayoutAdmin from "./../../components/Layout/LayoutAdmin";
import AdminMenu from '../../components/Layout/AdminMenu'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import {BiSolidEdit} from "react-icons/bi";

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
    const [status, setStatus] = useState([
        "Visible",
        "Invisible",
    ]);
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
            setStatus(data.product.status);
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
        if (name === "") {
            // กรณีชื่อศิลปินเป็นค่าว่าง
            Swal.fire({
                position: 'top-center',
                icon: 'warning',
                title: 'Warning!',
                text: 'Please enter name',
                showConfirmButton: false,
                timer: 3000
            });
            return;
        }
        // if (photo === "") {
        //     // กรณีชื่อศิลปินเป็นค่าว่าง
        //     Swal.fire({
        //         position: 'top-center',
        //         icon: 'warning',
        //         title: 'Warning!',
        //         text: 'Please enter product image',
        //         showConfirmButton: false,
        //         timer: 3000
        //     });
        //     return;
        // } 
        if (description === "") {
            // กรณีชื่อศิลปินเป็นค่าว่าง
            Swal.fire({
                position: 'top-center',
                icon: 'warning',
                title: 'Warning!',
                text: 'Please enter description',
                showConfirmButton: false,
                timer: 3000
            });
            return;
        }
        if (price === "") {
            // กรณีชื่อศิลปินเป็นค่าว่าง
            Swal.fire({
                position: 'top-center',
                icon: 'warning',
                title: 'Warning!',
                text: 'Please enter price',
                showConfirmButton: false,
                timer: 3000
            });
            return;
        }
        if (category === "") {
            // กรณีชื่อศิลปินเป็นค่าว่าง
            Swal.fire({
                position: 'top-center',
                icon: 'warning',
                title: 'Warning!',
                text: 'Please select category',
                showConfirmButton: false,
                timer: 3000
            });
            return;
        }
        if (collectiongroup === "") {
            // กรณีชื่อศิลปินเป็นค่าว่าง
            Swal.fire({
                position: 'top-center',
                icon: 'warning',
                title: 'Warning!',
                text: 'Please select collection',
                showConfirmButton: false,
                timer: 3000
            });
            return;
        }
        if (quantity === "") {
            // กรณีชื่อศิลปินเป็นค่าว่าง
            Swal.fire({
                position: 'top-center',
                icon: 'warning',
                title: 'Warning!',
                text: 'Please enter quantity',
                showConfirmButton: false,
                timer: 3000
            });
            return;
        }
        if (artist === "") {
            // กรณีชื่อศิลปินเป็นค่าว่าง
            Swal.fire({
                position: 'top-center',
                icon: 'warning',
                title: 'Warning!',
                text: 'Please select artist',
                showConfirmButton: false,
                timer: 3000
            });
            return;
        }
        
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
            productData.append("status", status);
            // productData.append("member", member);
            const { data } = axios.put(
                `/api/v1/product/update-product/${id}`,
                productData
            );
            if (data?.success) {
                toast.error(data?.message);
            } else {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Updated!',
                    text: 'Product information has been updated.',
                    showConfirmButton: false,
                    timer: 3500
                })
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
            let answer = window.prompt("Are you sure?");
            if (!answer) return;
            const { data } = await axios.delete(
                `/api/v1/product/delete-product/${id}`
            );
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Deleted!',
                text: 'Product has been deleted.',
                showConfirmButton: false,
                timer: 2500
            })
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
                            <BiSolidEdit style={{ fontSize: '25px' ,marginRight:'5px'}}/>{photo ? photo.name : "Edit photo"}
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
                                    placeholder="Enter name"
                                    className="form-control"
                                    onChange={(e) => setName(e.target.value)}
                                />
                        </div>

                        <div className="mb-3">
                            <input
                                type="number"
                                value={price}
                                placeholder="Enter price"
                                className="form-control"
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <Select
                            bordered={false}
                            placeholder="Select artist"
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
                            placeholder="Select category"
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
                                placeholder="Enter description"
                                className="form-control"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        
                        <div className="mb-3">
                            <input
                                type="number"
                                value={quantity}
                                placeholder="Enter quantity"
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
                            placeholder="Select collection"
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
                        <div className="mb-3">
                            <Select
                                bordered={false}
                                placeholder="Select status"
                                size="medium"
                                showSearch
                                className="form-select mb-3"
                                onChange={(value) => {
                                    setStatus(value);
                                }}
                                // value={status ? "Visible" : "Invisible"}
                                value={status}
                            >
                                <Option value="Visible">Visible</Option>
                                <Option value="Invisible">Invisible</Option>
                            </Select>
                        </div>
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