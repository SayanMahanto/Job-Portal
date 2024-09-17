import React from "react";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";

const HomePage = () => {
  return (
    <div className="container">
      <video autoPlay muted loop id="bgVideo">
        <source src="/assets/videos/bg_video.mp4" type="video/mp4" />
      </video>
      <div className="content">
        <div className="card homeCard w-25">
          <div className="homeWelcome">
            <img src="/assets/images/logo/job_logo1.png" alt="logo" />
            <h3>JobiFy</h3>
          </div>

          <div className="card-body" style={{ marginTop: "-20px" }}>
            <hr />
            <h5
              className="card-title"
              style={{
                textAlign: "center",
                fontSize: "25px",
                fontWeight: "600",
              }}
            >
              Welcome to Job Portal
            </h5>
            <p className="card-text" style={{ textAlign: "center" }}>
              Search and manage your jobs with ease. <br /> Free and open source
              job portal by{" "}
              <Link
                to="https://sayanmahanto.github.io/Portfolio-Website/"
                style={{ textDecoration: "none" }}
              >
                Sayan.
              </Link>
            </p>
            <hr />
            <div className="d-flex mt-5 justify-content-between ">
              <p>
                Not a User?{" "}
                <Link to="/Register" className="regLink">
                  Register
                </Link>
              </p>
              <p>
                <Link to="/Login" className="myBTN">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
