import React, { useEffect, useState } from 'react'
import LayoutAdmin from "./../../components/Layout/LayoutAdmin";
import AdminMenu from '../../components/Layout/AdminMenu'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import {AiOutlineCloudUpload} from "react-icons/ai";

import "../../styles/CreateBanner.css"

const { Option } = Select;

const CreateBanner = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [artists, setArtists] = useState([]);
    const [collectiongroups, setCollectiongroups] = useState([]);
    const [name, setName] = useState("");
    const [file, setFile] = useState("");
    const [artist, setArtist] = useState("");
    const [collectiongroup, setCollectiongroup] = useState("");
    const [id, setId] = useState("");


    //get single banner
    const getSingleBanner = async () => {
    try {
        const { data } = await axios.get(
            `/api/v1/banner/get-banner/${params.slug}`
        );
        setName(data.banner.name);
        setId(data.banner._id);
        setArtist(data.banner.artist._id);
        setCollectiongroup(data.banner.collectiongroup);
        
    }catch (error) {
        console.log(error);
    }
    };
    useEffect(() => {
        getSingleBanner();
        //eslint-disable-next-line
    }, []);

    
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


    useEffect(() => {
        getAllArtist();
        getCollectiongroup();
    }, []);

    //update banner function
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (name === "") {
            // กรณีชื่อศิลปินเป็นค่าว่าง
            Swal.fire({
                position: 'top-center',
                icon: 'warning',
                title: 'Warning!',
                text: 'Please enter a name',
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
        if (file === "") {
            // กรณีชื่อศิลปินเป็นค่าว่าง
            Swal.fire({
                position: 'top-center',
                icon: 'warning',
                title: 'Warning!',
                text: 'Please enter video',
                showConfirmButton: false,
                timer: 3000
            });
            return;
        }
        try {
            const bannerData = new FormData();
            bannerData.append("name", name);
            file && bannerData.append("file", file);
            bannerData.append("artist", artist);
            bannerData.append("collectiongroup", collectiongroup);
            const { data } = axios.put(
                `/api/v1/banner/update-banner/${id}`,
                bannerData
            );
            if (data?.success) {
                toast.error(data?.message);
            } else {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Updated!',
                    text: 'Banner information has been updated.',
                    showConfirmButton: false,
                    timer: 3500
                })
                navigate("/dashboard/admin/banners");
            }
        } catch (error) {
        console.log(error);
        toast.error("something went wrong");
        }
    };

      //delete a banner
    const handleDelete = async () => {
        try {
            let answer = window.prompt("Are You Sure want to delete this banner ? ");
            if (!answer) return;
            const { data } = await axios.delete(
                `/api/v1/banner/delete-banner/${id}`
            );
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Deleted!',
                text: 'Banner has been deleted.',
                showConfirmButton: false,
                timer: 2500
            })
            navigate("/dashboard/admin/banners");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
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

                        <div className="mb-3">
                            <label className="btn-upload-photo col-md-12">
                            <AiOutlineCloudUpload style={{ fontSize: '25px' ,marginRight:'5px'}}/>{file ? file.name : "Upload Banner"}
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
                            {file ? (
                                <div className="text-center">
                                    <video
                                        src={URL.createObjectURL(file)}
                                        alt="File"
                                        width="420" height="240" autoPlay loop muted playsInline 
                                        className="back-video"
                                    />
                                </div>
                            ) : (
                                <div className="text-center">
                                    <video
                                        src={`/api/v1/banner/banner-photo/${id}`}
                                        alt="File"
                                        width="420" height="240" autoPlay loop muted playsInline 
                                        className="back-video"
                                    />
                                </div>
                            )}
                        </div>
                        </div>
                        <div className="mb-3">
                            <button className="btn-update-banner" onClick={handleUpdate}>
                            UPDATE BANNER
                            </button>
                        </div>
                        <div className="mb-3">
                            <button className="btn-delete-banner" onClick={handleDelete}>
                            DELETE BANNER
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