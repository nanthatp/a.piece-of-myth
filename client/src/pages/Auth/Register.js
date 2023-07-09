import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout';
import { toast } from 'react-toastify';
import axios from "axios";
import {useNavigate} from 'react-router-dom'
const Register= () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    //form function
    const handleSumit = async (e) => {
        e.preventDefault();
        // console.log(name,email,phone,password);
        //  toast.success("Register Successfully")
        try {
            const res = await axios.post("/api/v1/auth/register", {
              name,
              email,
              phone,
              password,
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
    
  return (
    <Layout title = "Register - a.piece-of-myth">
        <div className="register">
            
                <h1>CREATE AN ACCOUNT</h1>
                <form onSubmit={handleSumit}>
            
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <div className="mb-3">
                            <label className="form-label" htmlFor="firstName">
                                Name
                            </label>
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
                    <div className="col-md-6 mb-4">
                        <div className="mb-3">
                            <label className="form-label" htmlFor="email">
                                Email
                            </label>
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
                </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            phone number
                        </label>
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
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Password
                        </label>
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
                    <div className="d-flex justify-content-center">
                    <button 
                        type="submit"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                    >
                        Register
                    </button>
                    </div>
                </form>
            </div>
        
    </Layout>
  )
}

export default Register