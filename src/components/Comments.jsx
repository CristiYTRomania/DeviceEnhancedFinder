import { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
export default function Comments() {
    const [active, setActive] = useState(null);
    const [score, setScore] = useState(0);
    const [comment, setComment] = useState('');
    const [list, setList] = useState([]);
    const handleComment = (e) => {
        e.preventDefault();
        setList([...list, comment]);
        setComment("");
    };
    return(
        <div>
            <form onSubmit={handleComment} style={{ padding: '20px' }}>
                <h2>Comment</h2>
                <input type="comment" onChange={(e) => setComment(e.target.value)} placeholder="Comment" value={comment} style={{backgroundColor: "white", color: "black"}}/>
                <br /><br />
                <button type="submit">Comment</button>
            </form>
            {list.map((c, index)=> (
                <div style={{backgroundColor: "white"}}>
                    Cristi56: {c} <span />
                    <button type="delete" onClick={(e) => setList(list.filter((_, i) => i !== index))} placeholder="Delete">
                        Delete
                    </button>
                    <ThumbsUp 
                        size={24}
                        cursor="pointer"
                        color={active === 'like' ? '#3b82f6' : 'gray'} 
                        fill={active === 'like' ? '#3b82f6' : 'none'}
                        onClick={() => {
                        setActive(active === 'like' ? null : 'like')
                        setScore(active === 'dislike' ? score+2 : active === 'like' ? score-1 : score+1)
                        }}
                    />
                    <div style={{ marginLeft:'9px', marginRight:'9px', display: 'inline-block'}} className={score>=5 ? "blue" : score<=-5 ? "red" : ""}>{score}</div>
                    <ThumbsDown 
                        size={24}
                        cursor="pointer"
                        color={active === 'dislike' ? '#ef4444' : 'gray'}
                        fill={active === 'dislike' ? '#ef4444' : 'none'}
                        onClick={() => {
                        setActive(active === 'dislike' ? null : 'dislike')
                        setScore(active === 'like' ? score-2 : active === 'dislike' ? score+1 : score-1)
                        }}
                    />
                </div>
            ))}
        </div>
    )
  
}