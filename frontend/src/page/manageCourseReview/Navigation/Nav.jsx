import "./Nav.css";
import { Button, Input } from "@mui/material";
import FilterListTwoToneIcon from "@mui/icons-material/FilterListTwoTone";

const Nav = ({ handleInputChange, query, toggleDrawer }) => {
  return (
    <nav style={{ marginTop: "5rem" }}>
      <div className="nav-container">
        <Input
          fullWidth
          type="text"
          onChange={handleInputChange}
          value={query}
          sx={{
            width: (theme) =>
              [theme.breakpoints.down("md")] ? "350px" : "500px",
          }}
          placeholder="Search commments by committer or comment"
        />
      </div>
      <div className="profile-container">
        <Button sx={{ color: "#754ffe" }} onClick={toggleDrawer(true)}>
          <FilterListTwoToneIcon />
          Filter
        </Button>
      </div>
    </nav>
  );
};

export default Nav;