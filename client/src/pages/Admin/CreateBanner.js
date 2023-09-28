import React, { useEffect, useState } from 'react'
import LayoutAdmin from "./../../components/Layout/LayoutAdmin";
import AdminMenu from '../../components/Layout/AdminMenu'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate } from "react-router-dom";
import "../../styles/CreateBanner.css"

const { Option } = Select;

const CreateBanner = () => {
    const navigate = useNavigate();

    const [artists, setArtists] = useState([]);
    const [collectiongroups, setCollectiongroups] = useState([]);
    const [name, setName] = useState("");
    const [file, setFile] = useState("");
    const [collectiongroup, setCollectiongroup] = useState("");
    const [artist, setArtist] = useState("");
    
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

    
    //get all collection group
    const getCollectiongroup = async () => {
        try {
            const { data } = await axios.get("/api/v1/collectiongroup/get-collectiongroup");
            if (data?.success) {
                setCollectiongroups(data?.collectiongroup);
                }
        }catch(error){
            console.log(error);
            toast.error("Something went wrong in getting collection groups");
        }
    }


    useEffect(() => {
        getAllArtist();
        getCollectiongroup();
    }, []);

    //create banner function
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const bannerData = new FormData();
            bannerData.append("name", name);
            file && bannerData.append("file", file);
            bannerData.append("artist", artist);
            bannerData.append("collectiongroup", collectiongroup);
            const { data } = axios.post(
                "/api/v1/banner/create-banner",
                bannerData
            );
            if (data?.success) {
                toast.error(data?.message);
                window.location.reload();
            } else {
                toast.success("Banner Created Successfully");
                navigate("/dashboard/admin/banners");
            }
        } catch (error) {
        console.log(error);
        toast.error("something went wrong");
        }
    };

    return (
    <LayoutAdmin title={"Dashboard - Create Banner"}>
        <div className="row dashboard">
            <div className="col-md-3">
                <AdminMenu />
            </div>
            <div className="col-sm text-center">
                <h1>Manage Banner</h1>
                <div className="container banner-form">
                <div className="row justify-content-center new-banner">
                <h2>New Banner</h2>
                </div>
                
            </div>
                <div className="container text-center  create-banner">
                    <div className="row justify-content-evenly">
                    <div className="col-6 add-file">
                        <div className="mb-3">
                                <textarea
                                    type="text"
                                    value={name}
                                    placeholder="write a name"
                                    className="form-control"
                                    onChange={(e) => setName(e.target.value)}
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
                            >
                                {artists?.map((c) => (
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ))}
                        </Select>

                        <Select
                            bordered={false}
                            placeholder="Select a Collection group"
                            size="medium"
                            showSearch
                            className="form-select mb-3"
                            onChange={(value) => {
                                setCollectiongroup(value);
                            }}
                        >
                            {collectiongroups?.map((c) => (
                                <Option key={c._id} value={c._id}>
                                    {c.name}
                                </Option>
                            ))}
                        </Select>

                        <div className="mb-3">
                            <label className="btn-upload-file col-md-12">
                                {file ? file.name : "Upload Banner"}
                                <input
                                    type="file"
                                    name="file"
                                    accept="Video*/"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    hidden
                                />
                            </label>
                        </div>
                        <div className="mb-3">
                            {file && (
                                <div className="text-center">
                                    <video
                                        src={URL.createObjectURL(file)}
                                        alt="File"
                                        width="420" height="240" autoPlay loop muted playsInline 
                                        className="back-video"
                                    /> 
                                </div>
                            )}
                        </div>
                        </div>
                        <div className="mb-3">
                            <button className="btn-create-banner" onClick={handleCreate}>
                            CREATE BANNER
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        
    </LayoutAdmin>


);
};

export default CreateBanner