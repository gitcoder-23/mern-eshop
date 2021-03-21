import React from 'react'
import { Link } from 'react-router-dom'


function Footer() {
    return (
        <>
        <footer id="footer" className="custom-footer" >
        <div className="App1">
    <div class="footer-top">
      <div class="container">
        <div class="row footer-row">

          <div class="col-lg-4 col-md-6 footer-contact">
            <h3>E-Cart</h3>
            <p>
              A108 Adam Street <br/>
              New York, NY 535022<br/>
              United States <br/><br/>
              <strong>Phone:</strong> +1 5589 55488 55<br/>
              <strong>Email:</strong> info@example.com<br/>
            </p>
          </div>

          <div class="col-lg-4 col-md-6 footer-links">
            <h3>Locate Us</h3>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.03536451245!2d-74.00945268463481!3d40.71723797933139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQzJzAyLjEiTiA3NMKwMDAnMjYuMiJX!5e0!3m2!1sen!2sin!4v1616307264824!5m2!1sen!2sin"  className="iframe_map" style={{border: "0" }} allowfullscreen="" loading="lazy"></iframe>
          </div>
{/* 
          <div class="col-lg-3 col-md-6 footer-links">
            <h4>Our Services</h4>
            <ul>
              <li><i class="bx bx-chevron-right"></i> <Link href="#">Web Design</Link></li>
              <li><i class="bx bx-chevron-right"></i> <Link href="#">Web Development</Link></li>
              <li><i class="bx bx-chevron-right"></i> <Link href="#">Product Management</Link></li>
              <li><i class="bx bx-chevron-right"></i> <Link href="#">Marketing</Link></li>
              <li><i class="bx bx-chevron-right"></i> <Link href="#">Graphic Design</Link></li>
            </ul>
          </div> */}

          <div class="col-lg-4 col-md-6 footer-links">
            <h3>Our Social Networks</h3>
            <p>Cras fermentum odio eu feugiat lide par naso tierra videa magna derita valies</p>
            <div class="social-links mt-3">
              <Link href="#" class="twitter"><i class="fab fa-twitter-square" /></Link>
              <Link href="#" class="facebook"><i class="fab fa-facebook-square" /></Link>
              <Link href="#" class="linkedin"><i class="fab fa-linkedin" /></Link>
            </div>
          </div>

        </div>
      </div>
    </div>
    </div>
    <div className="App1">
    <div class="container py-4">
      <div class="copyright">
        © Copyright <strong><span>E-Cart</span></strong>. All Rights Reserved
      </div>
      <div class="credits">
        Developed by <Link href="#">E-Cart</Link>
      </div>
    </div>

    </div>
  </footer>

  </>
    )
};

export default Footer;
