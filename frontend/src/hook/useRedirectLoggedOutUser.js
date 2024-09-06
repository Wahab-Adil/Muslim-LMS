import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  userLoginStatus,
  selectIsLoggedIn,
} from "../store/auth/user/userSlice";
import { toast } from "react-toastify";

const useRedirectLoggedOutUser = (path) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const expiryTime = decodedToken.exp * 1000; // Convert to milliseconds

          if (Date.now() < expiryTime) {
            if (!isLoggedIn) {
              // Fetch login status if not already logged in
              await dispatch(userLoginStatus());
            }
          } else {
            // Token is expired
            localStorage.removeItem("token");
            toast.info("Session expired, please login to continue.");
            navigate(path);
          }
        } catch (error) {
          localStorage.removeItem("token");
          toast.error("An error occurred while processing your token.");
          navigate(path);
        }
      } else {
        // No token present, redirect to login page
        toast.info("No active session found, please login.");
        navigate(path);
      }
    };

    checkLoginStatus();
  }, [dispatch, isLoggedIn, navigate, path]);
};

export default useRedirectLoggedOutUser;
