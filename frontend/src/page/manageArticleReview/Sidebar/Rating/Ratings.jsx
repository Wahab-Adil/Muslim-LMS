import Input from "../../components/Input";
import StarHalfTwoToneIcon from "@mui/icons-material/StarHalfTwoTone";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import "./Ratings.css";
import { useState } from "react";
import { Box, FormControlLabel, Radio, Typography } from "@mui/material";

const starsStyle = {
  fontSize: ".8rem",
  color: "#b4690e",
};
// ratings
const ratings = [
  {
    stars: [
      <FaStar style={starsStyle} />,
      <FaStar style={starsStyle} />,
      <FaStar style={starsStyle} />,
      <FaStar style={starsStyle} />,
      <FaStarHalfAlt style={starsStyle} />,
    ],
    title: "4.5↑",
    value: 4.5,
  },
  {
    stars: [
      <FaStar style={starsStyle} />,
      <FaStar style={starsStyle} />,
      <FaStar style={starsStyle} />,
      <FaStar style={starsStyle} />,
      <FaRegStar style={starsStyle} />,
    ],
    title: "4.0↑",
    value: 4,
  },
  {
    stars: [
      <FaStar style={starsStyle} />,
      <FaStar style={starsStyle} />,
      <FaStar style={starsStyle} />,
      <FaStarHalfAlt style={starsStyle} />,
      <FaRegStar style={starsStyle} />,
    ],
    title: "3.5↑",
    value: 3.5,
  },
  {
    stars: [
      <FaStar style={starsStyle} />,
      <FaStar style={starsStyle} />,
      <FaStar style={starsStyle} />,
      <FaRegStar style={starsStyle} />,
      <FaRegStar style={starsStyle} />,
    ],
    title: "3.0↑",
    value: 3,
  },
];

const Ratings = ({ handleChange }) => {
  const [isOpen, setOpen] = useState(false);

  const handleDropDown = () => {
    setOpen(!isOpen);
  };
  return (
    <>
      {/* start */}
      <section>
        <div className="dropdown">
          <button
            style={{ width: "100%" }}
            class="flex items-center w-100 p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            onClick={handleDropDown}
          >
            <StarHalfTwoToneIcon sx={{ color: "#754ffe" }} />
            <span
              class="flex-1 ml-3 text-left whitespace-nowrap"
              sidebar-toggle-item
            >
              Ratings
            </span>
            <svg
              style={{ color: "#754ffe" }}
              sidebar-toggle-item
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>

          <div
            id="dropdown"
            className={`z-10 bg-white rounded divide-y divide-gray-100 shadow ${
              isOpen ? "block w-100" : "hidden w-100"
            }`}
          >
            <ul className=" z-10 w-65 bg-white rounded divide-y divide-gray-100 shadow ">
              <li>
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      paddingLeft: "1rem",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 1,
                      }}
                    >
                      <Input
                        handleChange={handleChange}
                        name="rating"
                        type="radio"
                        className="h-4 w-4 rounded border-gray-300 cursor-pointer text-indigo-600 focus:ring-indigo-500"
                      />
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: ".5rem",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: ".9rem",
                            fontWeight: "600",
                          }}
                        >
                          All
                        </Typography>
                      </Box>
                    </Box>
                    {ratings?.map((rating, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: 1,
                        }}
                      >
                        <Input
                          handleChange={handleChange}
                          value={rating?.value}
                          name="rating"
                          type="radio"
                          className="h-4 w-4 rounded border-gray-300 cursor-pointer text-indigo-600 focus:ring-indigo-500"
                        />
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: ".5rem",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "2px",
                            }}
                          >
                            {rating?.stars?.map((star) => {
                              return star;
                            })}
                          </Box>
                          <Typography
                            sx={{
                              fontSize: ".9rem",
                              fontWeight: "600",
                            }}
                          >
                            {rating.title}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Ratings;
