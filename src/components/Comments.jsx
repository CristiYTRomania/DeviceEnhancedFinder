import { useState, useEffect } from 'react';
 
const API_URL = 'http://localhost:8000';
 
async function addComment(productId, content, token) {
  const response = await fetch(`${API_URL}/interactions/comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ product_id: productId, content }),
  });
  return response.json();
}
 
async function getProductComments(productId) {
  const response = await fetch(`${API_URL}/interactions/comments/${productId}`);
  return response.json();
}
 
export default function Comments({ productId, isLoggedIn }) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState('');
 
  useEffect(() => {
    loadComments();
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [productId]);
 
  const loadComments = async () => {
    try {
      const data = await getProductComments(productId);
      setComments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to load comments:', error);
      setComments([]);
    }
  };
 
  const handleComment = async (e) => {
    e.preventDefault();
    if (!isLoggedIn || !comment.trim()) return;
 
    const token = localStorage.getItem('token');
    try {
      await addComment(productId, comment, token);
      setComment('');
      loadComments();
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };
 
  return(
    <div>
      {isLoggedIn && (
        <form onSubmit={handleComment} style={{ padding: '20px' }}>
          <h2>Comment</h2>
          <input 
            type="text" 
            onChange={(e) => setComment(e.target.value)} 
            placeholder="Comment" 
            value={comment} 
            style={{backgroundColor: "white", color: "black", width: "300px"}}
          />
          <br /><br />
          <button type="submit">Comment</button>
        </form>
      )}
      <div style={{ marginTop: '20px' }}>
        {comments.map((c) => (
          <div key={c.id} style={{backgroundColor: "white", padding: "10px", marginBottom: "10px", borderRadius: "5px"}}>
            <strong>User {c.user_id}:</strong> {c.content}
            <div style={{ fontSize: "12px", color: "gray" }}>
              {new Date(c.created_at).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}