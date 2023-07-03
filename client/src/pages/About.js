import React from "react";
import Layout from "./../components/Layout/Layout";
import {BsFillCalendar2HeartFill} from "react-icons/bs";

const About = () => {
  return (
    <Layout title = {"About us - a.piece-of-myth"}>
      <div className="row aboutus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="aboutus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-5">
          <h1 className="title-aboutus">a.piece-of-myth คืออะไร</h1>
          <h4 className="aboutus-heading">
            <BsFillCalendar2HeartFill/> a.piece-of-myth
          </h4>
          <h5 className="aboutus-text">
            เป็นระบบร้านค้าขายสินค้าประเภท Postcard Poster ของศิลปินที่เราชื่นชอบ ใครใคร่จะซื้อแบบไหนเลือกเอาแบบที่ชอบได้เลยจ้า
          </h5>
          
        </div>
      </div>
    </Layout>
  );
};

export default About;