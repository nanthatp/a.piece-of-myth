import React from 'react';
import {Link} from 'react-router-dom';
import { BsFillHouseHeartFill } from "react-icons/bs";
import { BsFillEnvelopeHeartFill } from "react-icons/bs";
import { BsFillTelephoneFill } from "react-icons/bs";


const Footer = () => {
  return (
    // <div className='footer'>
    //     <h4 className='text-center'>All Right Reserved  &copy; Happiness Club</h4>
    //     <p className='text-center mt-3'>
    //     </p>
    //     <p className='text-center mt-3'>
    //       <Link to='/about'>About</Link>|
    //       <Link to='/contact'>Contact</Link>
    //       <Link to='/policy'>Privacy Policy</Link>
    //     </p>
    // </div>

    <div className="text-white text-center text-lg-start footer">
      {/* Grid container */}
      <div className="container p-4">
        {/*Grid row*/}
        <div className="row">
          {/*Grid column*/}
          <div className="col-md-6 mt-md-0 mt-3 footer-brand">
            <span>Happiness</span> Club  
            <p>
            Happiness Club is an authorized distributor of SM Town and store     in Thailand market.
            Customer will receive the official merchandise and best service from our staff!
            </p>
          </div>
          {/*Grid column*/}
          {/*Grid column*/}
          <hr className="clearfix w-5000 d-md-none pb-6" />

          {/*Grid column*/}
          {/*Grid column*/}
          <div className="col-md-6 mb-md-0 mb-3 footer-contact">
            <h5 className="text-uppercase mb-0">CONTACT US</h5>
            <ul className="list-unstyled">
              <li>
                <span> <BsFillHouseHeartFill/> </span> 555 Muang, Nakhon Ratchasima 30000
              </li>
              <li>
                <span> <BsFillEnvelopeHeartFill/> </span> apieceofmyth@gmail.com
              </li>
              <li>
                <span> <BsFillTelephoneFill/> </span> 09 9123 4567
              </li>
            </ul>
          </div>
          {/*Grid column*/}
        </div>
        {/*Grid row*/}
      </div>
      {/* Grid container */}
      {/* Copyright */}
      <div className="text-center p-3 all-right" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
        <h4 className='text-center'>All Right Reserved  &copy; Happiness Club</h4>
      </div>
      {/* Copyright */}
    </div>

  )
}

export default Footer