import React, { useState, useEffect } from 'react';
import { FaThumbsUp, FaTrash } from 'react-icons/fa';
import Modal from './modal';
import './comments.css';
import { getCookie } from './cookies.jsx'; //import cookies functions from cookie.jsx
import axios from 'axios';  // Import Axios directly

function Comments() {
  const [comments, setComments] = useState([]);
  const [commenter, setCommenter] = useState('');
  const [comment, setComment] = useState('');
  const [sortType, setSortType] = useState('new');
  const [totalComments, setTotalComments] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [confirmAction, setConfirmAction] = useState(null);
  const accessToken = getCookie('accessToken');  //get access token from cookie
  const username = getCookie('username');

  useEffect(() => {
    if (username) {
      setCommenter(username);
    }

    if (accessToken) {
      fetchComments(accessToken);
    }
  }, [sortType, username, accessToken]);

  const fetchComments = async (token) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/comments/details`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const sortedComments = sortComments(response.data);
      setComments(sortedComments);
      setTotalComments(response.data.length);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Access token expired or invalid");
        // Handle logout or redirect to login page
      } else {
        console.error('Error fetching comments:', error);
      }
    }
  };

  const sortComments = (comments) => {
    if (sortType === 'top') {
      return comments.sort((a, b) => b.likes - a.likes);
    } else {
      return comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).reverse();
    }
  };

  const handleCreateComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/comments/create`, { commenter, comment }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setComment('');
      fetchComments(accessToken);
    } catch (error) {
      console.error('Error creating comment:', error);
      // Handle error (e.g., show a message to the user)
    }
  };

  const handleLike = async (id) => {
    try {
      const comment = comments.find((comment) => comment._id === id);
      if (comment && comment.likedBy.includes(commenter)) {
        setModalMessage('You have already liked this comment.');
        setConfirmAction(null);
        setModalOpen(true);
      } else {
        await axios.put(`${import.meta.env.VITE_SERVER_URL}/comments/update/${id}`, { username: commenter }, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        fetchComments(accessToken);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Access token expired or invalid");
        // Handle logout or redirect to login page
      } else {
        console.error('Error updating comment:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      setModalMessage('Are you sure you want to delete this comment?');
      setConfirmAction(() => () => confirmDelete(id));
      setModalOpen(true);
    } catch (error) {
      console.error('Error deleting comment:', error);
      // Handle error (e.g., show a message to the user)
    }
  };

  const confirmDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER_URL}/comments/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setModalOpen(false);
      fetchComments(accessToken);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Access token expired or invalid");
        // Handle logout or redirect to login page
      } else {
        console.error('Error deleting comment:', error);
      }
    }
  };

  const handleCommentModalClose = () => {
    setModalOpen(false);
    setModalMessage('');
    setConfirmAction(null);
  };

  return (
    <div className="comment-section">
      <div className="comment-section-header">
        <p id="total-comments">{totalComments} Comments</p>
        <div className="comment-sort-buttons">
          <button
            onClick={() => setSortType('top')}
            className={sortType === 'top' ? 'active' : ''}
          >
            Top Comments
          </button>
          <button
            onClick={() => setSortType('new')}
            className={sortType === 'new' ? 'active' : ''}
          >
            New Comments
          </button>
        </div>
      </div>
      <div className="comment-input">
        <form onSubmit={handleCreateComment}>
          <input
            type="text"
            placeholder="Add a public comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <button type="submit">Comment</button>
        </form>
      </div>
      <div className="comment-list">
        {comments.map((comment) => (
          <div key={comment._id} className="comment-div">
            <div className="comment-content">
              <span className="commenter">{comment.commenter}</span>
              <p className="comments">{comment.comment} </p>
            </div>
            <div className="comment-actions">
              <button
                onClick={() => handleLike(comment._id)}
                className="like-button"
                id="like"
              >
                <FaThumbsUp /> {comment.likes}
              </button>
              <button
                onClick={() => handleDelete(comment._id)}
                className="delete-button"
                id="delete"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={handleCommentModalClose}
        onConfirm={confirmAction}
        message={modalMessage}
        confirmButtonText={confirmAction ? 'Delete' : 'OK'}
        showCancelButton={!!confirmAction}
      />
    </div>
  );
}

export default Comments;
