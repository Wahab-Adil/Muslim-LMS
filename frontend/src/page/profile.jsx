import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getUserProfile,
  selectUserProfile,
} from "../store/auth/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import baseUrl from "../utils/baseUrl";
import defaultAvatar from "../assets/avatar/Professor.png";
import { useMediaQuery, useTheme } from "@mui/material";

const DropdownComponent = ({ setOpenMenu, openMenu }) => {
  const dispatch = useDispatch();
  const userProfile = useSelector(selectUserProfile);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const theme = useTheme();
  const downSm = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    // Function to handle click outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Add event listener for clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle option click
  const handleOptionClick = () => {
    setIsOpen(false);
    setOpenMenu(!openMenu);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {userProfile?.user?.avatar === "default" ? (
        <img
          alt="User Profile"
          src={defaultAvatar}
          title={userProfile?.user?.name}
          className="object-cover object-center w-10 h-10 rounded-full cursor-pointer"
          onClick={toggleDropdown}
        />
      ) : (
        <img
          alt="User Profile"
          src={baseUrl(userProfile?.user?.avatar, 8)}
          title={userProfile?.user?.name}
          className="object-cover object-center w-10 h-10 rounded-full cursor-pointer"
          onClick={toggleDropdown}
        />
      )}

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mt-2 w-38 bg-white shadow-lg rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            style={{
              zIndex: 3,
              position: "absolute",
              top: downSm ? -100 : -65,
              left: downSm ? -100 : -100,
            }}
          >
            <ul style={{ display: "flex" }} className="list-none p-0 m-0">
              <motion.li
                className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-150 ease-in-out"
                whileHover={{ scale: 1.05 }}
                onClick={handleOptionClick} // Close dropdown on click
              >
                <Link
                  className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-150 ease-in-out"
                  to={`/user/${userProfile?.user?._id}`}
                >
                  <FaUser className="text-lg mr-2 ml-3 text-[#754FFE]" />
                  <span className="text-sm">Profile</span>
                </Link>
              </motion.li>
              <motion.li
                className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-150 ease-in-out"
                whileHover={{ scale: 1.05 }}
                onClick={handleOptionClick} // Close dropdown on click
              >
                <Link className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-150 ease-in-out">
                  <FaSignOutAlt className="text-xl mr-2 ml-3 text-[#754FFE]" />
                  <span>Logout</span>
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownComponent;
