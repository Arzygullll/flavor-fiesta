import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  TextField,
  Box,
  Container,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContextProvider";
import { getProductsCountInCart } from "../../helpers/functions";
import { useCart } from "../../context/CartContextProvider";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

const Navbar = () => {
  const { currentUser, checkAuth, handleLogOut } = useAuth();
  useEffect(() => {
    checkAuth();
  }, []);

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [searchAnchorEl, setSearchAnchorEl] = React.useState(null);

  const [badgeCount, setBadgeCount] = React.useState(0);
  const { addProductToCart } = useCart();
  React.useEffect(() => {
    setBadgeCount(getProductsCountInCart);
  }, [addProductToCart]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuOpen2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setAnchorEl2(null);
    setSearchAnchorEl(null);
  };

  const handleSearchOpen = (event) => {
    setSearchAnchorEl(event.currentTarget);
  };

  const buttonStyles = {
    fontFamily: "cursive",
    fontSize: "15px",
    fontWeight: 500,
    textTransform: "uppercase",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "transparent",
    },
  };

  const logoutButtonStyles = {
    color: "#ffffff", // Цвет текста кнопки
    backgroundColor: "#e36414", // Цвет фона кнопки
    marginLeft: "10px", // Отступ слева для разделения от имени пользователя
    "&:hover": {
      backgroundColor: "#132a13", // Цвет фона кнопки при наведении
    },
  };

  return (
    <AppBar
      sx={{
        position: "fixed",
        width: "100%",
        top: 0,
        left: 0,
        zIndex: 1000,
        backgroundColor: "rgba(0, 0, 0, 0.226)",
        padding: "10px 0",
      }}
      position="static"
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            marginLeft: "85px",
          }}
        >
          <Button color="inherit" onClick={handleMenuOpen2} sx={buttonStyles}>
            recipes
          </Button>
          <Button
            color="inherit"
            onClick={() => navigate("/books")}
            sx={buttonStyles}
          >
            books
          </Button>
          <Button
            variant="h6"
            color="inherit"
            onClick={() => navigate("/")}
            sx={{
              ...buttonStyles,
              fontFamily: "cursive",
              fontSize: "30px",
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            Flavor Fiesta
          </Button>
          <Button
            color="inherit"
            onClick={() => navigate("/delicious-places")}
            sx={buttonStyles}
          >
            delicious places
          </Button>
          <Button
            color="inherit"
            onClick={() => navigate("/about")}
            sx={buttonStyles}
          >
            about us
          </Button>
        </Container>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem
            onClick={() => {
              navigate("/register");
              handleMenuClose();
            }}
          >
            register
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("/login");
              handleMenuClose();
            }}
          >
            login
          </MenuItem>
          <Link to={"/cart"}>
            <Badge badgeContent={badgeCount} color="success">
              <ShoppingBagIcon
                sx={{
                  marginBottom: "10px",
                  marginLeft: "15px",
                  color: "black",
                }}
              />
            </Badge>
          </Link>
        </Menu>
        <Menu
          anchorEl={anchorEl2}
          open={Boolean(anchorEl2)}
          onClose={handleMenuClose}
        >
          <MenuItem
            onClick={() => {
              navigate("/addProduct");
              handleMenuClose();
            }}
          >
            Add new dish
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("/productList");
              handleMenuClose();
            }}
          >
            Recipes
          </MenuItem>
        </Menu>
        <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
          <Menu
            anchorEl={searchAnchorEl}
            open={Boolean(searchAnchorEl)}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
          >
            <Box sx={{ p: 2 }}>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Поиск"
                fullWidth
                sx={{ backgroundColor: "white", borderRadius: 1 }}
              />
            </Box>
          </Menu>
          <Typography variant="h6" component="div" sx={{ mr: "10px" }}>
            {currentUser ? currentUser : "No auth user"}
          </Typography>
          {currentUser && (
            <Button
              color="inherit"
              onClick={handleLogOut}
              sx={logoutButtonStyles}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
