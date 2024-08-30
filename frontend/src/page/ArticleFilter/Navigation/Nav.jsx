import "./Nav.css";
import { Button, Input } from "@mui/material";
import FilterListTwoToneIcon from "@mui/icons-material/FilterListTwoTone";
import useLocale from "../../../hook/useLocales";

const Nav = ({ handleInputChange, query, toggleDrawer }) => {
  const { translate } = useLocale();
  return (
    <nav style={{ marginTop: "5rem" }}>
      <div className="nav-container">
        <Input
          fullWidth
          type="text"
          onChange={handleInputChange}
          value={query}
          sx={{ width: "300px" }}
          placeholder={translate("Search Courses")}
        />
      </div>
      <div className="profile-container">
        <Button sx={{ color: "#754ffe" }} onClick={toggleDrawer(true)}>
          <FilterListTwoToneIcon />
          {translate("Filter")}
        </Button>
      </div>
    </nav>
  );
};

export default Nav;
