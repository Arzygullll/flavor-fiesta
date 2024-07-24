import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../context/ProductContextProvider";
import {
  Button,
  Typography,
  Stack,
  IconButton,
  TextField,
  Rating,
} from "@mui/material";
import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpAlt from "@mui/icons-material/ThumbUpAlt";
import "./ProductCard.css";

const ProductCard = ({ elem }) => {
  const { deleteDish } = useProduct(); // Используем контекст для удаления блюда
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const id = elem.id;

  useEffect(() => {
    const savedLiked = localStorage.getItem(`liked_${id}`);
    const savedLikesCount = localStorage.getItem(`likesCount_${id}`);
    const savedRating = localStorage.getItem(`rating_${id}`);
    const savedComments = localStorage.getItem(`comments_${id}`);

    setLiked(savedLiked === "true");
    setLikesCount(savedLikesCount ? parseInt(savedLikesCount) : 0);
    setRating(savedRating ? parseFloat(savedRating) : 0);
    setComments(savedComments ? JSON.parse(savedComments) : []);
  }, [id]);

  useEffect(() => {
    localStorage.setItem(`liked_${id}`, liked);
    localStorage.setItem(`likesCount_${id}`, likesCount);
    localStorage.setItem(`rating_${id}`, rating);
    localStorage.setItem(`comments_${id}`, JSON.stringify(comments));
  }, [liked, likesCount, rating, comments, id]);

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikesCount((prevCount) => prevCount + 1);
    }
  };

  const handleRating = (newRating) => {
    setRating(newRating);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() !== "") {
      setComments((prevComments) => [
        ...prevComments,
        { id: Date.now(), content: comment },
      ]);
      setComment("");
    }
  };

  const handleDeleteComment = (commentId) => {
    setComments((prevComments) =>
      prevComments.filter((c) => c.id !== commentId)
    );
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="dish-card">
      <img className="dish-image" src={elem.photo} alt={elem.name} />
      <div className="dish-info">
        <Typography variant="h5" component="div" className="dish-title">
          {elem.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className="dish-description"
        >
          Description: {elem.description}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className="dish-description"
        >
          Cuisine: {elem.cuisine} <br />
          Type: {elem.type} <br />
          Cooking time: {elem.cooking_time} мин <br />
          Level: {elem.level} <br />
          Owner: {elem.owner} <br />
          Ingredients:{" "}
          {elem.ingredients &&
            elem.ingredients.length > 0 &&
            elem.ingredients[0].name}{" "}
          <br />
          Recipe: {elem.recipe}
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          className="dish-buttons"
        >
          <IconButton
            className={`animated-icon-button ${liked ? "liked" : ""}`}
            onClick={handleLike}
          >
            {liked ? (
              <ThumbUpAlt color="primary" />
            ) : (
              <ThumbUpAltOutlined color="action" />
            )}
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {likesCount} {likesCount === 1 ? "like" : "likes"}
          </Typography>
          <Button
            variant="contained"
            color="error"
            className="delete-button"
            onClick={() => deleteDish(id)}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="edit-button"
            onClick={handleEdit}
          >
            Edit
          </Button>
        </Stack>
        <Rating
          name="dish-rating"
          value={rating}
          onChange={(e, newValue) => handleRating(newValue)}
        />
        <form onSubmit={handleCommentSubmit} className="comments-section">
          <TextField
            label="Add a comment"
            variant="outlined"
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            Add
          </Button>
          <div className="comments-list">
            {comments.map((c) => (
              <div key={c.id} className="comment-item">
                <Typography variant="body2">{c.content}</Typography>
                <Button
                  variant="text"
                  color="error"
                  onClick={() => handleDeleteComment(c.id)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductCard;
