import { Outlet, Navigate } from "react-router-dom";

const ProtectAdmin = () => {
  const IsAdmin = localStorage.getItem("IsAdmin");

  console.log("isAdmin", IsAdmin);
  return IsAdmin === "admin" ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectAdmin;
