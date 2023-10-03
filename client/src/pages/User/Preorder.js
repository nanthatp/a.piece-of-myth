import React, { useEffect, useState } from 'react'
import UserMenu from '../../components/Layout/UserMenu'
import LayoutAdmin from "./../../components/Layout/LayoutAdmin";
import axios from 'axios'
import { useAuth } from '../../context/auth'
import moment from 'moment'

function Preorder() {
    const [ preorder, setPreorder ] = useState([]);
    const [ preorders, setPreorders ] = useState("");
    const [ auth, setAuth ] = useAuth();
    

    const getPreorder = async () => {
        try{
            const { data } = await axios.get("/api/v1/auth/preorders")
            setPreorder(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (auth?.token) getPreorder();
    }, [auth?.token]);
    return (
      <>
      <LayoutAdmin title={"My Orders"}>
      <div className="row dashboard">
          <div className="col-md-3">
          <UserMenu />
          </div>
          <div className="col py-3">
          <h1 className="text-center">All Pre Orders</h1>
          {preorder?.map((o, i) => {
              return (
                <div className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col"> date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).format('YYYY-MM-DD hh:mm:ss')}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.quantity}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.preproduct?.map((p) => (
                      <div className="row mb-2 p-3 card flex-row" key={p._id}>
                        <div className="col-md-4">
                          <img
                            src={`/api/v1/preproduct/preproduct-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            // width="100px"
                            // height={"100px"}
                          />
                        </div>
                        <div className="col-md-8">
                          <p>{p.name}</p>
                          <p>{p.description.substring(0, 30)}</p>
                          <p>Price : {p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
  
      </div>
      </LayoutAdmin>
      </>
      
  );
};

export default Preorder