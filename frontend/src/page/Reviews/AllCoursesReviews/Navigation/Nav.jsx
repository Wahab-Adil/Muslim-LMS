import "./Nav.css";
import { Button, Input } from "@mui/material";
import { Search } from "@mui/icons-material";
import useLocales from "../../../../hook/useLocales";

const Nav = ({ handleInputChange, query, toggleDrawer }) => {
  const { translate } = useLocales();
  return (
    <nav style={{ marginTop: "5rem" }}>
      <div className="nav-container">
        <Input
          fullWidth
          type="search"
          onChange={handleInputChange}
          value={query}
          sx={{
            width: (theme) =>
              [theme.breakpoints.down("md")] ? "350px" : "100%",
          }}
          placeholder={translate("Search comments")}
        />
        <Search sx={{ ml: -3 }} />
      </div>
    </nav>
  );
};

export default Nav;
