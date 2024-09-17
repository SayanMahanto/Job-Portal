import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../styles/Layout.css";
import { userMenu } from "./Menu/UserMenu";
import { toast } from "react-toastify";
import UserName from "../../components/Layout/Menu/UserName.js";

const Layout = ({ children }) => {
  const sidebarMenu = userMenu;
  const location = useLocation();
  const navigate = useNavigate();

  //   logout handler
  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logout Successfully");
    navigate("/login");
  };

  return (
    <>
      <div className="row">
        <div className="col-md-3 sidebar">
          <div className="logo">
            <h6>JOB PORTAL</h6>
          </div>
          <hr />
          <UserName></UserName>
          <hr />
          <div className="menu">
            {sidebarMenu.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div className={`menu-item ${isActive && "active"}`}>
                  <i className={menu.icon}></i>
                  <Link to={menu.path}>{menu.name}</Link>
                </div>
              );
            })}
            <div className={`menu-item `} onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket"></i>
              <Link to="/login">Logout</Link>
            </div>
          </div>
        </div>

        <div className="col-md-3">{children}</div>
      </div>
    </>
  );
};

export default Layout;
