import React from "react";
import { Link } from "react-router-dom";
import Layout from "./../components/Layout/Layout";
import { BsCheckCircleFill } from "react-icons/bs";


function DownloadedCsvPage() {
    return (
        <Layout title = {"Downloaded CSV"}>
          <div className="pnf">
            <h1 className="center">Downloaded csv file Successfully</h1>
            <div className=" center ">
                <BsCheckCircleFill color="#0DA574" style={{ fontSize: '200px' }}/>
            </div>
            {/* <Link to="/" className="pnf-btn">
              Go Back
            </Link> */}
          </div>
        </Layout>
      );
}

export default DownloadedCsvPage