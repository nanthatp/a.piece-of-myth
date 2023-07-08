import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout';
import { toast } from 'react-toastify';
const Register= () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [password,setPassword] = useState("");

    //form function
    const handleSumit = (e) => {
        e.preventDefault();
        console.log(name,email,phone,password);
         toast.success("Register Successfully")
    }
  return (
    <Layout title = "Register - a.piece-of-myth">
        <div className="register">
            <h1>Register Page</h1>
            <form onSubmit={handleSumit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Name
                    </label>

                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control" 
                        id="exampleInputEmail1"
                        placeholder="Enter Your Name" 
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Email
                    </label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control" 
                        id="exampleInputEmail1" 
                        placeholder="Enter Your Email"
                        required
                    />
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
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    </Layout>
  )
}

export default Register