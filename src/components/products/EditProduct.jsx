import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "../../context/ProductContextProvider";

const EditProduct = () => {
  const { id } = useParams();
  const { oneProduct, getOneProduct, editProduct } = useProduct();

  const [product, setProduct] = useState({
    ingridients: "",
    owner: "",
    name: "",
    cuisine: "",
    type: "",
    cooking_time: "",
    photo: "",
    recipe: "",
    level: "",
    description: "",
  });

  useEffect(() => {
    getOneProduct(id);
  }, [id, getOneProduct]);

  useEffect(() => {
    if (oneProduct) {
      setProduct(oneProduct);
    }
  }, [oneProduct]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileInput = (e) => {
    const { name, files } = e.target;
    setProduct((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleClick = () => {
    const updatedProduct = new FormData();
    for (const key in product) {
      updatedProduct.append(key, product[key]);
    }
    editProduct(id, updatedProduct);
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
      <Typography variant="h4" align="center">
        EDIT PRODUCT
      </Typography>
      <TextField
        name="ingridients"
        fullWidth
        label="Ingridients"
        variant="outlined"
        onChange={handleInput}
        value={product.ingridients}
      />
      <TextField
        name="owner"
        fullWidth
        label="Owner"
        variant="outlined"
        onChange={handleInput}
        value={product.owner}
      />
      <TextField
        name="name"
        fullWidth
        label="Name"
        variant="outlined"
        onChange={handleInput}
        value={product.name}
      />
      <TextField
        name="cuisine"
        fullWidth
        label="Cuisine"
        variant="outlined"
        onChange={handleInput}
        value={product.cuisine}
      />
      <TextField
        name="type"
        fullWidth
        label="Type"
        variant="outlined"
        onChange={handleInput}
        value={product.type}
      />
      <TextField
        name="cooking_time"
        fullWidth
        label="Cooking Time"
        variant="outlined"
        onChange={handleInput}
        value={product.cooking_time}
      />
      <TextField
        name="recipe"
        fullWidth
        label="Recipe"
        variant="outlined"
        onChange={handleInput}
        value={product.recipe}
      />
      <TextField
        name="level"
        fullWidth
        label="Level"
        variant="outlined"
        onChange={handleInput}
        value={product.level}
      />
      <TextField
        name="description"
        fullWidth
        label="Description"
        variant="outlined"
        onChange={handleInput}
        value={product.description}
      />
      <Button variant="contained" component="label">
        Upload Photo
        <input type="file" hidden name="photo" onChange={handleFileInput} />
      </Button>
      {product.photo && (
        <img
          src={URL.createObjectURL(product.photo)}
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
