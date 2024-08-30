import "./Category.css";
import Input from "../../components/Input";
import CategoryIcon from "@mui/icons-material/Category";
import { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import useLocales from "../../../../hook/useLocales";
function Category({ handleChange, AllCategories, selectedCategory }) {
  const { translate } = useLocales();
  const [isOpen, setOpen] = useState(false);

  const handleDropDown = () => {
    setOpen(!isOpen);
  };

  return (
    <>
      <section>
        <div className="dropdown">
          <button
            style={{ width: "100%" }}
            class="flex items-center w-100 p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            onClick={handleDropDown}
          >
            <CategoryIcon sx={{ color: "#754ffe" }} />
            <span
              class="flex-1 ml-3 text-left whitespace-nowrap"
              sidebar-toggle-item
            >
              {translate("Category")}
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
                    <FormControl component="fieldset">
                      <RadioGroup
                        aria-label="language"
                        name="language"
                        value={selectedCategory}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          control={<Radio />}
                          label={translate("All")}
                          onChange={handleChange}
                          type="radio"
                          value=""
                          name="test"
                        />
                        {AllCategories?.map((cat) => (
                          <>
                            <FormControlLabel
                              control={<Radio />}
                              label={cat.name}
                              onChange={handleChange}
                              type="radio"
                              value={cat.name}
                              name="test"
                            />
                          </>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default Category;
