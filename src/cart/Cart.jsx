import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useCart } from "../context/CartContextProvider";

const Cart = () => {
  const { cart, changeProductCount, deleteProductFromCart, getCart } =
    useCart();

  useEffect(() => {
    getCart();
  }, []);

  if (!cart || !cart.products) {
    return <Typography variant="h6">Корзина пуста</Typography>;
  }

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "auto",
        padding: "20px",
        marginTop: "120px",
      }}
    >
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: "#eadeda" }}>
                Photo
              </TableCell>
              <TableCell style={{ backgroundColor: "#eadeda" }}>
                Title
              </TableCell>
              <TableCell style={{ backgroundColor: "#eadeda" }}>
                Category
              </TableCell>
              <TableCell style={{ backgroundColor: "#eadeda" }}>
                Price
              </TableCell>
              <TableCell style={{ backgroundColor: "#eadeda" }}>
                Quantity
              </TableCell>
              <TableCell style={{ backgroundColor: "#eadeda" }}>Sum</TableCell>
              <TableCell style={{ backgroundColor: "#eadeda" }}>
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.products.map((elem) => (
              <TableRow key={elem.item.id}>
                <TableCell component="th" scope="row">
                  <img
                    src={elem.item.image}
                    alt=""
                    width={70}
                    style={{ borderRadius: "50%" }}
                  />
                </TableCell>
                <TableCell>{elem.item.title}</TableCell>
                <TableCell>{elem.item.category}</TableCell>
                <TableCell>{elem.item.price}$</TableCell>
                <TableCell>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    defaultValue={elem.count}
                    onChange={(e) =>
                      changeProductCount(elem.item.id, e.target.value)
                    }
                    style={{
                      width: "40px",
                      textAlign: "center",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      padding: "4px 8px",
                    }}
                  />
                </TableCell>
                <TableCell>{elem.subPrice} $</TableCell>
                <TableCell>
                  <Button
                    onClick={() => deleteProductFromCart(elem.item.id)}
                    variant="contained"
                    color="error"
                    style={{ textTransform: "none" }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        size="large"
        style={{
          marginTop: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          color: "#043565",
        }}
      >
        Buy now for {cart.totalPrice} $
      </Button>
    </div>
  );
};

export default Cart;
