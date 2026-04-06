import React from 'react';

function Footer() {
  return (
    <div>
      <div className="container-fluid bg-dark text-light footer pt-5 mt-5">
        <div className="container py-5">
          <div className="row g-5">

            {/* Company */}
            <div className="col-lg-3 col-md-6">
              <h4 className="section-title text-start text-warning fw-bold mb-4">Company</h4>
              <a className="btn btn-link footer-link" href="#">About Us</a>
              <a className="btn btn-link footer-link" href="#">Contact Us</a>
              <a className="btn btn-link footer-link" href="#">Reservation</a>
              <a className="btn btn-link footer-link" href="#">Privacy Policy</a>
              <a className="btn btn-link footer-link" href="#">Terms & Conditions</a>
            </div>

            {/* Contact */}
            <div className="col-lg-3 col-md-6">
              <h4 className="section-title text-start text-warning fw-bold mb-4">Contact</h4>
              <p className="mb-2">
                <i className="fa fa-map-marker-alt me-3"></i>123 Street, New York, USA
              </p>
              <p className="mb-2">
                <i className="fa fa-phone-alt me-3"></i>+012 345 67890
              </p>
              <p className="mb-2">
                <i className="fa fa-envelope me-3"></i>info@example.com
              </p>

              <div className="d-flex pt-2">
                <a className="btn btn-outline-light btn-social me-2" href="#">
                  <i className="fab fa-twitter"></i>
                </a>
                <a className="btn btn-outline-light btn-social me-2" href="#">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a className="btn btn-outline-light btn-social me-2" href="#">
                  <i className="fab fa-youtube"></i>
                </a>
                <a className="btn btn-outline-light btn-social" href="#">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>

            {/* Opening */}
            <div className="col-lg-3 col-md-6">
              <h4 className="section-title text-start text-warning fw-bold mb-4">Opening Hours</h4>
              <h5 className="text-light fw-normal">Monday - Saturday</h5>
              <p>09:00 AM - 09:00 PM</p>
              <h5 className="text-light fw-normal">Sunday</h5>
              <p>10:00 AM - 08:00 PM</p>
            </div>

            {/* Newsletter */}
            <div className="col-lg-3 col-md-6">
              <h4 className="section-title text-start text-warning fw-bold mb-4">Newsletter</h4>
              <p>Subscribe to get the latest updates & offers.</p>
              <div className="position-relative mx-auto" style={{ maxWidth: 400 }}>
                <input
                  className="form-control border-warning rounded-pill w-100 py-3 ps-4 pe-5"
                  type="email"
                  placeholder="Your email"
                />
                <button
                  type="button"
                  className="btn btn-warning rounded-pill py-2 position-absolute top-0 end-0 mt-2 me-2 text-dark fw-bold"
                >
                  Sign Up
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Area */}
        <div className="container text-center border-top border-secondary pt-3">
          <p className="mb-0">
            © <strong className="text-warning">Your Restaurant</strong>. All Rights Reserved.
          </p>
          <div className="footer-menu mt-2">
            <a href="#" className="footer-link">Home</a>
            <a href="#" className="footer-link">Cookies</a>
            <a href="#" className="footer-link">Help</a>
            <a href="#" className="footer-link">FAQs</a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Footer;
