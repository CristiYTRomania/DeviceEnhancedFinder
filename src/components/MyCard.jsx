import "./MyCard.css"
import { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import Comments from "./Comments";
 
const API_URL = 'http://localhost:8000';
 
async function getProductReactions(productId) {
  const response = await fetch(`${API_URL}/interactions/likes/${productId}`);
  return response.json();
}
 
function MyCard(props) {
  const [likesCount, setLikesCount] = useState(0);
  const [dislikesCount, setDislikesCount] = useState(0);
  const [myReaction, setMyReaction] = useState(null); // 'like', 'dislike', or null
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('auth') === 'true');
    loadLikes();
  }, [props.id]);
 
  const loadLikes = async () => {
    try {
      const data = await getProductReactions(props.id);
      const list = Array.isArray(data) ? data : [];
      setLikesCount(list.filter(r => r.is_like).length);
      setDislikesCount(list.filter(r => !r.is_like).length);
 
      const token = localStorage.getItem('token');
      if (token) {
        const myId = getCurrentUserId(token);
        const userReaction = list.find(r => r.user_id === myId);
        if (userReaction) {
          setMyReaction(userReaction.is_like ? 'like' : 'dislike');
        } else {
          setMyReaction(null);
        }
      } else {
        setMyReaction(null);
      }
    } catch {
      setLikesCount(0);
      setDislikesCount(0);
      setMyReaction(null);
    }
  };
 
  const getCurrentUserId = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.user_id;
    } catch {
      return null;
    }
  };
 
  const handleReact = async (isLike) => {
    if (!isLoggedIn) return;
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      await fetch(`${API_URL}/interactions/product/${props.id}/react`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ is_like: isLike })
      });
      loadLikes();
    } catch (err) {
      console.error(err);
    }
  };
 
  return (
    <div className="card">
      <h3 className="blue">{props.title}</h3>
      <h4>Type: {props.type}</h4>
      {
        (props.price !== "No" && props.price !== "NaN" && props.price !== "0") &&
        <h4 className={props.price > 4000 ? "price-tag red" : props.price > 2500 ? "price-tag orange" : props.price < 1000 ? "price-tag green" : "price-tag"}>
          Price: {props.price} RON
        </h4>
      }
      {
        (props.storage !== "NaN" && props.storage !== "0") &&
        <h4 className={props.storage <= 128 ? "red" : props.storage >= 1024 ? "green" : props.storage <= 256 ? "orange":""}>
          {props.storage < 1 ? "Storage: "+props.storage*1024+" MB" : props.storage < 1024 ? "Storage: "+props.storage+" GB" : "Storage: "+props.storage/1024+" TB"}
        </h4>
      }
      {
        (props.ram !== "NaN" && props.ram !== "0") &&
        <h4 className={props.ram < 6 ? "red" : props.ram > 12 ? "green" : props.ram < 12 ? "orange":""}>
          {props.ram < 1 ? "RAM: "+props.ram*1024+" MB" : props.ram < 1024 ? "RAM: "+props.ram+" GB" : "RAM: "+props.ram/1024+" TB"}
        </h4>
      }
      {
        (props.jack !== "NaN") &&
      <h4 className={props.jack === "No" ? "red" : ""}>3.5mm jack: {props.jack}</h4>
      }
      {
        (props.battery !== "No" && props.battery !== "NaN" && props.battery !== "0") &&
        <h4 className={props.battery < 4000 ? "red" : props.battery < 5000 ? "orange" : props.battery > 6000 ? "green" : ""}>
          Baterie: {props.battery} mAh
        </h4>
      }
      {
        (props.nfc !== "NaN") &&
        <h4 className={props.nfc === "No" ? "red" : ""}>
          NFC: {props.nfc}
        </h4>
      }
      {
        (props.mem_card_slot !== "NaN") &&
        <h4 className={props.mem_card_slot === "No" ? "red" : ""}>Memory card slot: {props.mem_card_slot}</h4>
      }
      {
        (props.mem_card_slot !== "No" && props.mem_card_slot !== "NaN") && (props.card_slot_max !== "NaN" && props.card_slot_max !== "0") &&
        <h4 className={props.card_slot_max >= 1024 ? "green" : props.card_slot_max <= 256 ? "orange":""}>
          {props.card_slot_max < 1024 ? "Card slot max storage: "+props.card_slot_max+" GB" : "Card slot max storage: "+props.card_slot_max/1024+" TB"}
        </h4>
      }
      {(props.power !== "NaN" && props.power !== "0") && <h4>Power: {props.power} W</h4>}
 
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', justifyContent: 'center', margin: '15px 0' }}>
        <span 
          onClick={() => handleReact(true)} 
          style={{ cursor: isLoggedIn ? 'pointer' : 'default', display: 'flex', alignItems: 'center', gap: '5px' }}
        >
          <ThumbsUp 
            size={20}
            color={myReaction === 'like' ? '#3b82f6' : 'gray'} 
            fill={myReaction === 'like' ? '#3b82f6' : 'none'}
          />
          {likesCount}
        </span>
        <span 
          onClick={() => handleReact(false)} 
          style={{ cursor: isLoggedIn ? 'pointer' : 'default', display: 'flex', alignItems: 'center', gap: '5px' }}
        >
          <ThumbsDown 
            size={20}
            color={myReaction === 'dislike' ? '#ef4444' : 'gray'} 
            fill={myReaction === 'dislike' ? '#ef4444' : 'none'}
          />
          {dislikesCount}
        </span>
      </div>
      <br />
      <Comments productId={props.id} isLoggedIn={isLoggedIn} />
    </div>
  );
}
export default MyCard