import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate } from "react-router-dom";
import "../../styles/CreateProduct.css"
const { Option } = Select;

const CreateProduct = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [members, setMembers] = useState([]);
    const [artists, setArtists] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [photo, setPhoto] = useState("");
    const [artist, setArtist] = useState("");
    const [member, setMember] = useState("");
    const [shipping, setShipping] = useState("");

    //get all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/get-category");
            if (data?.success) {
            setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting catgeory");
        }
    }; 

    //get all artist
    const getAllArtist = async () => {
        try {
            const { data } = await axios.get("/api/v1/artist/get-artist");
            if (data?.success) {
            setArtists(data?.artist);
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

    //create product function
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("category", category);
            productData.append("quantity", quantity);
            productData.append("photo", photo);
            productData.append("artist", artist);
            productData.append("member", member);
            const { data } = axios.post(
                "/api/v1/product/create-product",
                productData
            );
            if (data?.success) {
                toast.error(data?.message);
            } else {
                toast.success("Product Created Successfully");
                navigate("/dashboard/admin/products");
            }
        } catch (error) {
        console.log(error);
        toast.error("something went wrong");
        }
    };

    return (
    <Layout title={"Dashboard - Create Category"}>
        <div className="row dashboard">
            <div className="col-md-3">
                <AdminMenu />
            </div>
            <div className="col-sm text-center">
                <h1>Manage Artist</h1>
                <div className="container product-form">
                <div className="row justify-content-center new-product">
                <h2>New Artist</h2>
                </div>
                
            </div>
                <div className="container text-center  create-product">
                    <div className="row justify-content-evenly">
                    <div class="col-4 add-photo">
                        <div className="mb-3">
                            <label className="btn-upload-photo col-md-12">
                                {photo ? photo.name : "Upload Loco"}
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
                            {photo && (
                                <div className="text-center">
                                    <img
                                        src={URL.createObjectURL(photo)}
                                        alt="loco_photo"
                                        height={"200px"}
                                        className="img img-responsive"
                                    />
                                </div>
                            )}
                        </div>
                        </div>
                    <div class="col-4">
                        <div className="mb-3">
                                <textarea
                                    type="text"
                                    value={name}
                                    placeholder="write a name artist"
                                    className="form-control"
                                    onChange={(e) => setName(e.target.value)}
                                />
                        </div>

                        <div className="mb-3">
                            <textarea
                                type="text"
                                value={description}
                                placeholder="write a description"
                                className="form-control"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>
                    </div>
                    <div className="mb-3">
                            <button className="btn-create-product" onClick={handleCreate}>
                            CREATE ARTIST
                            </button>
                    </div>
                    </div>
                </div>
            </div>

        
        
    </Layout>


);
};

export default CreateProduct