import React from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../context/ProductContextProvider";

const ProductCard = ({ elem }) => {
  const { deleteProduct } = useProduct();
  const navigate = useNavigate();

  return (
    <div>
      Title: {elem.title}
      Description: {elem.description}
      Category: {elem.category.title}
      <img width={150} src={elem.image} alt="" />
      {elem.is_author ? (
        <>
          <button onClick={() => deleteProduct(elem.id)}>Delete</button>
          <button onClick={() => navigate(`/edit/${elem.id}`)}>Edit</button>
        </>
      ) : null}
    </div>
  );
};

export default ProductCard;
