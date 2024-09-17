import React, { useState } from "react";
import InputForm from "../components/shared/InputForm";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Login.css";
import { hideLoading, showLoading } from "../redux/features/alertSlice.js";
import Spinner from "../components/shared/Spinner.js";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // redux state
  const { loading } = useSelector((state) => state.alerts);

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const { data } = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (data.success) {
        dispatch(hideLoading());
        localStorage.setItem("token", data.token);
        toast.success("Login Successfully");
        navigate("/dashboard");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Invalid credentials");
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="form-body">
          <div className="form-container">
            <form className="card p-3 form-card" onSubmit={handleSubmit}>
              <div className="register-content">
                <div className="login-welcome">
                  <img
                    src="/assets/images/logo/job_logo1.png"
                    alt="logo"
                    height={40}
                    width={40}
                  />
                  <h1 className="form-h1">Login To JobiFy</h1>
                </div>
                <InputForm
                  mb={"mb-1 mt-3"}
                  htmlFor="email"
                  labelText={"Email Address"}
                  type={"email"}
                  value={email}
                  handleChange={(e) => setEmail(e.target.value)}
                  name="email"
                />
                <InputForm
                  mb={"mb-3"}
                  htmlFor="password"
                  labelText={"Password"}
                  type={"password"}
                  value={password}
                  handleChange={(e) => setPassword(e.target.value)}
                  name="password"
                />
                <div className="d-flex justify-content-between align-items-center">
                  <p className="form-submit-p">
                    Not Yet Registered? <Link to={"/Register"}>Register</Link>
                  </p>
                  <button type="submit" className="btn btn-secondary">
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
