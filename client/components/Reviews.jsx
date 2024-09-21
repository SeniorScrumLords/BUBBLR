import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, ListGroup, Form, Button } from 'react-bootstrap';
import StarRating from './StarRating';
import '../styling/Reviews.css';

const Reviews = () => {
  const { drinkId } = useParams();
  const [drink, setDrink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState('');
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchDrinkData = async () => {
      try {
        const response = await axios.get(`/api/drinks/${drinkId}`);
        setDrink(response.data.drink);
        setComments(response.data.comments);
        setAverageRating(response.data.averageRating);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching drink data:', error);
        setError('Failed to fetch drink data');
        setLoading(false);
      }
    };

    fetchDrinkData();
  }, [drinkId]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/drinks/${drinkId}/comment`, { comment: newComment });
      setComments((prevComments) => [...prevComments, response.data]);
      setNewComment('');
    } catch (error) {
      setError('Failed to add comment');
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      await axios.delete(`/api/drinks/${drinkId}/comment/${commentId}`);
      setComments((prevComments) => prevComments.filter(comment => comment.id !== commentId));
    } catch (error) {
      setError('Failed to delete comment');
    }
  };

  const handleEditClick = (commentId, commentText) => {
    setEditingCommentId(commentId);
    setEditingCommentText(commentText);
  };

  const handleCommentEdit = async (commentId) => {
    try {
      const response = await axios.patch(`/api/drinks/${drinkId}/comment/${commentId}`, { comment: editingCommentText });
      setComments((prevComments) =>
        prevComments.map(comment => (comment.id === commentId ? response.data : comment))
      );
      setEditingCommentId(null);
    } catch (error) {
      setError('Failed to update comment');
    }
  };

  const handleRatingSubmit = async () => {
    if (rating === 0) return;
    try {
      await axios.post(`/api/drinks/${drinkId}/rating`, { rating });
      setAverageRating((prev) => (prev + rating) / 2);
      setRating(0); // Reset rating
    } catch (error) {
      setError('Failed to add rating');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Card
      style={{ width: '18rem', cursor: 'pointer' }}
      className='text-center reviews-card'
      bg='dark'
      text='light'
      border='light'
    >
      <Card.Body>
        <Card.Img
          variant='top'
          src={drink.strDrinkThumb}
          style={{ width: '160px', height: '160px', margin: '0 auto' }}
        />
        <Card.Title>{drink.strDrink}</Card.Title>
        <Card.Subtitle className='mb-2 text-secondary'>
          {drink.strCategory}
        </Card.Subtitle>
        <Card.Subtitle className='mb-2 text-secondary'>
          {drink.strGlass}
        </Card.Subtitle>
        <Card.Text>
          {`${drink.strIngredient1}, ${drink.strIngredient2}, ${drink.strIngredient3}`}
        </Card.Text>

        {/* Display Rating */}
        <h6>Average Rating: {averageRating.toFixed(1)}</h6>
        <StarRating initialRating={averageRating} onRatingChange={handleRatingChange} />

        {/* Display Comments */}
        <h6>Comments:</h6>
        <ListGroup variant="flush">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <ListGroup.Item key={comment.id}>
                {/* If editing the current comment, show input field */}
                {editingCommentId === comment.id ? (
                  <>
                    <Form.Control
                      type="text"
                      value={editingCommentText}
                      onChange={(e) => setEditingCommentText(e.target.value)}
                    />
                    <Button variant="primary" onClick={() => handleCommentEdit(comment.id)}>Save</Button>
                  </>
                ) : (
                  <>
                    {comment.comment}
                    <Button variant="link" onClick={() => handleEditClick(comment.id, comment.comment)}>Edit</Button>
                    <Button variant="link" onClick={() => handleCommentDelete(comment.id)}>Delete</Button>
                  </>
                )}
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>No comments yet.</ListGroup.Item>
          )}
        </ListGroup>

        {/* Comment Form */}
        <Form onSubmit={handleCommentSubmit} className='mt-3'>
          <Form.Group controlId="newComment">
            <Form.Control
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={handleCommentChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Comment
          </Button>
        </Form>

        {/* Rating Form */}
        <div className='mt-3'>
          <Button variant="primary" onClick={handleRatingSubmit}>
            Submit Rating
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Reviews;