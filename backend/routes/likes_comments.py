from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database.connection import get_db
from database.models import Like, Comment, User, CommentReaction
from schemas.like_comment import LikeCreate, LikeResponse, CommentCreate, CommentResponse, CommentReactSchema, ProductReactSchema
from auth_dependencies import get_current_user
 
router = APIRouter(prefix="/interactions", tags=["Likes & Comments"])
 
@router.post("/product/{product_id}/react", status_code=status.HTTP_200_OK)
def react_to_product(
    product_id: int, 
    payload: ProductReactSchema, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    existing_reaction = db.query(Like).filter(
        Like.product_id == product_id,
        Like.user_id == current_user.id
    ).first()
 
    if existing_reaction:
        if existing_reaction.is_like == payload.is_like:
            # Toggle off
            db.delete(existing_reaction)
            db.commit()
            return {"message": "Reaction removed", "status": "removed"}
        else:
            # Switch reaction
            existing_reaction.is_like = payload.is_like
            db.commit()
            return {"message": "Reaction updated", "status": "updated"}
    else:
        # Create reaction
        new_reaction = Like(
            user_id=current_user.id,
            product_id=product_id,
            is_like=payload.is_like
        )
        db.add(new_reaction)
        db.commit()
        return {"message": "Reaction added", "status": "added"}
 
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
 
@router.delete("/comment/{comment_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_comment(comment_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if not comment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Comment not found"
        )
    if comment.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not authorized to delete this comment"
        )
    db.delete(comment)
    db.commit()
    return None
 
@router.post("/comment/{comment_id}/react", status_code=status.HTTP_200_OK)
def react_to_comment(
    comment_id: int, 
    payload: CommentReactSchema, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if not comment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Comment not found"
        )
 
    existing_reaction = db.query(CommentReaction).filter(
        CommentReaction.comment_id == comment_id,
        CommentReaction.user_id == current_user.id
    ).first()
 
    if existing_reaction:
        if existing_reaction.is_like == payload.is_like:
            # Toggle off: delete existing reaction
            db.delete(existing_reaction)
            db.commit()
            return {"message": "Reaction removed", "status": "removed"}
        else:
            # Change reaction type
            existing_reaction.is_like = payload.is_like
            db.commit()
            return {"message": "Reaction updated", "status": "updated"}
    else:
        # Create new reaction
        new_reaction = CommentReaction(
            user_id=current_user.id,
            comment_id=comment_id,
            is_like=payload.is_like
        )
        db.add(new_reaction)
        db.commit()
        return {"message": "Reaction added", "status": "added"}