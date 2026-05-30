import { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
 
const API_URL = 'http://localhost:8000';
 
export default function Comments({ productId, isLoggedIn }) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
 
  useEffect(() => {
    loadComments();
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setCurrentUserId(payload.user_id);
      } catch {}
    }
  }, [productId]);
 
  const loadComments = () => {
    fetch(`${API_URL}/interactions/comments/${productId}`)
      .then(res => res.json())
      .then(data => setComments(Array.isArray(data) ? data : []))
      .catch(() => setComments([]));
  };
 
  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    const token = localStorage.getItem('token');
    await fetch(`${API_URL}/interactions/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ product_id: productId, content: comment }),
    });
    setComment('');
    loadComments();
  };
 
  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await fetch(`${API_URL}/interactions/comment/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    loadComments();
  };
 
  const handleReact = async (id, isLike) => {
    const token = localStorage.getItem('token');
    await fetch(`${API_URL}/interactions/comment/${id}/react`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ is_like: isLike })
    });
    loadComments();
  };
 
  return (
    <div>
      {isLoggedIn && (
        <form onSubmit={handleComment} style={{ padding: '10px' }}>
          <h3>Add Comment</h3>
          <input 
            type="text" 
            onChange={(e) => setComment(e.target.value)} 
            placeholder="Comment" 
            value={comment} 
            style={{ backgroundColor: "white", color: "black", width: "300px" }}
          />
          <button type="submit">Post</button>
        </form>
      )}
      <div style={{ marginTop: '10px' }}>
        {comments.map((c) => {
          const likes = c.reactions ? c.reactions.filter(r => r.is_like).length : 0;
          const dislikes = c.reactions ? c.reactions.filter(r => !r.is_like).length : 0;
          const hasReacted = c.reactions ? c.reactions.find(r => r.user_id === currentUserId) : null;
 
          return (
            <div key={c.id} style={{ backgroundColor: "white", padding: "10px", marginBottom: "10px", borderRadius: "5px", color: "black", textAlign: 'left' }}>
              <div>
                <strong>{c.username || `User ${c.user_id}`}:</strong> {c.content}
                {currentUserId === c.user_id && (
                  <button onClick={() => handleDelete(c.id)} style={{ marginLeft: '10px', color: 'red', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                    Delete
                  </button>
                )}
              </div>
              <div style={{ marginTop: '5px', display: 'flex', gap: '15px', alignItems: 'center' }}>
                <span onClick={() => handleReact(c.id, true)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ThumbsUp size={16} color={hasReacted?.is_like ? '#3b82f6' : 'gray'} fill={hasReacted?.is_like ? '#3b82f6' : 'none'} />
                  {likes}
                </span>
                <span onClick={() => handleReact(c.id, false)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ThumbsDown size={16} color={hasReacted && !hasReacted.is_like ? '#ef4444' : 'gray'} fill={hasReacted && !hasReacted.is_like ? '#ef4444' : 'none'} />
                  {dislikes}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}