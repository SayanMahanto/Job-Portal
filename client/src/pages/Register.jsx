import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputForm from "../components/shared/InputForm";
import "../styles/Register.css";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice.js";
import axios from "axios";
import Spinner from "../components/shared/Spinner.js";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // redux state
  const { loading } = useSelector((state) => state.alerts);

  // hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !lastname || !email || !password) {
        return alert("Please provide all fields");
      }
      dispatch(showLoading());
      const { data } = await axios.post("/api/v1/auth/register", {
        name,
        lastname,
        email,
        password,
      });
      dispatch(hideLoading());
      if (data.success) {
        toast.success("Registered Successfully");
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Invalid form Details");
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
                <div className="register-welcome">
                  <img
                    src="/assets/images/logo/job_logo1.png"
                    alt="logo"
                    height={40}
                    width={40}
                  />
                  <h1 className="form-h1">Welcome To JobiFy</h1>
                </div>
                <InputForm
                  mb={"mb-1 mt-3"}
                  htmlFor="name"
                  labelText={"Name"}
                  type={"text"}
                  value={name}
                  handleChange={(e) => setName(e.target.value)}
                  name="name"
                />
                <InputForm
                  mb={"mb-1"}
                  htmlFor="lastname"
                  labelText={"Last Name"}
                  type={"text"}
                  value={lastname}
                  handleChange={(e) => setLastName(e.target.value)}
                  name="lastname"
                />
                <InputForm
                  mb={"mb-1"}
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
                    Already Registered? <Link to={"/Login"}>Login</Link>
                  </p>
                  <button type="submit" className="btn btn-secondary">
                    Register
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

export default Register;
