from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database.connection import get_db
from database.models import Like, Comment, User
from schemas.like_comment import LikeCreate, LikeResponse, CommentCreate, CommentResponse
from auth_dependencies import get_current_user
 
router = APIRouter(prefix="/interactions", tags=["Likes & Comments"])
 
@router.post("/like", response_model=LikeResponse, status_code=status.HTTP_201_CREATED)
def like_product(like: LikeCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    existing_like = db.query(Like).filter(
        Like.user_id == current_user.id,
        Like.product_id == like.product_id
    ).first()
 
    if existing_like:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Already liked this product"
        )
 
    new_like = Like(user_id=current_user.id, product_id=like.product_id)
    db.add(new_like)
    db.commit()
    db.refresh(new_like)
    return new_like
 
@router.delete("/like/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def unlike_product(product_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    like = db.query(Like).filter(
        Like.user_id == current_user.id,
        Like.product_id == product_id
    ).first()
 
    if not like:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Like not found"
        )
 
    db.delete(like)
    db.commit()
    return None
 
@router.get("/likes/{product_id}", response_model=List[LikeResponse])
def get_product_likes(product_id: int, db: Session = Depends(get_db)):
    likes = db.query(Like).filter(Like.product_id == product_id).all()
    return likes
 
@router.post("/comment", response_model=CommentResponse, status_code=status.HTTP_201_CREATED)
def add_comment(comment: CommentCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    new_comment = Comment(
        user_id=current_user.id,
        product_id=comment.product_id,
        content=comment.content
    )
    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)
    return new_comment
 
@router.get("/comments/{product_id}", response_model=List[CommentResponse])
def get_product_comments(product_id: int, db: Session = Depends(get_db)):
    comments = db.query(Comment).filter(Comment.product_id == product_id).all()
    return comments