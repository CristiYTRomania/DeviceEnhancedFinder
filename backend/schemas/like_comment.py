from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
 
class LikeCreate(BaseModel):
    product_id: int
 
class LikeResponse(BaseModel):
    id: int
    user_id: int
    product_id: int
    is_like: bool
    created_at: datetime
 
    class Config:
        from_attributes = True

class ProductReactSchema(BaseModel):
    is_like: bool

class CommentCreate(BaseModel):
    product_id: int
    content: str = Field(..., min_length=1, max_length=1000)
 
class CommentReactionResponse(BaseModel):
    id: int
    user_id: int
    comment_id: int
    is_like: bool
 
    class Config:
        from_attributes = True
 
class CommentReactSchema(BaseModel):
    is_like: bool
 
class CommentResponse(BaseModel):
    id: int
    user_id: int
    product_id: int
    content: str
    created_at: datetime
    username: Optional[str] = None
    reactions: List[CommentReactionResponse] = []
 
    class Config:
        from_attributes = True