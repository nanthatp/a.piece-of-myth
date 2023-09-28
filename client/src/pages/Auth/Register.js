import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout';
import { toast } from 'react-toastify';
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import { Radio } from 'antd';
import "../../styles/User.css"
const Register= () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [password,setPassword] = useState(""); 
    const navigate = useNavigate();

    //form function
    const handleSumit = async (e) => {
        e.preventDefault();
        console.log(name,email,phone,password);
        toast.success("Register Successfully")
        try {
            const res = await axios.post("/api/v1/auth/register", {
                name,
                email,
                phone,
                password
            });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                navigate("/login");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };
    console.log(process.env.REACT_APP_API);
    return (
        <Layout title = "Register - a.piece-of-myth">
            <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col col-xl-10">
        <div className="card2" style={{ borderRadius: "1rem" , marginTop: "80px" }}>
        <div className="row g-0">
        <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                        src="https://cdn.discordapp.com/attachments/417585852206809090/1140335973880832130/hghlk.jpg"
                        alt="login form"
                        className="img-fluid"
                        style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                    </div>
            <div className="col-md-6 col-lg-7 d-flex align-items-center">
            <div className="card-body p-4 p-lg-5 text-black">
                <form onSubmit={handleSumit}>
                    <h4 className='title-register'>CREATE AN ACCOUNT</h4>
                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <div className="mb-3">
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    id="exampleInputEmail1" 
                                    placeholder="Enter Your Email"
                                    className="form-control"
                                    required
                                />  
                                
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="mb-3">
                                <input 
                                    type="text" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    id="Name" 
                                    className="form-control" 
                                    placeholder="Enter Your Name"
                                    required
                                />
                                
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <div className="mb-3">
                                <input 
                                    type="text" 
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="form-control" 
                                    id="exampleInputEmail1" 
                                    placeholder="Enter Your Phone"
                                    required
                                />
                                
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="mb-3">
                                <input 
                                    type="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="form-control" 
                                    id="exampleInputPassword1"
                                    placeholder="Enter Your Password" 
                                    required
                                />
                            </div>
                        </div>
                    </div>

                        <div className="mb-3">
                        <div className="d-flex justify-content">
                            <button 
                                type="submit"
                                className="btn-register"
                            >
                                REGISTER
                            </button>
                        </div>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
            
        </Layout>
    )
}

export default Register