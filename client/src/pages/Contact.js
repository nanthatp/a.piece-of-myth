import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiSolidPhoneCall, BiSupport } from "react-icons/bi";
import {MdEmail} from "react-icons/md"
const Contact = () => {
  return (
    <Layout title = {"Contact us"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="title-contact">CONTACT US</h1>
          <p className="text-justify mt-2">
            Can I get your number ?
          </p>
          <p className="mt-3">
            <MdEmail /> : apieceofmyth@gmail.com
          </p>
          <p className="mt-3">
            <BiSolidPhoneCall /> : 09812345
          </p>
          <p className="mt-3">
            <BiSupport /> : 123
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;