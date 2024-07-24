import React from "react";
import Cart from "../cart/Cart";
import { Container, Grid } from "@mui/material";

const CartPage = () => {
  return (
    <div
      className="cart-page"
      style={{
        backgroundImage: `url(${require("../components/homePage/assets/e785546b7f725acbcd6f730779780f29.jpg")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "103.5vh",
      }}
    >
      <Container maxWidth="100%">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Cart />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default CartPage;
