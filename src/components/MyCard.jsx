import "./MyCard.css"
import { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import Comments from "./Comments";
 
const API_URL = 'http://localhost:8000';

async function likeProduct(productId, token) {
  const response = await fetch(`${API_URL}/interactions/like`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ product_id: productId }),
  });
  return response.json();
}
 
async function unlikeProduct(productId, token) {
  await fetch(`${API_URL}/interactions/like/${productId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
}
 
async function getProductLikes(productId) {
  const response = await fetch(`${API_URL}/interactions/likes/${productId}`);
  return response.json();
}
 
function MyCard(props) {
  const [active, setActive] = useState(null);
  const [score, setScore] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('auth') === 'true');
    loadLikes();
  }, [props.id]);
 
  const loadLikes = async () => {
    const likes = await getProductLikes(props.id);
    setLikeCount(likes.length);
    const token = localStorage.getItem('token');
    if (token) {
      const userLikes = likes.filter(like => like.user_id === getCurrentUserId(token));
      setIsLiked(userLikes.length > 0);
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
 
  const handleLike = async () => {
    if (!isLoggedIn) return;
    const token = localStorage.getItem('token');
    if (isLiked) {
      await unlikeProduct(props.id, token);
      setIsLiked(false);
      setLikeCount(likeCount - 1);
    } else {
      await likeProduct(props.id, token);
      setIsLiked(true);
      setLikeCount(likeCount + 1);
    }
  };
 
  return (
    <div className="card">
      <h3 class="blue">{props.title}</h3>
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
 
      {isLoggedIn ? (
        <>
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
        </>
      ) : (
        <>
          <ThumbsUp 
            size={24}
            color="gray"
          />
          <div style={{ marginLeft:'9px', marginRight:'9px', display: 'inline-block'}}>{likeCount}</div>
          <ThumbsDown 
            size={24}
            color="gray"
          />
        </>
      )}
      <br /><br />
      <Comments productId={props.id} isLoggedIn={isLoggedIn} />
    </div>
  );
}
export default MyCard