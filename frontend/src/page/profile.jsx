import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getUserProfile,
  selectUserProfile,
} from "../store/auth/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import baseUrl from "../utils/baseUrl";

const DropdownComponent = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector(selectUserProfile);
  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  console.log("user profile", userProfile);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  console.log("");
  return (
    <div className="relative inline-block">
      {/* Image that toggles the dropdown */}
      <img
        alt="User Profile"
        src={
          userProfile?.user !== "Avatar" || userProfile?.user !== "default"
            ? baseUrl(userProfile?.user?.avatar, 8)
            : "https://as1.ftcdn.net/v2/jpg/05/90/59/88/1000_F_590598870_TOcGd4cUZzPoEMlxSc7XYwcupHOE0vLM.jpg"
        }
        title={userProfile?.user?.name}
        className="object-cover object-center w-10 h-10 rounded-full cursor-pointer"
        onClick={toggleDropdown}
      />

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 mt-2 w-38 bg-white shadow-lg rounded-lg p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="list-none p-0 m-0">
              <motion.li
                className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-150 ease-in-out"
                whileHover={{ scale: 1.05 }}
              >
                <Link
                  className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-150 ease-in-out"
                  to={`/user/${userProfile?.user?._id}`}
                >
                  <FaUser className="text-lg mr-2 ml-3  text-[#754FFE]" />
                  <span className="text-sm">Profile</span>
                </Link>
              </motion.li>
              <motion.li
                className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-150 ease-in-out"
                whileHover={{ scale: 1.05 }}
                onClick
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
