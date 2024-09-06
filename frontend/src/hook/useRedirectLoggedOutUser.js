import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
    const redirectLoggedOutUser = async () => {
      try {
        await dispatch(userLoginStatus());

        if (!isLoggedIn) {
          toast.info("Session expired, please login to continue.");
          navigate(path);
        }
      } catch (error) {
        toast.error("An error occurred while checking your login status.");
      }
    };

    redirectLoggedOutUser();
  }, [dispatch, isLoggedIn, navigate, path]);
};

export default useRedirectLoggedOutUser;
