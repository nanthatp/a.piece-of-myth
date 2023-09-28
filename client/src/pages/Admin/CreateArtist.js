import React, { useEffect, useState } from 'react'
import LayoutAdmin from "./../../components/Layout/LayoutAdmin";
import AdminMenu from '../../components/Layout/AdminMenu'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate } from "react-router-dom";
import {BsCloudUploadFill} from "react-icons/bs";
import "../../styles/CreateProduct.css"
const { Option } = Select;


const CreateProduct = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("");
    const [member, setMember] = useState("");




    //create artist function
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const artistData = new FormData();
            artistData.append("name", name);
            artistData.append("photo", photo);
            artistData.append("member", member);
            const { data } = axios.post(
                "/api/v1/artist/create-artist",
                artistData
            );
            if (data?.success) {
                toast.error(data?.message);
            } else {
                toast.success("Artist Created Successfully");
                navigate("/dashboard/admin/artists");
            }
        } catch (error) {
        console.log(error);
        toast.error("something went wrong");
        }
    };

    return (
    <LayoutAdmin title={"Dashboard - Create Category"}>
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
                    <div className="col-4 add-photo">
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
                    <div className="col-4">
                        <div className="mb-3">
                                <textarea
                                    type="text"
                                    value={name}
                                    placeholder="write a name artist"
                                    className="form-control"
                                    onChange={(e) => setName(e.target.value)}
                                />
                        </div>

                        {/* <div className="mb-3">
                            <textarea
                                type="text"
                                value={member}
                                placeholder="write a name member"
                                className="form-control"
                                onChange={(e) => setMember(e.target.value)}
                            />
                        </div> */}
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

        
        
    </LayoutAdmin>


);
};

export default CreateProduct