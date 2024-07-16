import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useProduct } from "../../context/ProductContextProvider";

const EditProduct = () => {
  const { id } = useParams();
  const { oneProduct, getOneProduct, editProduct } = useProduct();

  const [product, setProduct] = useState({
    ingredients: "",
    owner: "",
    name: "",
    cuisine: "",
    type: "",
    cooking_time: "",
    photo: null,
    recipe: "",
    level: "",
    description: "",
  });

  useEffect(() => {
    if (id) {
      getOneProduct(id);
    }
  }, [id, getOneProduct]);

  useEffect(() => {
    if (oneProduct) {
      setProduct({
        ...oneProduct,
        photo: oneProduct.photo || null, // Убедитесь, что photo корректно обрабатывается
      });
    }
  }, [oneProduct]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === "cooking_time" ? Number(value) : value,
    }));
  };

  const handleFileInput = (e) => {
    const { name, files } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: files[0],
    }));
  };

  const handleClick = () => {
    const updatedProduct = new FormData();
    for (const key in product) {
      updatedProduct.append(key, product[key]);
    }
    editProduct(id, updatedProduct)
      .then(() => {
        console.log("Product updated successfully!");
        // Действия после успешного обновления
      })
      .catch((error) => {
        console.error("Error editing product:", error);
        // Обработка ошибки
      });
  };

  return (
    <Box
      sx={{
        width: "50vw",
        height: "auto",
        margin: "20px auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h3" align="center">
        EDIT PRODUCT
      </Typography>
      {Object.keys(product).map((key) =>
        key !== "photo" ? (
          <TextField
            key={key}
            name={key}
            fullWidth
            label={key.charAt(0).toUpperCase() + key.slice(1)}
            variant="outlined"
            onChange={handleInput}
            value={product[key]}
            type={key === "cooking_time" ? "number" : "text"}
          />
        ) : null
      )}
      <Button variant="contained" component="label">
        Upload Photo
        <input type="file" hidden name="photo" onChange={handleFileInput} />
      </Button>
      {product.photo && (
        <img
          src={
            typeof product.photo === "string"
              ? product.photo
              : URL.createObjectURL(product.photo)
          }
          alt={product.name}
          style={{
            margin: "10px 0",
            width: "100%",
            maxHeight: "400px",
            objectFit: "cover",
          }}
        />
      )}
      <Button onClick={handleClick} fullWidth variant="contained">
        Edit Product
      </Button>
    </Box>
  );
};

export default EditProduct;
