from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from .connection import Base
 
class User(Base):
    __tablename__ = "users"
 
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False, index=True)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
 
    likes = relationship("Like", back_populates="user", cascade="all, delete-orphan")
    comments = relationship("Comment", back_populates="user", cascade="all, delete-orphan")
 
class Product(Base):
 
    __tablename__ = "products"
 
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    type = Column(String, nullable=False)
    price = Column(String, nullable=False)
    storage = Column(String, nullable=False)
    ram = Column(String, nullable=False)
    jack = Column(String, nullable=False)
    battery = Column(String, nullable=False)
    nfc = Column(String, nullable=False)
    card_slot_max = Column(String, nullable=False)
    mem_card_slot = Column(String, nullable=False)
    power = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
 
    likes = relationship("Like", back_populates="product", cascade="all, delete-orphan")
    comments = relationship("Comment", back_populates="product", cascade="all, delete-orphan")
 
class Like(Base):
    __tablename__ = "likes"
 
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
 
    user = relationship("User", back_populates="likes")
    product = relationship("Product", back_populates="likes")
 
class Comment(Base):
    __tablename__ = "comments"
 
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
 
    user = relationship("User", back_populates="comments")
    product = relationship("Product", back_populates="comments")