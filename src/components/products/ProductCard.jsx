import React from "react";
import { useProduct } from "../../context/ProductContextProvider";
import { Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";

const ProductCard = ({ elem }) => {
  const { deleteProduct } = useProduct();
  return (
    <div>
      Title:{elem.title}
      Description:{elem.description}
      Category:{elem.category.title}
      <img width={150} src={elem.image} alt="" />
      {elem.is_author ? (
        <>
          <button onClick={(s) => deleteProduct(elem.id)}>Delete</button>
          <Button
            onClick={() => Navigate(`/edit/${elem.id}`)}
            variant="outlined"
            color="primary"
            size="medium"
          >
            Edit
          </Button>
        </>
      ) : null}
    </div>
  );
};

export default ProductCard;
