import { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
export default function Comments() {
    const [active, setActive] = useState(null);
    const [score, setScore] = useState(0);
    const [comment, setComment] = useState('');
    const [list, setList] = useState([]);
    const [voteList,setVoteList] = useState([]);

    const updateVote = (index, type) => {
    const newVotes = [...voteList];
    let { score, active } = newVotes[index];
    if (type === 'like') {
      if (active === 'like') { { active = null; score -= 1; } } 
      else { score += (active === 'dislike' ? 2 : 1); active = 'like'; }
    } else {
      if (active === 'dislike') { { active = null; score += 1; } } 
      else { score -= (active === 'like' ? 2 : 1); active = 'dislike'; }
    }
        newVotes[index] = { score, active };
        setVoteList(newVotes);
    };
    
    const handleComment = (e) => {
        e.preventDefault();
        setList([...list, comment]);
        setComment("");
        setVoteList([...voteList, { score: 0, active: null }]);
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
                        color={voteList[index].active === 'like' ? '#3b82f6' : 'gray'} 
                        fill ={voteList[index].active === 'like' ? '#3b82f6' : 'none'}
                        onClick={() => updateVote(index, 'like')}
                    />
                    <div style={{ marginLeft:'9px', marginRight:'9px', display: 'inline-block'}} className={score>=5 ? "blue" : score<=-5 ? "red" : ""}>{voteList[index]?.score}</div>
                    <ThumbsDown 
                        size={24}
                        cursor="pointer"
                        color={voteList[index].active === 'dislike' ? '#ef4444' : 'gray'}
                        fill ={voteList[index].active === 'dislike' ? '#ef4444' : 'none'}
                        onClick={() => updateVote(index, 'dislike')}

                    />
                </div>
            ))}
        </div>
    )
  
}