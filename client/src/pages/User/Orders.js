// import React, { useEffect, useState } from 'react'
// import Layout from '../../components/Layout/Layout'
// import UserMenu from '../../components/Layout/UserMenu'
// import { useAuth } from '../../context/auth'
// import axios from 'axios'

// const Orders = () => {
//     const [orders, setOrders] = useState([])
//     const [auth, setAuth] = useAuth()

//     const getOrder = async()=>{
//         try {
//             const {data} = await axios.get("/api/v1/auth/orders")
//             setOrders(data)
//         } catch (error) {
//             console.log(error)
//         }
//     };
//     useEffect(() =>{
//         if(auth?.token) getOrder()
//     },[auth?.token]);
//     return (
//         <Layout title={"Your Orders"}>
//                 <div className="container-fluid m-3 p-3 dashboard">
//                 <div className="row">
//                 <div className="col-md-3">
//                     <UserMenu/>
//                 </div>
//                 <div className="col-md-9">
//                     <h1 className="text-center">All Orders</h1>
//                     <p>{JSON.stringify(orders, null,4)}</p>
//                 </div>
//                 </div>
//             </div>
//         </Layout>
//     )
// }

// export default Orders