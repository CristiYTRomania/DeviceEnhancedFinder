from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
 
class LikeCreate(BaseModel):
    product_id: int
 
class LikeResponse(BaseModel):
    id: int
    user_id: int
    product_id: int
    created_at: datetime
 
    class Config:
        from_attributes = True
 
class CommentCreate(BaseModel):
    product_id: int
    content: str = Field(..., min_length=1, max_length=1000)
 
class CommentResponse(BaseModel):
    id: int
    user_id: int
    product_id: int
    content: str
    created_at: datetime
 
    class Config:
        from_attributes = True