import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance';
import { FaThumbsUp, FaTrash } from 'react-icons/fa';
import Modal from './modal';
import { getCookie, setCookie } from './cookies.jsx';
import './comments.css';

function Comments() {
  const [comments, setComments] = useState([]);
  const [commenter, setCommenter] = useState('');
  const [comment, setComment] = useState('');
  const [sortType, setSortType] = useState('new');
  const [totalComments, setTotalComments] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [confirmAction, setConfirmAction] = useState(null);
  const [accessToken, setAccessToken] = useState(getCookie('accessToken'));
  const refreshToken = getCookie('refreshToken');
  const username = getCookie('username');

  useEffect(() => {
    if (username) {
      setCommenter(username);
    }

    if (accessToken) {
      fetchComments(accessToken);
    } else if (refreshToken) {
      refreshAccessTokenAndFetchComments();
    }
  }, [sortType, username, accessToken]);

  const fetchComments = async (token) => {
    try {
      const response = await axiosInstance.get('/comments/details', {
        headers: {
          Authorization: token,
          RefreshToken: refreshToken,
        },
      });
      const sortedComments = sortComments(response.data);
      setComments(sortedComments);
      setTotalComments(response.data.length);
    } catch (error) {
      handleTokenRefreshError(error);
    }
  };

  const refreshAccessTokenAndFetchComments = async () => {
    try {
      const response = await axiosInstance.post('/users/token', { refreshToken });
      if (response.data && response.data.accessToken) {
        const newAccessToken = response.data.accessToken;
        setCookie('accessToken', newAccessToken, 1);
        setAccessToken(newAccessToken); // Update the accessToken state
        fetchComments(newAccessToken);
      } else {
        console.error('Failed to refresh token');
        handleTokenRefreshFailure();
      }
    } catch (error) {
      handleTokenRefreshError(error);
    }
  };

  const handleTokenRefreshError = (error) => {
    if (error.response && error.response.status === 401) {
      refreshAccessTokenAndFetchComments();
    } else {
      console.error('Error fetching comments:', error);
      // Handle other errors as needed
    }
  };

  const handleTokenRefreshFailure = () => {
    // Handle refresh token failure (e.g., logout or display error message)
    console.error('Failed to refresh token');
    // Optionally, perform logout or display an error message
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
      await axiosInstance.post('/comments/create', { commenter, comment }, {
        headers: {
          Authorization: accessToken,
          RefreshToken: refreshToken,
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
        await axiosInstance.put(`/comments/update/${id}`, { username: commenter }, {
          headers: {
            Authorization: accessToken,
            RefreshToken: refreshToken,
          },
        });
        fetchComments(accessToken);
      }
    } catch (error) {
      handleTokenRefreshError(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const newAccessToken = getCookie('accessToken'); // Get latest access token
      setModalMessage('Are you sure you want to delete this comment?');
      setConfirmAction(() => () => confirmDelete(id, newAccessToken)); // Pass token to confirmDelete
      setModalOpen(true);
    } catch (error) {
      console.error('Error deleting comment:', error);
      // Handle error (e.g., show a message to the user)
    }
  };

  const confirmDelete = async (id, newAccessToken) => {
    try {
      await axiosInstance.delete(`/comments/delete/${id}`, {
        headers: {
          Authorization: accessToken,
          RefreshToken: refreshToken,
        },
      });
      setModalOpen(false);
      fetchComments(accessToken);
    } catch (error) {
      handleTokenRefreshError(error);
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
